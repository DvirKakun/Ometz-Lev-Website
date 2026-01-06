import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAuth } from "../../contexts/AuthContext";

interface ForgotPasswordFormProps {
  onSwitchToLogin: () => void;
}

export const ForgotPasswordForm = ({
  onSwitchToLogin,
}: ForgotPasswordFormProps) => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    const { error: resetError } = await resetPassword(email);

    setLoading(false);

    if (resetError) {
      setError("שגיאה בשליחת המייל. אנא נסה שנית");
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="space-y-4 text-center" dir="rtl">
        <div className="text-green-600 bg-green-50 p-4 rounded-md">
          <p className="font-medium mb-2">מייל נשלח בהצלחה!</p>
          <p className="text-sm">
            שלחנו אליך קישור לאיפוס סיסמה. אנא בדוק את תיבת המייל שלך (כולל
            תיקיית הספאם) ולחץ על הקישור כדי לאפס את הסיסמה.
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
      <p className="text-sm text-muted-foreground">
        הכנס את כתובת המייל שלך ונשלח אליך קישור לאיפוס סיסמה
      </p>

      <div className="space-y-2">
        <Label htmlFor="reset-email">אימייל</Label>
        <Input
          id="reset-email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          dir="ltr"
        />
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "שולח..." : "שלח קישור לאיפוס"}
      </Button>

      <div className="text-sm text-center">
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-primary hover:underline"
          disabled={loading}
        >
          חזרה להתחברות
        </button>
      </div>
    </form>
  );
};