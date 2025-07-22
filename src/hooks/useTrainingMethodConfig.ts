import { useMemo } from "react";
import { trainingMethodConfig } from "../data/training_method_config";
import { useProfileImage } from "./useProfileImage";
import type { MethodConfig } from "../types/method";

// Custom hook that extends training method config with profile image from Strapi
export function useTrainingMethodConfig() {
  const { data: profileImage, isLoading, error } = useProfileImage();

  const configWithProfileImage = useMemo((): MethodConfig => {
    return {
      ...trainingMethodConfig,
      about: {
        ...trainingMethodConfig.about,
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
