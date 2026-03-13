import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Bell, BellOff, Save, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { NotificationPreferences } from "../components/notifications/NotificationPreferences";
import type { NotificationPreferences as NotificationPreferencesType } from "../types/notifications";
import { DEFAULT_PREFERENCES } from "../data/notification-categories";

type PageState = "loading" | "loaded" | "success" | "error" | "unsubscribed";

export default function UnsubscribePage() {
  const [searchParams] = useSearchParams();
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

  // Error state
  if (pageState === "error") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12 px-4">
        <div className="max-w-md mx-auto text-center" dir="rtl">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-primary-900 mb-2">
            שגיאה
          </h1>
          <p className="text-primary-700 mb-6">{errorMessage}</p>
          <Link to="/home">
            <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
              חזרה לאתר
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Success state - preferences updated
  if (pageState === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12 px-4">
        <div className="max-w-md mx-auto text-center" dir="rtl">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-primary-900 mb-2">
            ההעדפות עודכנו בהצלחה!
          </h1>
          <p className="text-primary-700 mb-6">
            השינויים נשמרו ויחולו על כל ההתראות העתידיות
          </p>
          <Link to="/home">
            <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
              חזרה לאתר
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Unsubscribed state
  if (pageState === "unsubscribed") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12 px-4">
        <div className="max-w-md mx-auto text-center" dir="rtl">
          <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
            <BellOff className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-2xl font-bold text-primary-900 mb-2">
            הוסרת מרשימת התפוצה
          </h1>
          <p className="text-primary-700 mb-6">
            לא תקבל יותר התראות מאיתנו. תמיד תוכל להירשם מחדש דרך דף ההגדרות
            באתר.
          </p>
          <Link to="/home">
            <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
              חזרה לאתר
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Loading state
  if (pageState === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12 px-4">
        <div className="max-w-md mx-auto text-center" dir="rtl">
          <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-primary-700">טוען את ההעדפות שלך...</p>
        </div>
      </div>
    );
  }

  // Main form
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto" dir="rtl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg mx-auto mb-4">
            <Bell className="w-8 h-8 text-primary-50" />
          </div>
          <h1 className="text-3xl font-bold text-primary-900">ניהול התראות</h1>
          <p className="text-primary-700 mt-2">
            עדכן את העדפות ההתראות שלך או הסר את עצמך מרשימת התפוצה
          </p>
        </div>

        {/* Notification Preferences Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-primary-100">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-primary-600" />
            <h2 className="text-lg font-semibold text-primary-900">
              העדפות התראות
            </h2>
          </div>

          <NotificationPreferences
            preferences={preferences}
            onChange={setPreferences}
            disabled={saving}
            showSelectAll={true}
          />

          {errorMessage && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {errorMessage}
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
        </div>

        {/* Unsubscribe All Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-primary-100">
          <div className="flex items-center gap-3 mb-4">
            <BellOff className="w-5 h-5 text-primary-600" />
            <h2 className="text-lg font-semibold text-primary-900">
              הסרה מרשימת התפוצה
            </h2>
          </div>
          <p className="text-sm text-primary-700 mb-4">
            לא רוצה לקבל יותר התראות? לחץ על הכפתור מטה כדי להסיר את עצמך מכל
            רשימות התפוצה.
          </p>
          <Button
            onClick={handleUnsubscribeAll}
            disabled={saving}
            variant="outline"
            className="w-full h-11 border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400"
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

        {/* Back to site */}
        <div className="text-center mt-8">
          <Link
            to="/home"
            className="text-primary-600 hover:text-primary-700 text-sm underline"
          >
            חזרה לאתר אומץ לב
          </Link>
        </div>
      </div>
    </div>
  );
}