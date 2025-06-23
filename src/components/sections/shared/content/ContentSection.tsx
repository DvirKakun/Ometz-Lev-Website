import { motion } from "framer-motion";
import { Video, BookOpen } from "lucide-react";
import SectionHeader from "../headers/SectionHeader";
import LibraryCTA from "../cta/LibraryCTA";
import DemoContentGrid from "./DemoContentGrid";

interface ContentSectionProps {
  contentType: "videos" | "articles";
  pageType: "training" | "therapy";
  sectionConfig: {
    title: string;
    description: string;
    libraryPath: string;
    libraryTitle: string;
    buttonText: string;
    accentColor: string;
    gradientFrom: string;
    gradientTo: string;
  };
}

const ContentSection = ({ contentType, pageType, sectionConfig }: ContentSectionProps) => {
  const icon = contentType === "videos" ? Video : BookOpen;

  return (
    <section id={contentType} className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <SectionHeader
            icon={icon}
            title={sectionConfig.title}
            description={sectionConfig.description}
            gradientFrom={sectionConfig.gradientFrom}
            gradientTo={sectionConfig.gradientTo}
          />

          <LibraryCTA
            contentType={contentType}
            pageType={pageType}
            libraryPath={sectionConfig.libraryPath}
            title={sectionConfig.libraryTitle}
            accentColor={sectionConfig.accentColor}
            buttonText={sectionConfig.buttonText}
          />

          <DemoContentGrid
            contentType={contentType}
            pageType={pageType}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ContentSection;