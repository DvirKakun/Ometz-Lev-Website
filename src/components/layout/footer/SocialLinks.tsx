import React from "react";
import WhatsAppButton from "../../common/WhatsAppButton";
import InstagramButton from "../../common/InstagramButton";
import FacebookButton from "../../common/FacebookButton";
import YouTubeButton from "../../common/YoutubeButton";

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

export default SocialLinks;