import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAuth } from "../../contexts/AuthContext";

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
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
      <div className="space-y-2">
        <Label htmlFor="email">אימייל</Label>
        <Input
          id="email"
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
        <Label htmlFor="password">סיסמה</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        {loading ? "מתחבר..." : "התחבר"}
      </Button>

      <div className="flex flex-col gap-2 text-sm text-center">
        <button
          type="button"
          onClick={onSwitchToForgotPassword}
          className="text-primary hover:underline"
          disabled={loading}
        >
          שכחת סיסמה?
        </button>
        <div>
          אין לך חשבון?{" "}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-primary hover:underline font-medium"
            disabled={loading}
          >
            הירשם
          </button>
        </div>
      </div>
    </form>
  );
};
