import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bell,
  BellOff,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { NotificationPreferences } from "../components/notifications/NotificationPreferences";
import type { NotificationPreferences as NotificationPreferencesType } from "../types/notifications";
import { DEFAULT_PREFERENCES } from "../data/notification-categories";

type PageState = "loading" | "loaded" | "success" | "error" | "unsubscribed";

export default function UnsubscribePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [pageState, setPageState] = useState<PageState>("loading");
  const [preferences, setPreferences] =
    useState<NotificationPreferencesType>(DEFAULT_PREFERENCES);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Load preferences on mount
  useEffect(() => {
    const loadPreferences = async () => {
      if (!token) {
        setErrorMessage("קישור לא תקין - חסר טוקן אימות");
        setPageState("error");
        return;
      }

      try {
        const response = await fetch(
          `/.netlify/functions/unsubscribe?token=${encodeURIComponent(token)}`
        );

        if (!response.ok) {
          const data = await response.json();
          if (response.status === 404) {
            setErrorMessage("קישור לא תקין או פג תוקף");
          } else {
            setErrorMessage(data.error || "שגיאה בטעינת ההעדפות");
          }
          setPageState("error");
          return;
        }

        const data = await response.json();
        setPreferences(data.preferences);
        setPageState("loaded");
      } catch (err) {
        console.error("Error loading preferences:", err);
        setErrorMessage("שגיאה בטעינת ההעדפות");
        setPageState("error");
      }
    };

    loadPreferences();
  }, [token]);

  const handleSave = async () => {
    if (!token) return;

    try {
      setSaving(true);
      setErrorMessage("");

      const response = await fetch("/.netlify/functions/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, preferences }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "שגיאה בשמירת ההעדפות");
      }

      setPageState("success");
    } catch (err) {
      console.error("Error saving preferences:", err);
      setErrorMessage(
        err instanceof Error ? err.message : "שגיאה בשמירת ההעדפות"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleUnsubscribeAll = async () => {
    if (!token) return;

    try {
      setSaving(true);
      setErrorMessage("");

      const response = await fetch(
        `/.netlify/functions/unsubscribe?token=${encodeURIComponent(token)}&all=true`
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "שגיאה בביטול ההרשמה");
      }

      setPageState("unsubscribed");
    } catch (err) {
      console.error("Error unsubscribing:", err);
      setErrorMessage(
        err instanceof Error ? err.message : "שגיאה בביטול ההרשמה"
      );
    } finally {
      setSaving(false);
    }
  };

  // Loading state
  if (pageState === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg mx-auto mb-3 animate-pulse">
            <Bell className="w-6 h-6 text-primary-50" />
          </div>
          <p className="text-sm text-primary-700">טוען את ההעדפות שלך...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (pageState === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm"
        >
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shadow-md mx-auto mb-3">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h1 className="text-xl font-bold text-primary-900 mb-1">
                שגיאה
              </h1>
              <p className="text-xs text-primary-700">{errorMessage}</p>
            </div>

            {/* Content */}
            <div
              className="p-4"
              style={{ backgroundColor: "#fefdfb" }}
              dir="rtl"
            >
              <div className="flex items-start gap-2 text-xs text-primary-800 bg-primary-100/60 p-3 rounded-lg border-r-3 border-primary-500 mb-3">
                <AlertCircle className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                <p className="flex-1 text-right">
                  לא הצלחנו לטעון את ההעדפות שלך. ייתכן שהקישור פג תוקף.
                </p>
              </div>

              <Button
                onClick={() => navigate("/home")}
                className="w-full h-9 text-sm bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-primary-50 font-semibold shadow-md shadow-primary-500/30"
              >
                חזרה לאתר
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Success state - preferences updated
  if (pageState === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm"
        >
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-md mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-primary-50" />
              </div>
              <h1 className="text-xl font-bold text-primary-900 mb-1">
                ההעדפות עודכנו בהצלחה!
              </h1>
              <p className="text-xs text-primary-700">
                השינויים יחולו על כל ההתראות העתידיות
              </p>
            </div>

            {/* Content */}
            <div
              className="p-4"
              style={{ backgroundColor: "#fefdfb" }}
              dir="rtl"
            >
              <div className="flex items-start gap-2 text-xs text-primary-800 bg-primary-100/60 p-3 rounded-lg border-r-3 border-primary-500 mb-3">
                <CheckCircle className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                <p className="flex-1 text-right">
                  העדפות ההתראות שלך עודכנו. תקבל התראות רק בנושאים שבחרת.
                </p>
              </div>

              <Button
                onClick={() => navigate("/home")}
                className="w-full h-9 text-sm bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-primary-50 font-semibold shadow-md shadow-primary-500/30"
              >
                חזרה לאתר
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Unsubscribed state
  if (pageState === "unsubscribed") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm"
        >
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-md mx-auto mb-3">
                <BellOff className="w-6 h-6 text-primary-50" />
              </div>
              <h1 className="text-xl font-bold text-primary-900 mb-1">
                הוסרת מרשימת התפוצה
              </h1>
              <p className="text-xs text-primary-700">
                לא תקבל יותר התראות מאיתנו
              </p>
            </div>

            {/* Content */}
            <div
              className="p-4"
              style={{ backgroundColor: "#fefdfb" }}
              dir="rtl"
            >
              <div className="flex items-start gap-2 text-xs text-primary-800 bg-primary-100/60 p-3 rounded-lg border-r-3 border-primary-500 mb-3">
                <BellOff className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                <p className="flex-1 text-right">
                  הוסרת בהצלחה מכל רשימות התפוצה. תמיד תוכל להירשם מחדש דרך האתר.
                </p>
              </div>

              <Button
                onClick={() => navigate("/home")}
                className="w-full h-9 text-sm bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-primary-50 font-semibold shadow-md shadow-primary-500/30"
              >
                חזרה לאתר
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Main form - loaded state
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-5 text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-md mx-auto mb-3">
              <Bell className="w-6 h-6 text-primary-50" />
            </div>
            <h1 className="text-xl font-bold text-primary-900">
              ניהול התראות
            </h1>
          </div>

          {/* Content */}
          <div className="p-4" style={{ backgroundColor: "#fefdfb" }} dir="rtl">
            {/* Notification Preferences Section */}
            <div className="mb-4">
              <NotificationPreferences
                preferences={preferences}
                onChange={setPreferences}
                disabled={saving}
                showSelectAll={true}
              />

              {errorMessage && (
                <div className="mt-3 flex items-start gap-2 text-xs text-primary-900 bg-primary-200/60 p-2 rounded-lg border-r-3 border-primary-700">
                  <AlertCircle className="w-3.5 h-3.5 text-primary-700 flex-shrink-0 mt-0.5" />
                  <p className="flex-1">{errorMessage}</p>
                </div>
              )}

              <Button
                onClick={handleSave}
                disabled={saving}
                className="w-full mt-3 h-9 text-sm bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-primary-50 font-semibold shadow-md shadow-primary-500/30"
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
            </div>

            {/* Divider */}
            <div className="border-t border-primary-200 my-4" />

            {/* Unsubscribe All Section */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <BellOff className="w-4 h-4 text-primary-600" />
                <h2 className="text-sm font-semibold text-primary-900">
                  הסרה מרשימת התפוצה
                </h2>
              </div>
              <p className="text-xs text-primary-700 mb-3">
                לא רוצה לקבל יותר התראות? לחץ להסרה מכל רשימות התפוצה.
              </p>
              <Button
                onClick={handleUnsubscribeAll}
                disabled={saving}
                variant="outline"
                className="w-full h-9 text-sm border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                    מבטל הרשמה...
                  </>
                ) : (
                  <>
                    <BellOff className="w-4 h-4 ml-2" />
                    הסר אותי מכל ההתראות
                  </>
                )}
              </Button>
            </div>

            {/* Back to site link */}
            <div className="text-xs text-center pt-4">
              <button
                type="button"
                onClick={() => navigate("/home")}
                className="text-primary-700 hover:text-primary-800 hover:underline transition-colors font-medium"
                disabled={saving}
              >
                חזרה לאתר אומץ לב
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
