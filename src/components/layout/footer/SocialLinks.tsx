import React from "react";
import { motion } from "framer-motion";
import WhatsAppButton from "../../common/WhatsAppButton";
import InstagramButton from "../../common/InstagramButton";
import FacebookButton from "../../common/FacebookButton";
import YouTubeButton from "../../common/YoutubeButton";

// Mobile-optimized social links with enhanced touch targets and animations
const MobileOptimizedSocialLinks: React.FC = () => {
  const socialButtons = [
    {
      component: InstagramButton,
      props: {
        instagramUrl: "https://www.instagram.com/eladshimoniv_omets_lev",
        variant: "icon" as const,
        size: "md" as const,
      },
      hoverColor: "hover:text-pink-500 hover:bg-pink-500/20",
      delay: 0.1,
    },
    {
      component: WhatsAppButton,
      props: {
        phoneNumber: "972524724700",
        variant: "icon" as const,
        size: "md" as const,
      },
      hoverColor: "hover:text-green-500 hover:bg-green-500/20",
      delay: 0.2,
    },
    {
      component: FacebookButton,
      props: {
        variant: "icon" as const,
        size: "md" as const,
      },
      hoverColor: "hover:text-blue-500 hover:bg-blue-500/20",
      delay: 0.3,
    },
    {
      component: YouTubeButton,
      props: {
        variant: "icon" as const,
        size: "md" as const,
      },
      hoverColor: "hover:text-red-500 hover:bg-red-500/20",
      delay: 0.4,
    },
  ];

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      {socialButtons.map((button, index) => {
        const ButtonComponent = button.component;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: button.delay }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ButtonComponent
              {...button.props}
              className={`w-12 h-12 sm:w-10 sm:h-10 p-0 bg-slate-700/50 text-slate-300 rounded-xl shadow-lg hover:shadow-xl active:shadow-md transition-all duration-200 ${button.hoverColor} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800`}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

// Original version (commented for easy revert)
/*
const SocialLinks: React.FC = () => {
  return (
    <div className="flex items-center space-x-4 space-x-reverse">
      <InstagramButton
        instagramUrl="https://www.instagram.com/eladshimoniv_omets_lev"
        variant="icon"
        size="md"
        className="w-10 h-10 p-0 bg-slate-700/50 hover:bg-slate-600 text-slate-300 hover:text-pink-600"
      />

      <WhatsAppButton
        phoneNumber="972524724700"
        variant="icon"
        size="md"
        className="w-10 h-10 p-0 bg-slate-700/50 hover:bg-slate-600 text-slate-300 hover:text-green-600"
      />

      <FacebookButton
        variant="icon"
        size="md"
        className="w-10 h-10 p-0 bg-slate-700/50 hover:bg-slate-600 text-slate-300 hover:text-blue-600"
      />

      <YouTubeButton
        variant="icon"
        size="md"
        className="w-10 h-10 p-0 bg-slate-700/50 hover:bg-slate-600 text-slate-300 hover:text-red-600"
      />
    </div>
  );
};
*/

export default MobileOptimizedSocialLinks;