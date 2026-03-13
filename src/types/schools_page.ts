export interface SchoolProgram {
  id: string;
  title: string;
  summary: Summary;
  developmentAndOperation: DevelopmentAndOperation;
  targetAudience: TargetAudience;
}

export interface Summary {
  description: string;
  mainMessages: string[];
}

export interface DevelopmentAndOperation {
  initiatingBody: string;
  startYear: string;
  partners: string;
  joinConditions: string;
}

export interface TargetAudience {
  learningLevels: string;
  groupSize: string;
  targetPopulation: string;
  educationalStaffInvolvement: string;
  geographicalDistribution: string;
  educationType: string;
}
