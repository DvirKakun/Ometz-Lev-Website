import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  NOTIFICATION_CATEGORIES,
  areAllPreferencesEnabled,
  areAllPreferencesDisabled,
} from "../../data/notification-categories";
import type {
  NotificationPreferences as NotificationPreferencesType,
  NotificationPreferencesProps,
  NotificationCategory,
} from "../../types/notifications";

export function NotificationPreferences({
  preferences,
  onChange,
  disabled = false,
  showSelectAll = true,
}: NotificationPreferencesProps) {
  const allEnabled = areAllPreferencesEnabled(preferences);
  const allDisabled = areAllPreferencesDisabled(preferences);

  const handleCategoryChange = (
    category: NotificationCategory,
    checked: boolean
  ) => {
    onChange({
      ...preferences,
      [category]: checked,
    });
  };

  const handleSelectAll = () => {
    const newValue = !allEnabled;
    const newPreferences: NotificationPreferencesType = {
      training_videos: newValue,
      therapy_videos: newValue,
      activities: newValue,
      training_article: newValue,
      therapy_article: newValue,
      new_product: newValue,
    };
    onChange(newPreferences);
  };

  return (
    <div className="space-y-4" dir="rtl">
      {showSelectAll && (
        <div className="flex items-center justify-between pb-2 border-b border-primary-200">
          <span className="text-sm font-medium text-primary-800">
            העדפות התראות
          </span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleSelectAll}
            disabled={disabled}
            className="text-primary-600 hover:text-primary-700 hover:bg-primary-50 text-sm"
          >
            {allEnabled ? "בטל הכל" : "בחר הכל"}
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {NOTIFICATION_CATEGORIES.map((category) => (
          <div
            key={category.key}
            className="flex items-start gap-3 p-3 rounded-lg bg-primary-50/50 hover:bg-primary-100/50 transition-colors"
          >
            <Checkbox
              id={`notification-${category.key}`}
              checked={preferences[category.key]}
              onCheckedChange={(checked: boolean) =>
                handleCategoryChange(category.key, checked)
              }
              disabled={disabled}
              className="mt-0.5"
            />
            <div className="flex-1">
              <Label
                htmlFor={`notification-${category.key}`}
                className="text-sm font-medium text-primary-900 cursor-pointer block"
              >
                {category.label}
              </Label>
              <p className="text-xs text-primary-600 mt-0.5">
                {category.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {allDisabled && (
        <p className="text-xs text-primary-500 text-center pt-2">
          לא תקבל התראות על תכנים חדשים
        </p>
      )}
    </div>
  );
}

export default NotificationPreferences;