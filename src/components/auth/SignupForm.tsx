import { useState } from "react";
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
      <div className="space-y-4 text-center" dir="rtl">
        <div className="text-green-600 bg-green-50 p-4 rounded-md">
          <p className="font-medium mb-2">נרשמת בהצלחה!</p>
          <p className="text-sm">
            שלחנו אליך מייל עם קישור לאימות החשבון. אנא בדוק את תיבת המייל שלך
            (כולל תיקיית הספאם) ולחץ על הקישור כדי להפעיל את החשבון.
          </p>
        </div>
        <Button onClick={onSwitchToLogin} className="w-full">
          חזרה להתחברות
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
      <div className="space-y-2">
        <Label htmlFor="signup-email">אימייל</Label>
        <Input
          id="signup-email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          dir="ltr"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-password">סיסמה</Label>
        <Input
          id="signup-password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          minLength={6}
        />
        <p className="text-xs text-muted-foreground">לפחות 6 תווים</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-password">אימות סיסמה</Label>
        <Input
          id="confirm-password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={loading}
          minLength={6}
        />
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "נרשם..." : "הירשם"}
      </Button>

      <div className="text-sm text-center">
        יש לך חשבון?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-primary hover:underline font-medium"
          disabled={loading}
        >
          התחבר
        </button>
      </div>
    </form>
  );
};
