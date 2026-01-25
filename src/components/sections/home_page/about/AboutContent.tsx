import React from "react";
import AboutContentWithImage from "./AboutContentWithImage";

const AboutContent: React.FC = () => {
  const description = (
    <>
      <p>
        אני אלעד שמעונוב,{" "}
        <span className="font-semibold text-slate-800">
          מאלף כלבים בכיר, מטפל התנהגותי מקצועי ומדריך כלבנות טיפולית
        </span>
        .
      </p>

      <p>
        המסע המקצועי שלי בעולם הכלבנות החל עוד ב-
        <span className="font-semibold text-primary-700">2016</span> וכיום אחרי
        למעלה מ-<span className="font-semibold text-primary-700">9 שנים</span>{" "}
        של עשייה יומיומית בשטח, אני מביא איתי ניסיון עשיר ומגוון.<br></br>{" "}
        ההתמחות שלי נעה בין{" "}
        <span className="font-semibold">
          אילוף וטיפול התנהגותי לכלבים ריאקטיביים
        </span>
        , דרך עבודה במסגרות חינוכיות ותל"ן עם עבודה{" "}
        <span className="font-semibold">מעל 5 שנים בבתי ספר</span> ועד להובלת{" "}
        <span className="font-semibold">קייטנות וחוגי אילוף לילדים ונוער</span>.
      </p>

      <p>
        <span className="font-semibold text-primary-700">בכלבנות טיפולית</span>{" "}
        - חלק משמעותי בעבודתי הוא עזרה לאנשים וילדים המפחדים מכלבים ובניית{" "}
        <span className="font-semibold">
          תחושת מסוגלות חדשה והגברת הביטחון העצמי.
        </span>
        <br></br>
        אני מאמין שהבסיס לכל הצלחה הוא קודם כל{" "}
        <span className="font-semibold text-primary-700">
          תחושת הביטחון שלכם בתהליך
        </span>
        .<br></br>
        אני כאן כדי להוביל אתכם בדרך רגועה, נטולת לחץ ומכילה, שתאפשר לכם ללמוד
        ולהתפתח בנחת.
        <br></br>
        <span className="font-semibold text-primary-700">באילוף</span> - המטרה
        שלי היא לבנות ביניכם לבין הכלב{" "}
        <span className="font-semibold">שפה משותפת</span> שתשדרג את איכות החיים
        בבית.
      </p>

      <p>
        הניסיון שלי מלמד שכאשר נוצר ביטחון מגיע השקט הנפשי ואיתו ההצלחה{" "}
        <span className="font-semibold">ותוצאות שנשארות לאורך זמן</span>.
      </p>
    </>
  );

  return (
    <AboutContentWithImage
      title="אלעד שמעונוב"
      subtitle="מאלף כלבים בכיר, מטפל התנהגותי מקצועי ומדריך כלבנות טיפולית"
      description={description}
      bottomDescription="מוזמנים להצטרף למסע המיוחד הזה איתי."
      imagePath="/assets/about/elad_about_image.png"
      imageAlt="אלעד שמעונוב עם הכלבות בוני ומייפל"
      imagePosition="right"
    />
  );
};

export default AboutContent;
