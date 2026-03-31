import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import { Users, MapPin, Target } from "lucide-react";
import ServiceHeader from "../components/sections/shared/headers/MainHeader";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { FAQSection } from "../components/sections/shared/faq";
import SEOMeta from "../components/seo/SEOMeta";
import SEOJsonLD from "../components/seo/SEOJsonLD";
import { getKeywordsForPage } from "../data/seo-keywords";
import { schoolProgram } from "../data/schools";
import type { ServicePageProps } from "../types/service_page";

export default function SchoolsPage({ service }: ServicePageProps) {
  // SEO Configuration for Schools Page
  const seoConfig = {
    title:
      "יוזמות חינוכיות - תכניות חינוכיות עם כלבים לבתי ספר | אלעד שמעונוב - אומץ לב",
    description:
      "אלעד שמעונוב - תכניות חינוכיות מותאמות לגילאים שונים עם כלבים. יוזמות חינוכיות לבתי ספר, סדנאות חינוכיות, פיתוח אחריות ואמפתיה. תכנית מאושרת במערכת החינוך. צרו קשר!",
    keywords: getKeywordsForPage("schools"),
    imageUrl: "https://ometzlev.co.il/assets/icons/Ometz-Lev-Large-Logo.png",
    imageAlt: "תלמידים בתכנית חינוכית עם כלב במסגרת יוזמות חינוכיות",
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOMeta
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        imageUrl={seoConfig.imageUrl}
        imageAlt={seoConfig.imageAlt}
        canonicalUrl="https://ometzlev.co.il/schools"
        type="service"
      />

      {/* SEO Structured Data */}
      <SEOJsonLD
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        pageType="schools"
        imageUrl={seoConfig.imageUrl}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen"
      >
        {/* Header Section */}
        <section className="py-16 bg-slate-900/85">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <ServiceHeader
                  title={service?.title || "יוזמות חינוכיות"}
                  description={
                    service?.description || "תוכנית חינוכית ייחודית בבתי ספר"
                  }
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
                  <h3 className="text-3xl font-bold">
                    <span className="text-slate-900">אומץ לב - </span>
                    <span className="text-primary-500">
                      {schoolProgram.title}
                    </span>
                  </h3>
                </div>
              </div>

              {/* Program Summary */}
              <Card className="mb-8">
                <CardHeader>
                  <h4 className="flex items-center gap-2 text-primary-500 font-semibold leading-none tracking-tight">
                    <Target className="w-5 h-5" />
                    מטרת התכנית
                  </h4>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {schoolProgram.summary.description
                      .split("\n")
                      .map((line, index) => (
                        <span key={index}>
                          {line}
                          {index <
                            schoolProgram.summary.description.split("\n")
                              .length -
                              1 && <br />}
                        </span>
                      ))}
                  </p>
                  <div className="space-y-2">
                    <h5 className="font-semibold text-primary-500">
                      המסרים המרכזיים:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {schoolProgram.summary.mainMessages.map(
                        (message, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary"
                          >
                            {message}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Program Details Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Target Audience */}
                <Card>
                  <CardHeader>
                    <h4 className="flex items-center gap-2 text-primary-500 font-semibold leading-none tracking-tight">
                      <Users className="w-5 h-5" />
                      קהל יעד
                    </h4>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="font-medium">שכבות למידה:</span>
                      <span className="mr-2">
                        {schoolProgram.targetAudience.learningLevels}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">גודל קבוצה:</span>
                      <span className="mr-2">
                        {schoolProgram.targetAudience.groupSize}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">סוג חינוך:</span>
                      <span className="mr-2">
                        {schoolProgram.targetAudience.educationType}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Geographic Distribution */}
                <Card>
                  <CardHeader>
                    <h4 className="flex items-center gap-2 text-primary-500 font-semibold leading-none tracking-tight">
                      <MapPin className="w-5 h-5" />
                      פריסה גאוגרפית
                    </h4>
                  </CardHeader>
                  <CardContent>
                    <p>
                      {schoolProgram.targetAudience.geographicalDistribution}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection pageType="schools" />
      </motion.div>

      {/* Render modal based on current route */}
      <Outlet />
    </>
  );
}
