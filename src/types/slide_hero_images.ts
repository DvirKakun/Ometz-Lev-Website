export interface SlideHeroImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  order: number;
}

export interface SlideHeroImageProps {
  className?: string;
  autoSwitch?: boolean;
  switchInterval?: number;
}
