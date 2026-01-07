import { useState } from "react";
import { LogOut, User } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";

export const UserMenu = () => {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const getInitials = () => {
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity rounded-full"
        aria-label="תפריט משתמש"
      >
        <Avatar className="h-9 w-9 ring-2 ring-primary-200 shadow-md">
          <AvatarFallback className="bg-gradient-to-br from-primary-400 to-primary-600 text-primary-50 font-bold">
            {getInitials()}
          </AvatarFallback>
        </Avatar>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[85vw] sm:max-w-md p-0 border-0 text-primary-900 overflow-hidden rounded-2xl">
          <div className="flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 pb-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg mx-auto mb-4">
                <User className="w-8 h-8 text-primary-50" />
              </div>
              <DialogTitle asChild>
                <h2 className="text-2xl font-bold text-primary-900 mb-2">
                  החשבון שלי
                </h2>
              </DialogTitle>
              <DialogDescription asChild>
                <p className="text-sm text-primary-700">נהל את פרטי החשבון שלך</p>
              </DialogDescription>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4" style={{ backgroundColor: '#fefdfb' }} dir="rtl">
              <div className="flex items-center gap-3 p-4 bg-primary-100/50 rounded-xl border-r-4 border-primary-500">
                <Avatar className="h-12 w-12 ring-2 ring-primary-200">
                  <AvatarFallback className="bg-gradient-to-br from-primary-400 to-primary-600 text-primary-50 text-lg font-bold">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-primary-900 truncate">{user.email}</p>
                  <p className="text-xs text-primary-700">משתמש רשום</p>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full justify-start gap-2 h-11 border-primary-300 hover:bg-primary-100 hover:border-primary-400 transition-colors"
                onClick={handleSignOut}
              >
                התנתק
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
