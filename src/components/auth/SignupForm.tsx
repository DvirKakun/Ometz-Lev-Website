import { useState } from "react";
import { AlertCircle, CheckCircle2, Mail, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { useAuth } from "../../contexts/AuthContext";
import { trackCustomEvent } from "../../utils/facebookPixel";

interface SignupFormProps {
  onSwitchToLogin: () => void;
  onSuccess: () => void;
}

export const SignupForm = ({ onSwitchToLogin }: SignupFormProps) => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [wantsNotifications, setWantsNotifications] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!agreedToTerms) {
      setError("יש לאשר את תנאי השימוש ומדיניות הפרטיות");
      return;
    }

    if (password !== confirmPassword) {
      setError("הסיסמאות אינן תואמות");
      return;
    }

    if (password.length < 6) {
      setError("סיסמה חייבת להיות לפחות 6 תווים");
      return;
    }

    setLoading(true);

    const { error: signUpError } = await signUp(email, password, {
      wantsNotifications,
    });

    setLoading(false);

    if (signUpError) {
      if (signUpError.message.includes("already registered")) {
        setError("אימייל זה כבר רשום במערכת");
      } else if (signUpError.message.includes("password")) {
        setError("סיסמה חייבת להיות לפחות 6 תווים");
      } else {
        setError("שגיאה בהרשמה. אנא נסה שנית");
      }
    } else {
      trackCustomEvent("SignUp");
      setSuccess(true);
      // Note: With email verification enabled, user needs to confirm email
      // before they can login
    }
  };

  if (success) {
    return (
      <div className="space-y-4 text-center" dir="rtl">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg">
            <CheckCircle2 className="w-6 h-6 text-primary-50" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-primary-900">נרשמת בהצלחה!</h3>
            <div className="flex items-start gap-2 text-xs text-primary-800 bg-primary-100/60 p-3 rounded-lg border-r-4 border-primary-500">
              <Mail className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
              <p className="flex-1 text-right">
                שלחנו אליך מייל עם קישור לאימות החשבון. בדוק את תיבת המייל שלך
                (כולל ספאם) ולחץ על הקישור להפעלת החשבון.
              </p>
            </div>
          </div>
        </div>
        <Button
          onClick={onSwitchToLogin}
          className="w-full h-8 text-sm bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-primary-50 font-semibold shadow-md shadow-primary-500/25"
        >
          חזרה להתחברות
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2" dir="rtl">
      <div className="space-y-0.5">
        <Label htmlFor="signup-email" className="text-primary-900 font-semibold text-xs">
          אימייל
        </Label>
        <Input
          id="signup-email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          dir="ltr"
          className="h-8 text-sm bg-primary-50/50 border-primary-200 focus-visible:ring-primary-500 focus-visible:border-primary-500"
        />
      </div>

      <div className="space-y-0.5">
        <Label htmlFor="signup-password" className="text-primary-900 font-semibold text-xs">
          סיסמה
        </Label>
        <Input
          id="signup-password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          minLength={6}
          className="h-8 text-sm bg-primary-50/50 border-primary-200 focus-visible:ring-primary-500 focus-visible:border-primary-500"
        />
        <p className="text-[10px] text-primary-600">לפחות 6 תווים</p>
      </div>

      <div className="space-y-0.5">
        <Label htmlFor="confirm-password" className="text-primary-900 font-semibold text-xs">
          אימות סיסמה
        </Label>
        <Input
          id="confirm-password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={loading}
          minLength={6}
          className="h-8 text-sm bg-primary-50/50 border-primary-200 focus-visible:ring-primary-500 focus-visible:border-primary-500"
        />
      </div>

      {/* Terms and Privacy Checkbox */}
      <div className="flex items-start gap-2 pt-0.5">
        <Checkbox
          id="terms"
          checked={agreedToTerms}
          onCheckedChange={(checked: boolean) => setAgreedToTerms(checked)}
          disabled={loading}
          className="mt-0.5 h-4 w-4"
        />
        <Label
          htmlFor="terms"
          className="text-xs text-primary-800 leading-tight cursor-pointer font-normal"
        >
          אני מאשר/ת את{" "}
          <Link
            to="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-700 hover:text-primary-800 underline font-semibold"
            onClick={(e) => e.stopPropagation()}
          >
            תנאי השימוש
          </Link>
          {" "}ואת{" "}
          <Link
            to="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-700 hover:text-primary-800 underline font-semibold"
            onClick={(e) => e.stopPropagation()}
          >
            מדיניות הפרטיות
          </Link>
        </Label>
      </div>

      {/* Notifications Checkbox */}
      <div className="flex items-start gap-2 py-1.5 bg-primary-50/50 rounded-md px-2">
        <Checkbox
          id="notifications"
          checked={wantsNotifications}
          onCheckedChange={(checked: boolean) => setWantsNotifications(checked)}
          disabled={loading}
          className="mt-0.5 h-4 w-4"
        />
        <div className="flex-1">
          <Label
            htmlFor="notifications"
            className="text-xs text-primary-800 leading-tight cursor-pointer font-normal flex items-center gap-1"
          >
            <Bell className="w-3 h-3 text-primary-600 flex-shrink-0" />
            <span>אני רוצה לקבל עדכונים על תכנים חדשים</span>
          </Label>
          <p className="text-[10px] text-primary-600 mr-4">
            ניתן לשנות בהגדרות בכל עת
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-1.5 text-xs text-primary-900 bg-primary-200/60 py-1.5 px-2 rounded-md border-r-3 border-primary-700">
          <AlertCircle className="w-3.5 h-3.5 text-primary-700 flex-shrink-0 mt-0.5" />
          <p className="flex-1">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        className="w-full h-8 text-sm bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-primary-50 font-semibold shadow-md shadow-primary-500/25 transition-all duration-200"
        disabled={loading}
      >
        {loading ? "נרשם..." : "הירשם"}
      </Button>

      <div className="text-xs text-center text-primary-800">
        יש לך חשבון?{" "}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSwitchToLogin();
          }}
          className="text-primary-700 hover:text-primary-800 hover:underline font-bold transition-colors"
          disabled={loading}
        >
          התחבר
        </button>
      </div>
    </form>
  );
};
