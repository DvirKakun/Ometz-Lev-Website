import { useMemo } from "react";
import { therapyMethodConfig } from "../data/therapy_method_config";
import { useProfileImage } from "./useProfileImage";
import type { MethodConfig } from "../types/method";

// Custom hook that extends therapy method config with profile image from Strapi
export function useTherapyMethodConfig() {
  const { data: profileImage, isLoading, error } = useProfileImage();

  const configWithProfileImage = useMemo((): MethodConfig => {
    return {
      ...therapyMethodConfig,
      about: {
        ...therapyMethodConfig.about,
        ...(profileImage && {
          imageSrc: profileImage.imageSrc,
          altText: profileImage.altText,
        }),
      },
    };
  }, [profileImage]);

  return {
    data: configWithProfileImage,
    isLoading,
    error,
  };
}