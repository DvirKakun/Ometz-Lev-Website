import React from "react";
import { motion } from "framer-motion";
import WhatsAppButton from "../../common/WhatsAppButton";
import InstagramButton from "../../common/InstagramButton";
import FacebookButton from "../../common/FacebookButton";
import YouTubeButton from "../../common/YoutubeButton";
import TikTokButton from "../../common/TikTokButton";

// Mobile-optimized social links with enhanced touch targets and animations
const SocialLinks: React.FC = () => {
  const socialButtons = [
    {
      component: InstagramButton,
      props: {
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
    {
      component: TikTokButton,
      props: {
        variant: "icon" as const,
        size: "md" as const,
      },
      hoverColor: "hover:text-pink-500 hover:bg-pink-500/20",
      delay: 0.5,
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
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              <ButtonComponent
                {...button.props}
                className={`w-12 h-12 sm:w-10 sm:h-10 p-0 bg-slate-700/50 text-slate-300 rounded-xl shadow-lg hover:shadow-xl active:shadow-md transition-all duration-200 ${button.hoverColor} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800`}
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SocialLinks;
