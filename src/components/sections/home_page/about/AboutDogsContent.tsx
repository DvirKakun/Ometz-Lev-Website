import React from "react";
import AboutContentWithImage from "./AboutContentWithImage";

const AboutDogsContent: React.FC = () => {
  const description = (
    <>
      <p>
        תכירו את <span className="font-semibold text-primary-700">הצמד המנצח שלנו בוני ומייפל</span>, כל אחת מהן היא עולם ומלואו אבל ביחד הן פשוט <span className="font-semibold">קסם מהלך על שמונה רגליים</span>.
      </p>

      <p>
        <span className="font-semibold text-slate-800">בוני</span> היא הנסיכה עדינה עם המבט החם והלב הרחב שתמיד יודעת מתי צריך חיבוק, לעומתה <span className="font-semibold text-slate-800">מייפל</span> היא רוח הסערה המתוקה מלאת אנרגיה ושובבות שגורמת לכולנו לחייך בלי הפסקה.
      </p>

      <p>
        הן עושות הכל ביחד - ישנות צמודות, משחקות תופסת ומתכננות מזימות איך להשיג עוד חטיף.
      </p>

      <p>
        <span className="font-semibold text-primary-700">הקשר ביניהן הוא מיוחד במינו</span> והאהבה שהן מעניקות לנו (ואחת לשנייה) היא אינסופית.
      </p>
    </>
  );

  return (
    <AboutContentWithImage
      title="בוני ומייפל"
      subtitle="החברות הכי טובות והנשמה של הבית"
      description={description}
      bottomDescription="החיים הרבה יותר יפים בשניים"
      imagePath="/assets/about/dogs_about_image.png"
      imageAlt="בוני ומייפל - הכלבות הטיפוליות"
      imagePosition="right"
    />
  );
};

export default AboutDogsContent;
