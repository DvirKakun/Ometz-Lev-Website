import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { KeyRound, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from "../contexts/AuthContext";

export default function ResetPasswordPage() {
  const { updatePassword, session, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect if no session (user didn't come from reset link)
  useEffect(() => {
    if (!authLoading && !session) {
      navigate("/home");
    }
  }, [session, authLoading, navigate]);

  // Show loading while checking auth state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg mx-auto mb-4 animate-pulse">
            <KeyRound className="w-8 h-8 text-primary-50" />
          </div>
          <p className="text-primary-700">טוען...</p>
        </div>
      </div>
    );
  }

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

    const { error: updateError } = await updatePassword(password);

    setLoading(false);

    if (updateError) {
      setError("שגיאה בעדכון הסיסמה. אנא נסה שנית");
    } else {
      setSuccess(true);
      // Redirect to home after 2 seconds
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 pb-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-primary-50" />
              </div>
              <h1 className="text-2xl font-bold text-primary-900 mb-2">
                הסיסמה עודכנה בהצלחה!
              </h1>
              <p className="text-sm text-primary-700">
                מעביר אותך לדף הבית...
              </p>
            </div>

            {/* Content */}
            <div className="p-6" style={{ backgroundColor: '#fefdfb' }} dir="rtl">
              <div className="flex items-start gap-3 text-sm text-primary-800 bg-primary-100/60 p-4 rounded-lg border-r-4 border-primary-500">
                <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                <p className="flex-1 text-right">
                  הסיסמה שלך עודכנה בהצלחה. כעת תוכל להתחבר עם הסיסמה החדשה.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 pb-6 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg mx-auto mb-4">
              <KeyRound className="w-8 h-8 text-primary-50" />
            </div>
            <h1 className="text-2xl font-bold text-primary-900 mb-2">
              איפוס סיסמה
            </h1>
            <p className="text-sm text-primary-700">
              הכנס סיסמה חדשה עבור החשבון שלך
            </p>
          </div>

          {/* Content */}
          <div className="p-6" style={{ backgroundColor: '#fefdfb' }}>
            <form onSubmit={handleSubmit} className="space-y-3.5" dir="rtl">
              <p className="text-sm text-primary-800 bg-primary-100/50 p-2.5 rounded-lg border-r-2 border-primary-400">
                הסיסמה החדשה חייבת להיות שונה מהסיסמה הנוכחית שלך
              </p>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-primary-900 font-semibold">
                  סיסמה חדשה
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
                {loading ? "מעדכן..." : "עדכן סיסמה"}
              </Button>

              <div className="text-sm text-center pt-1">
                <button
                  type="button"
                  onClick={() => navigate("/home")}
                  className="text-primary-700 hover:text-primary-800 hover:underline transition-colors font-medium"
                  disabled={loading}
                >
                  חזרה לדף הבית
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}