import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, Mail, Bell, LogOut, Save, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { useAuth } from "../contexts/AuthContext";
import { NotificationPreferences } from "../components/notifications/NotificationPreferences";
import {
  getOrCreatePreferences,
  saveNotificationPreferences,
} from "../lib/supabase-notification-preferences";
import type { NotificationPreferences as NotificationPreferencesType } from "../types/notifications";
import { DEFAULT_PREFERENCES } from "../data/notification-categories";

export default function SettingsPage() {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [preferences, setPreferences] =
    useState<NotificationPreferencesType>(DEFAULT_PREFERENCES);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState("");

  // Redirect if not logged in (wait for auth to finish loading first)
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/home");
    }
  }, [user, authLoading, navigate]);

  // Load preferences on mount
  useEffect(() => {
    const loadPreferences = async () => {
      if (!user) return;

      try {
        setLoading(true);
        // Get user's wants_notifications preference from user metadata
        const wantsNotifications =
          user.user_metadata?.wants_notifications !== false;

        const record = await getOrCreatePreferences(user.id, wantsNotifications);
        setPreferences({
          training_videos: record.training_videos,
          therapy_videos: record.therapy_videos,
          activities: record.activities,
          training_article: record.training_article,
          therapy_article: record.therapy_article,
          new_product: record.new_product,
        });
      } catch (err) {
        console.error("Error loading preferences:", err);
        setError("שגיאה בטעינת ההגדרות");
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    try {
      setSaving(true);
      setError("");
      setSaveSuccess(false);

      await saveNotificationPreferences(user.id, preferences);

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Error saving preferences:", err);
      setError("שגיאה בשמירת ההגדרות");
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/home");
  };

  // Show loading while checking auth or if no user yet
  if (authLoading || !user) {
    return (
      <div className="py-16 px-4">
        <div className="max-w-md mx-auto text-center" dir="rtl">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg mx-auto mb-3 animate-pulse">
            <Settings className="w-6 h-6 text-primary-50" />
          </div>
          <p className="text-sm text-primary-700">טוען...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-md mx-auto" dir="rtl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg mx-auto mb-3">
            <Settings className="w-6 h-6 text-primary-50" />
          </div>
          <h1 className="text-2xl font-bold text-primary-900">הגדרות</h1>
        </div>

        {/* Account Info Section */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-4 border border-primary-100">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-4 h-4 text-primary-600" />
            <h2 className="text-sm font-semibold text-primary-900">
              פרטי חשבון
            </h2>
          </div>
          <div className="bg-primary-50/50 rounded-lg p-2.5">
            <p className="text-xs text-primary-700">כתובת אימייל</p>
            <p className="text-sm font-medium text-primary-900" dir="ltr">
              {user.email}
            </p>
          </div>
        </div>

        {/* Notification Preferences Section */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-4 border border-primary-100">
          <div className="flex items-center gap-2 mb-3">
            <Bell className="w-4 h-4 text-primary-600" />
            <h2 className="text-sm font-semibold text-primary-900">
              העדפות התראות
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-5 h-5 text-primary-600 animate-spin" />
              <span className="mr-2 text-sm text-primary-700">טוען...</span>
            </div>
          ) : (
            <>
              <NotificationPreferences
                preferences={preferences}
                onChange={setPreferences}
                disabled={saving}
                showSelectAll={true}
              />

              {error && (
                <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs">
                  {error}
                </div>
              )}

              {saveSuccess && (
                <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg text-green-700 text-xs">
                  ההגדרות נשמרו בהצלחה!
                </div>
              )}

              <Button
                onClick={handleSave}
                disabled={saving}
                className="w-full mt-4 h-9 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-primary-50 font-semibold text-sm shadow-md shadow-primary-500/30"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                    שומר...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 ml-2" />
                    שמור שינויים
                  </>
                )}
              </Button>
            </>
          )}
        </div>

        {/* Sign Out Section */}
        <div className="bg-white rounded-xl shadow-md p-4 border border-primary-100">
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="w-full h-9 border-primary-300 hover:bg-primary-50 text-primary-700 text-sm"
          >
            <LogOut className="w-4 h-4 ml-2" />
            התנתק
          </Button>
        </div>
      </div>
    </div>
  );
}