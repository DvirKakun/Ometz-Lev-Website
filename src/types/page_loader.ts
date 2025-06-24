import type { ReactNode } from "react";

export interface PageLoaderProps {
  children: ReactNode;
  minLoadTime?: number; // Minimum loading time in milliseconds
}
