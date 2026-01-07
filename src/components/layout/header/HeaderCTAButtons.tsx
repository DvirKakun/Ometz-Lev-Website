import { useState } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import PhoneButton from "../../common/PhoneButton";
import WhatsAppButton from "../../common/WhatsAppButton";
import { Button } from "../../ui/button";
import { AuthDialog } from "../../auth/AuthDialog";
import { UserMenu } from "../../auth/UserMenu";
import { useAuth } from "../../../contexts/AuthContext";
import type { HeaderCTAButtonsProps } from "../../../types/headers";

const HeaderCTAButtons: React.FC<HeaderCTAButtonsProps> = ({
  isMobile = false,
}) => {
  const { user } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  if (isMobile) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.4,
            duration: 0.3,
          }}
          className="pt-4 border-t border-slate-100 space-y-3"
        >
          {user ? (
            <div className="flex justify-center">
              <UserMenu />
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-center gap-2"
              onClick={() => setAuthDialogOpen(true)}
            >
              <User className="h-4 w-4" />
              התחבר
            </Button>
          )}

          <div className="grid grid-cols-2 gap-3">
            <WhatsAppButton
              phoneNumber="972524724700"
              message="שלום! אני מעוניין/ת לקבל מידע על שירותי אילוף הכלבים של אומץ לב."
              variant="default"
              size="sm"
              className="w-full justify-center"
            />
            <PhoneButton
              phoneNumber="052-472-4700"
              variant="outline"
              size="sm"
              className="w-full justify-center"
            />
          </div>
        </motion.div>

        <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
      </>
    );
  }

  return (
    <>
      <div className="hidden xl:flex items-center space-x-2 space-x-reverse flex-shrink-0">
        {user ? (
          <UserMenu />
        ) : (
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full shadow-md"
            onClick={() => setAuthDialogOpen(true)}
            aria-label="התחבר למערכת"
          >
            <User className="h-4 w-4" />
          </Button>
        )}
        <PhoneButton phoneNumber="052-472-4700" variant="outline" size="sm" />
        <WhatsAppButton phoneNumber="972524724700" variant="default" size="sm" />
      </div>

      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </>
  );
};

export default HeaderCTAButtons;
