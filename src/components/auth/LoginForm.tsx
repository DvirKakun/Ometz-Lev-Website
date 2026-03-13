import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAuth } from "../../contexts/AuthContext";
import { trackCustomEvent } from "../../utils/facebookPixel";

interface LoginFormProps {
  onSwitchToSignup: () => void;
  onSwitchToForgotPassword: () => void;
  onSuccess: () => void;
}

export const LoginForm = ({
  onSwitchToSignup,
  onSwitchToForgotPassword,
  onSuccess,
}: LoginFormProps) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: signInError } = await signIn(email, password);

    setLoading(false);

    if (signInError) {
      if (signInError.message.includes("Invalid login credentials")) {
        setError("אימייל או סיסמה שגויים");
      } else if (signInError.message.includes("Email not confirmed")) {
        setError("אנא אשר את כתובת המייל שלך לפני ההתחברות");
      } else {
        setError("שגיאה בהתחברות. אנא נסה שנית");
      }
    } else {
      trackCustomEvent("Login");
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5" dir="rtl">
      <div className="space-y-0.5">
        <Label htmlFor="email" className="text-primary-900 font-semibold text-xs">
          אימייל
        </Label>
        <Input
          id="email"
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
        <Label htmlFor="password" className="text-primary-900 font-semibold text-xs">
          סיסמה
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          minLength={6}
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
        {loading ? "מתחבר..." : "התחבר"}
      </Button>

      <div className="flex flex-col gap-1 text-xs text-center">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSwitchToForgotPassword();
          }}
          className="text-primary-700 hover:text-primary-800 hover:underline transition-colors font-medium"
          disabled={loading}
        >
          שכחת סיסמה?
        </button>
        <div className="text-primary-800">
          אין לך חשבון?{" "}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSwitchToSignup();
            }}
            className="text-primary-700 hover:text-primary-800 hover:underline font-bold transition-colors"
            disabled={loading}
          >
            הירשם עכשיו
          </button>
        </div>
      </div>
    </form>
  );
};
