import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SplashBackground from "../components/sections/splash_screen/SplashBackground";
import SplashLogo from "../components/sections/splash_screen/SplashLogo";
import SplashContent from "../components/sections/splash_screen/SplashContent";
import SplashProgress from "../components/sections/splash_screen/SplashProgress";

const SplashPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to home after 3 seconds
    const timer = setTimeout(() => {
      navigate("/home", { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <SplashBackground>
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md mx-4">
        <SplashLogo />
        <SplashContent />
        <SplashProgress />
      </div>
    </SplashBackground>
  );
};

export default SplashPage;
