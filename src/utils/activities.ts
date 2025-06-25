import { activities } from "../data/activities";
import type { Activity } from "../types/activities";

export const getClosestActivity = (): Activity | null => {
  const now = new Date();
  
  // Filter activities that are in the future
  const futureActivities = activities.filter(activity => activity.date > now);
  
  if (futureActivities.length === 0) {
    return null;
  }
  
  // Sort by date (closest first) and return the closest one
  return futureActivities.sort((a, b) => a.date.getTime() - b.date.getTime())[0];
};