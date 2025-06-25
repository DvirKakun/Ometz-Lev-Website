import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../../ui/button";
import ImageRoller from "./ImageRoller";
import ImageDialog from "./ImageDialog";
import type { ActivitySectionProps } from "../../../types/activities";

const ActivitySection = ({
  activity,
  onRegisterClick,
}: ActivitySectionProps) => {
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    index: number;
  } | null>(null);

  const handleImageClick = (imageUrl: string, index: number) => {
    setSelectedImage({ url: imageUrl, index });
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
  };
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content - Right side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-2 lg:order-1"
            >
              <div className="mb-6">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${activity.color} rounded-xl shadow-lg mb-4`}
                >
                  <activity.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-right">
                  {activity.title}
                </h2>
              </div>

              <div className="space-y-4 text-right mb-8">
                {activity.description.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-lg text-slate-700 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}

                <div
                  className={`bg-gradient-to-r ${activity.bgColor} p-4 rounded-lg border-r-4 border-primary-500`}
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

              {activity.hasRegistration && onRegisterClick && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Button
                    onClick={onRegisterClick}
                    size="lg"
                    className={`bg-gradient-to-r ${activity.color} hover:opacity-90 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
                  >
                    <activity.icon className="w-5 h-5 ml-2" />
                    {activity.buttonText}
                  </Button>
                </motion.div>
              )}
            </motion.div>

            {/* Images - Left side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="order-1 lg:order-2"
            >
              {/* Main image */}
              <div className="relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${activity.color
                    .replace("from-", "from-")
                    .replace("to-", "to-")}/20 rounded-2xl transform rotate-3`}
                ></div>
                <div className="relative bg-white p-2 rounded-2xl shadow-2xl">
                  <img
                    src={activity.image}
                    alt={activity.imageAlt}
                    className="w-full h-auto rounded-xl cursor-pointer"
                    onClick={() => handleImageClick(activity.image, 0)}
                  />
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
              className="mt-12 max-w-6xl mx-auto"
            >
              <ImageRoller
                images={activity.images}
                alt={activity.imageAlt}
                onImageClick={handleImageClick}
              />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Image Dialog */}
      {selectedImage && (
        <ImageDialog
          isOpen={!!selectedImage}
          onClose={handleCloseDialog}
          imageUrl={selectedImage.url}
          alt={activity.imageAlt}
          imageIndex={selectedImage.index}
          totalImages={activity.images?.length || 1}
        />
      )}
    </section>
  );
};

export default ActivitySection;
