export interface SchoolProgram {
  id: string;
  programNumber: string;
  title: string;
  status: string;
  basicInfo: BasicInfo;
  summary: Summary;
  developmentAndOperation: DevelopmentAndOperation;
  requiredResources: RequiredResources;
  targetAudience: TargetAudience;
  tags: string[];
  programLink: string;
}

export interface BasicInfo {
  source: string;
  centralField: string;
  mainSubject: string;
  skills: string[];
  approvalPeriod: string;
  operatingYears: string;
  operator: string;
  partners: string;
  openingConditions: string;
  assessmentMethods: string;
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

export interface RequiredResources {
  staffTraining: string;
  recommendedImplementationDuration: string;
  programInstructors: string;
  schoolStaffInstructors: string;
  studentMaterials: string;
  dogUsage: string;
}

export interface TargetAudience {
  learningLevels: string;
  groupSize: string;
  targetPopulation: string;
  educationalStaffInvolvement: string;
  geographicalDistribution: string;
  educationType: string;
}

