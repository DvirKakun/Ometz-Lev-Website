import { useState } from "react";
import { AlertCircle, CheckCircle2, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAuth } from "../../contexts/AuthContext";

interface SignupFormProps {
  onSwitchToLogin: () => void;
  onSuccess: () => void;
}

export const SignupForm = ({ onSwitchToLogin }: SignupFormProps) => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (password !== confirmPassword) {
      setError("הסיסמאות אינן תואמות");
      return;
    }

    if (password.length < 6) {
      setError("סיסמה חייבת להיות לפחות 6 תווים");
      return;
    }

    setLoading(true);

    const { error: signUpError } = await signUp(email, password);

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
      setSuccess(true);
      // Note: With email verification enabled, user needs to confirm email
      // before they can login
    }
  };

  if (success) {
    return (
      <div className="space-y-6 text-center" dir="rtl">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg">
            <CheckCircle2 className="w-8 h-8 text-primary-50" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-primary-900">נרשמת בהצלחה!</h3>
            <div className="flex items-start gap-3 text-sm text-primary-800 bg-primary-100/60 p-4 rounded-lg border-r-4 border-primary-500">
              <Mail className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <p className="flex-1 text-right">
                שלחנו אליך מייל עם קישור לאימות החשבון. אנא בדוק את תיבת המייל שלך
                (כולל תיקיית הספאם) ולחץ על הקישור כדי להפעיל את החשבון.
              </p>
            </div>
          </div>
        </div>
        <Button
          onClick={onSwitchToLogin}
          className="w-full h-11 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-primary-50 font-semibold shadow-lg shadow-primary-500/30"
        >
          חזרה להתחברות
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" dir="rtl">
      <div className="space-y-1.5">
        <Label htmlFor="signup-email" className="text-primary-900 font-semibold">
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
          className="h-10 bg-primary-50/50 border-primary-200 focus-visible:ring-primary-500 focus-visible:border-primary-500"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="signup-password" className="text-primary-900 font-semibold">
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
          className="h-10 bg-primary-50/50 border-primary-200 focus-visible:ring-primary-500 focus-visible:border-primary-500"
        />
        <p className="text-xs text-primary-700 pt-0.5">לפחות 6 תווים</p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="confirm-password" className="text-primary-900 font-semibold">
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
          className="h-10 bg-primary-50/50 border-primary-200 focus-visible:ring-primary-500 focus-visible:border-primary-500"
        />
      </div>

      {error && (
        <div className="flex items-start gap-2.5 text-sm text-primary-900 bg-primary-200/60 p-3 rounded-lg border-r-4 border-primary-700 shadow-sm">
          <AlertCircle className="w-4 h-4 text-primary-700 flex-shrink-0 mt-0.5" />
          <p className="flex-1">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        className="w-full h-10 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-primary-50 font-semibold shadow-lg shadow-primary-500/30 transition-all duration-200"
        disabled={loading}
      >
        {loading ? "נרשם..." : "הירשם"}
      </Button>

      <div className="text-sm text-center text-primary-800 pt-1">
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
