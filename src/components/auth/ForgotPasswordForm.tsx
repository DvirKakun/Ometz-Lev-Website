import { useState } from "react";
import { AlertCircle, CheckCircle2, Mail } from "lucide-react";
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
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg">
            <CheckCircle2 className="w-6 h-6 text-primary-50" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-primary-900">מייל נשלח בהצלחה!</h3>
            <div className="flex items-start gap-2 text-xs text-primary-800 bg-primary-100/60 p-3 rounded-lg border-r-4 border-primary-500">
              <Mail className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
              <p className="flex-1 text-right">
                שלחנו אליך קישור לאיפוס סיסמה. בדוק את תיבת המייל שלך (כולל ספאם)
                ולחץ על הקישור לאיפוס.
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
    <form onSubmit={handleSubmit} className="space-y-2.5" dir="rtl">
      <p className="text-xs text-primary-800 bg-primary-100/50 p-2 rounded-md border-r-2 border-primary-400">
        הכנס את כתובת המייל שלך ונשלח אליך קישור לאיפוס סיסמה
      </p>

      <div className="space-y-0.5">
        <Label htmlFor="reset-email" className="text-primary-900 font-semibold text-xs">
          אימייל
        </Label>
        <Input
          id="reset-email"
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
        {loading ? "שולח..." : "שלח קישור לאיפוס"}
      </Button>

      <div className="text-xs text-center">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSwitchToLogin();
          }}
          className="text-primary-700 hover:text-primary-800 hover:underline transition-colors font-medium"
          disabled={loading}
        >
          חזרה להתחברות
        </button>
      </div>
    </form>
  );
};