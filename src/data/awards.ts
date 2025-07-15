// Awards and certifications data
export const awards: string[] = [
  "כלבן טיפולי",
  "מאמן כלבים", 
  "מטפל התנהגותי"
];

// Award with delay type
export interface AwardWithDelay {
  text: string;
  delay: number;
}

// Awards with animation delays for AwardsBadges component
export const awardsWithDelay: AwardWithDelay[] = [
  { text: "כלבן טיפולי", delay: 0.5 },
  { text: "מאמן כלבים", delay: 0.6 },
  { text: "מטפל התנהגותי", delay: 0.7 },
];