import { useState } from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
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
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        aria-label="תפריט משתמש"
      >
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-primary text-primary-foreground">
            {getInitials()}
          </AvatarFallback>
        </Avatar>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">החשבון שלי</DialogTitle>
          </DialogHeader>

          <div className="space-y-4" dir="rtl">
            <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.email}</p>
                <p className="text-xs text-muted-foreground">משתמש רשום</p>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4" />
                התנתק
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
