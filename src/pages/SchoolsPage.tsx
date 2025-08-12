import { useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, School, Users, Clock, MapPin, BookOpen, Target, Award } from "lucide-react";
import MainHeader from "../components/sections/shared/headers/MainHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { FAQSection } from "../components/sections/shared/faq";
import FaqSchema from "../components/seo/FaqSchema";
import { schoolProgram } from "../data/schools";
import type { ServicePageProps } from "../types/service_page";

export default function SchoolsPage({ service }: ServicePageProps) {
  useEffect(() => {
    document.title = "תכנית גפן - תוכנית חינוכית לבתי ספר עם כלבים | אומץ לב";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "תכנית גפן - תוכנית חינוכית ייחודית לבתי ספר המשלבת עבודה עם כלבים לפיתוח ערכים, אמפתיה ואחריות אצל ילדים. תוכנית מאושרת במערכת החינוך."
      );
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      {/* Header Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <MainHeader
                title={service?.title || "תכנית גפן"}
                description={service?.description || "תוכנית חינוכית ייחודית בבתי ספר"}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Program Details Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Program Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <School className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold text-gray-900">
                  {schoolProgram.title}
                </h2>
              </div>
              <div className="flex items-center justify-center gap-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  תכנית מספר {schoolProgram.programNumber}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {schoolProgram.status}
                </span>
              </div>
            </div>

            {/* Program Summary */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  מטרת התכנית
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {schoolProgram.summary.description}
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">המסרים המרכזיים:</h4>
                  <div className="flex flex-wrap gap-2">
                    {schoolProgram.summary.mainMessages.map((message, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                        {message}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Program Details Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    פרטי התכנית
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium">מקור התכנית:</span>
                    <span className="mr-2">{schoolProgram.basicInfo.source}</span>
                  </div>
                  <div>
                    <span className="font-medium">תחום מרכזי:</span>
                    <span className="mr-2">{schoolProgram.basicInfo.centralField}</span>
                  </div>
                  <div>
                    <span className="font-medium">מפעיל:</span>
                    <span className="mr-2">{schoolProgram.basicInfo.operator}</span>
                  </div>
                  <div>
                    <span className="font-medium">שנות הפעלה:</span>
                    <span className="mr-2">{schoolProgram.basicInfo.operatingYears}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Target Audience */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    קהל יעד
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium">שכבות למידה:</span>
                    <span className="mr-2">{schoolProgram.targetAudience.learningLevels}</span>
                  </div>
                  <div>
                    <span className="font-medium">גודל קבוצה:</span>
                    <span className="mr-2">{schoolProgram.targetAudience.groupSize}</span>
                  </div>
                  <div>
                    <span className="font-medium">סוג חינוך:</span>
                    <span className="mr-2">{schoolProgram.targetAudience.educationType}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Required Resources */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    משאבים נדרשים
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium">הכשרת צוות:</span>
                    <span className="mr-2">{schoolProgram.requiredResources.staffTraining}</span>
                  </div>
                  <div>
                    <span className="font-medium">משך הטמעה:</span>
                    <span className="mr-2">{schoolProgram.requiredResources.recommendedImplementationDuration}</span>
                  </div>
                  <div>
                    <span className="font-medium">שימוש בכלבים:</span>
                    <span className="mr-2">{schoolProgram.requiredResources.dogUsage}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Geographic Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    פריסה גאוגרפית
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{schoolProgram.targetAudience.geographicalDistribution}</p>
                </CardContent>
              </Card>
            </div>

            {/* Skills and Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  מיומנויות ותחומי התמחות
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">מיומנויות מרכזיות:</h4>
                    <div className="flex flex-wrap gap-2">
                      {schoolProgram.basicInfo.skills.map((skill, index) => (
                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">תגיות:</h4>
                    <div className="flex flex-wrap gap-2">
                      {schoolProgram.tags.map((tag, index) => (
                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border border-gray-300 text-gray-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Program Link */}
            <div className="text-center">
              <Button asChild size="lg" className="text-lg px-8">
                <a
                  href={schoolProgram.programLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  צפייה בתכנית במערכת החינוך
                  <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection pageType="schools" service={service} />
      
      {/* SEO: FAQ Structured Data */}
      <FaqSchema pageType="schools" />
    </motion.div>
  );
}
