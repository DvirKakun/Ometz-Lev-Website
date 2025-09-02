import { motion } from "framer-motion";
import { Button } from "../../ui/button";
import ImageRoller from "./ImageRoller";
import type { ActivitySectionProps } from "../../../types/activities";

const ActivitySection = ({
  activity,
  onRegisterClick,
  onImageClick,
}: ActivitySectionProps) => {

  const handleImageClick = (imageUrl: string, index: number) => {
    onImageClick?.(
      imageUrl,
      index,
      index === -1 ? (activity.main_image.alt || "Activity image") : "Gallery image",
      activity.images?.length || 1
    );
  };

  return (
    <section id={activity.id} className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className={`max-w-6xl mx-auto relative ${
            activity.isPast ? "opacity-75" : ""
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center overflow-hidden">
            {/* Content - Right side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-2 lg:order-1"
            >
              <div className="mb-6">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 bg-primary-500 rounded-xl shadow-lg mb-4`}
                >
                  <activity.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-right whitespace-pre-wrap">
                  {activity.title}
                </h2>
              </div>

              <div className="space-y-4 text-right mb-8">
                {activity.description.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-lg text-slate-700 leading-relaxed whitespace-pre-wrap"
                  >
                    {paragraph}
                  </p>
                ))}

                <div
                  className={`bg-primary-200/20 p-4 rounded-lg border-r-4 border-primary-500`}
                >
                  <p className="text-slate-700 font-medium text-right">
                    <strong>מתאים לגילאי:</strong> {activity.details.ages}
                    <br />
                    <strong>משך כל מחזור:</strong> {activity.details.duration}
                    <br />
                    <strong>{activity.details.note}</strong>
                  </p>
                </div>
              </div>

              {activity.hasRegistration &&
                !activity.isPast &&
                onRegisterClick && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0 }}
                  >
                    <Button
                      onClick={onRegisterClick}
                      size="lg"
                      className={`bg-primary-500 hover:opacity-90 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
                    >
                      {activity.buttonText}
                      <activity.icon className="w-5 h-5 ml-2" />
                    </Button>
                  </motion.div>
                )}
            </motion.div>

            {/* Images - Left side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="order-1 lg:order-2"
            >
              {/* Main image */}
              <div className="relative">
                <div className="relative bg-white rounded-2xl shadow-2xl inline-block mx-auto overflow-hidden">
                  <img
                    src={activity.main_image.url || ""}
                    alt={activity.main_image.alt || "Activity image"}
                    loading="lazy"
                    className={`max-w-full max-h-80 sm:max-h-96 md:max-h-[28rem] lg:max-h-[32rem] rounded-xl object-contain ${
                      activity.isPast
                        ? "filter blur-md cursor-default"
                        : "cursor-pointer"
                    }`}
                    onClick={
                      activity.isPast
                        ? undefined
                        : () =>
                            handleImageClick(activity.main_image.url || "", -1)
                    }
                    crossOrigin="anonymous"
                  />

                  {/* Coming Soon Diagonal Banner */}
                  {activity.isPast && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-xl overflow-hidden">
                      {/* Center overlay with icon */}
                      <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
                          <activity.icon className="w-8 h-8 text-slate-600" />
                        </div>
                      </div>

                      {/* Diagonal banner - on top of overlay */}
                      <div className="absolute top-0 right-0 w-full h-full z-10">
                        <div className="absolute top-4 -right-12 bg-gradient-to-r from-primary-400 to-primary-500 text-white font-bold px-16 py-2 text-lg transform rotate-45 shadow-lg">
                          בקרוב
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Image roller spanning full width below both columns */}
          {activity.images && activity.images.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className={`mt-12 max-w-6xl mx-auto`}
            >
              <ImageRoller
                images={activity.images}
                onImageClick={handleImageClick}
              />
            </motion.div>
          )}
        </motion.div>
      </div>

    </section>
  );
};

export default ActivitySection;
