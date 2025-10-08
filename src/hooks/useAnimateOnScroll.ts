import { useEffect, useState, useRef } from "react";

// Reusable hook to trigger animation on scroll
function useAnimateOnScroll(options = { threshold: 0.5 }) {
  const [startAnimation, setStartAnimation] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStartAnimation(true);
        if (elementRef.current) {
          observer.unobserve(elementRef.current);
        }
      }
    }, options);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return [elementRef, startAnimation] as const;
}

export default useAnimateOnScroll;