import { Play, User } from "lucide-react";
import { DialogHeader, DialogTitle } from "../../ui/dialog";
import { useLevelInfo } from "../../../hooks/useLevels";
import type { Video } from "../../../types/videos";

interface VideoModalContentProps {
  video: Video;
}

export const VideoModalContent = ({ video }: VideoModalContentProps) => {
  const { name: levelName } = useLevelInfo(video.levelId);

  return (
    <div 
      className="overflow-y-auto bg-white" 
      dir="ltr"
      style={{
        WebkitOverflowScrolling: 'touch',
        maxHeight: 'calc(95vh - 128px)'
      }}
    >
      <div dir="rtl" className="p-4 sm:p-6 pb-8">
        <DialogHeader className="mb-6 text-right">
          <DialogTitle className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 text-right leading-tight">
            {video.title}
          </DialogTitle>
          
          {video.subtitle && (
            <p className="text-lg text-slate-600 mb-4 text-right">
              {video.subtitle}
            </p>
          )}
          
          <div className="flex items-center justify-start mb-4" dir="rtl">
            <div className="flex items-center gap-4 text-slate-500">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                <span className="text-sm">רמה: {levelName}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-sm">סרטון הדרכה</span>
              </div>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed text-right text-base mb-6" dir="rtl">
            {video.description}
          </p>
        </DialogHeader>

        {/* Video Player Section */}
        <div className="bg-slate-50 rounded-lg p-4 sm:p-6 border border-slate-200 mb-6">
          <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
            {video.videoUrl ? (
              <video
                controls
                className="w-full h-full object-contain"
                preload="metadata"
                poster={video.thumbnailUrl}
              >
                <source src={video.videoUrl} type="video/mp4" />
                <p className="text-white text-center p-4">
                  הדפדפן שלך לא תומך בהצגת סרטונים. 
                  <a 
                    href={video.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline ml-1"
                  >
                    לחץ כאן לצפייה
                  </a>
                </p>
              </video>
            ) : (
              <div className="flex items-center justify-center h-full bg-slate-800">
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">הסרטון לא זמין כרגע</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Description Section */}
        <div className="bg-slate-50 rounded-lg p-4 sm:p-6 border border-slate-200 mb-6">
          <div className="max-w-none text-right" dir="rtl">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              על הסרטון
            </h3>
            <div className="text-slate-800 leading-relaxed text-lg">
              {video.description || 'פרטים נוספים על הסרטון יתווספו בקרוב...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};