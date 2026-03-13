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
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [preferences, setPreferences] =
    useState<NotificationPreferencesType>(DEFAULT_PREFERENCES);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/home");
    }
  }, [user, navigate]);

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

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto" dir="rtl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg mx-auto mb-4">
            <Settings className="w-8 h-8 text-primary-50" />
          </div>
          <h1 className="text-3xl font-bold text-primary-900">הגדרות</h1>
          <p className="text-primary-700 mt-2">נהל את העדפות החשבון שלך</p>
        </div>

        {/* Account Info Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-primary-100">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-5 h-5 text-primary-600" />
            <h2 className="text-lg font-semibold text-primary-900">
              פרטי חשבון
            </h2>
          </div>
          <div className="bg-primary-50/50 rounded-lg p-4">
            <p className="text-sm text-primary-700">כתובת אימייל</p>
            <p className="font-medium text-primary-900" dir="ltr">
              {user.email}
            </p>
          </div>
        </div>

        {/* Notification Preferences Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-primary-100">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-primary-600" />
            <h2 className="text-lg font-semibold text-primary-900">
              העדפות התראות
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 text-primary-600 animate-spin" />
              <span className="mr-2 text-primary-700">טוען...</span>
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
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              {saveSuccess && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                  ההגדרות נשמרו בהצלחה!
                </div>
              )}

              <Button
                onClick={handleSave}
                disabled={saving}
                className="w-full mt-6 h-11 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-primary-50 font-semibold shadow-lg shadow-primary-500/30"
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
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-primary-100">
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="w-full h-11 border-primary-300 hover:bg-primary-50 text-primary-700"
          >
            <LogOut className="w-4 h-4 ml-2" />
            התנתק
          </Button>
        </div>
      </div>
    </div>
  );
}