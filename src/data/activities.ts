import type { Activity } from "../types/activities";
import { fetchActivitiesFromStrapi } from "../utils/strapi-activities";

// Function to get activities from Strapi
export const getActivities = async (): Promise<Activity[]> => {
  return await fetchActivitiesFromStrapi();
};

export const activitiesPageConfig = {
  title: "פעילויות",
  description: "חוויות חינוכיות ייחודיות לילדים יחד עם כלבים מאומנים",
};
