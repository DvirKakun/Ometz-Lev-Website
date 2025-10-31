import { Button } from "../../ui/button";
import ImageRoller from "./ImageRoller";
import type { ActivitySectionProps } from "../../../types/activities";

const ActivitySection = ({
  activity,
  onRegisterClick,
  onImageClick,
}: ActivitySectionProps) => {
  const { status } = activity;
  const isPast = status === "past";
  const isComingSoon = status === "coming_soon";
  const isInProgress = status === "in_progress";
  const isRegisterable = status === "registerable";
  const handleImageClick = (imageUrl: string, index: number) => {
    onImageClick?.(
      imageUrl,
      index,
      index === -1
        ? activity.main_image.alt || "Activity image"
        : "Gallery image",
      activity.images?.length || 1
    );
  };

  return (
    <div id={activity.id} className="py-4 bg-white overflow-hidden">
      <div className="px-3 sm:px-6">
        <div className={`relative ${isPast ? "opacity-75" : ""}`}>
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-6 lg:gap-12 items-center overflow-hidden">
            {/* Content - Right side */}
            <div className="order-1">
              <div className="mb-3 sm:mb-4">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-2 sm:mb-3 text-right whitespace-pre-wrap">
                  {activity.title}
                </h2>
              </div>

              <div className="space-y-2 sm:space-y-3 text-right mb-4 sm:mb-6">
                {activity.description.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-[12px] sm:text-base text-slate-700 leading-relaxed whitespace-pre-wrap"
                  >
                    {paragraph}
                  </p>
                ))}

                <div
                  className={`bg-primary-200/20 p-2 sm:p-3 rounded-lg border-r-4 border-primary-500`}
                >
                  <p className="text-slate-700 font-medium text-right text-xs sm:text-sm">
                    <strong>מתאים לגילאי:</strong> {activity.details.ages}
                    <br />
                    <strong>משך כל מחזור:</strong> {activity.details.duration}
                    <br />
                    <strong>{activity.details.note}</strong>
                  </p>
                </div>
              </div>

              {activity.hasRegistration &&
                isRegisterable &&
                onRegisterClick && (
                  <div>
                    <Button
                      onClick={onRegisterClick}
                      size="lg"
                      className={`bg-primary-500 hover:opacity-90 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
                    >
                      {activity.buttonText}
                      <activity.icon className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                )}
            </div>

            {/* Images - Left side */}
            <div className="order-1 sm:order-1 lg:order-2 flex justify-center items-center">
              {/* Main image */}
              <div className="relative">
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <img
                    src={activity.main_image.url || ""}
                    alt={activity.main_image.alt || "Activity image"}
                    loading="lazy"
                    className={`max-w-full max-h-48 sm:max-h-56 md:max-h-64 lg:max-h-96 rounded-xl object-contain ${
                      !isRegisterable
                        ? `filter blur-md cursor-default ${isPast ? "grayscale" : ""}`
                        : "cursor-pointer"
                    }`}
                    onClick={
                      !isRegisterable
                        ? undefined
                        : () =>
                            handleImageClick(activity.main_image.url || "", -1)
                    }
                    crossOrigin="anonymous"
                  />

                  {/* Activity Overlays and Banners */}
                  {(isPast || isComingSoon || isInProgress) && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-xl overflow-hidden">
                      {/* Overlay - priority: isComingSoon > isInProgress > isPast */}
                      <div
                        className={`absolute inset-0 rounded-xl flex items-center justify-center ${
                          isComingSoon
                            ? "bg-black/30"
                            : isInProgress
                            ? "bg-black/30"
                            : isPast
                            ? "bg-black/20"
                            : "bg-gray-500/50"
                        }`}
                      >
                        <div className={`backdrop-blur-sm rounded-full p-4 shadow-lg ${
                          isPast ? "bg-gray-800/80" : "bg-white/90"
                        }`}>
                          <activity.icon className={`w-8 h-8 ${
                            isPast ? "text-white" : "text-slate-600"
                          }`} />
                        </div>
                      </div>

                      {/* Diagonal banner - primary for coming soon, green for in-progress, red for past */}
                      <div className="absolute top-0 right-0 w-full h-full z-10">
                        <div
                          className={`absolute top-4 -right-12 text-white font-bold px-16 py-2 text-lg transform rotate-45 shadow-lg ${
                            isComingSoon
                              ? "bg-gradient-to-r from-primary-400 to-primary-500"
                              : isInProgress
                              ? "bg-gradient-to-r from-green-500 to-green-600"
                              : "bg-gradient-to-r from-red-500 to-red-600"
                          }`}
                        >
                          {isComingSoon
                            ? "בקרוב"
                            : isInProgress
                            ? "בעיצומה"
                            : "הסתיימה"}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Image roller spanning full width below both columns */}
          {activity.images && activity.images.length > 1 && (
            <div className={`mt-6 max-w-6xl mx-auto`}>
              <ImageRoller
                images={activity.images}
                onImageClick={handleImageClick}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivitySection;
