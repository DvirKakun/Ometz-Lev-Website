import { useRef, useCallback } from "react";

interface SwipeGestureConfig {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  minSwipeDistance?: number;
  maxVerticalMovement?: number;
}

/**
 * Custom hook for handling swipe gestures on touch devices
 * 
 * Note: This hook works with passive touch events, so it relies on CSS touch-action
 * properties to control scrolling behavior instead of preventDefault()
 * 
 * Usage: Apply {...swipeHandlers} to your JSX element and set appropriate CSS:
 * - style={{ touchAction: "pan-y pinch-zoom" }} allows vertical scroll and pinch zoom
 * - className="select-none" prevents text selection during swipe
 */

interface TouchState {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isSwiping: boolean;
}

export function useSwipeGesture({
  onSwipeLeft,
  onSwipeRight,
  minSwipeDistance = 50,
  maxVerticalMovement = 100,
}: SwipeGestureConfig) {
  const touchState = useRef<TouchState>({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    isSwiping: false,
  });

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    // Ensure we have at least one touch point
    if (e.touches.length === 0) return;
    
    const touch = e.touches[0];
    touchState.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      endX: touch.clientX,
      endY: touch.clientY,
      isSwiping: true,
    };
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchState.current.isSwiping || e.touches.length === 0) return;

    const touch = e.touches[0];
    touchState.current.endX = touch.clientX;
    touchState.current.endY = touch.clientY;

    // Note: We can't preventDefault on passive touch events
    // Instead, we rely on CSS touch-action to control scrolling behavior
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchState.current.isSwiping) return;

    const deltaX = touchState.current.endX - touchState.current.startX;
    const deltaY = touchState.current.endY - touchState.current.startY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Check if it's a valid horizontal swipe
    if (
      absDeltaX >= minSwipeDistance && // Minimum distance
      absDeltaY <= maxVerticalMovement && // Not too much vertical movement
      absDeltaX > absDeltaY * 1.5 // Significantly more horizontal than vertical
    ) {
      if (deltaX > 0) {
        // Swipe right
        onSwipeRight?.();
      } else {
        // Swipe left
        onSwipeLeft?.();
      }
    }

    touchState.current.isSwiping = false;
  }, [onSwipeLeft, onSwipeRight, minSwipeDistance, maxVerticalMovement]);

  const handleTouchCancel = useCallback(() => {
    touchState.current.isSwiping = false;
  }, []);

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: handleTouchCancel,
  };
}