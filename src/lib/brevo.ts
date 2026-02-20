// Helper function to get the correct API URL based on environment
const getApiUrl = (endpoint: string): string => {
  // In production (Netlify), use relative path
  // In development, use localhost or Netlify dev server
  if (import.meta.env.DEV) {
    // For local development with Netlify CLI
    return `http://localhost:8888/.netlify/functions/${endpoint}`;
  }
  return `/.netlify/functions/${endpoint}`;
};

// Helper for summer camp registration emails
export const sendSummerCampRegistration = async (data: {
  activityName: string;
  session: string;
  childName: string;
  age: number | string;
  grade: string;
  motherName?: string | null;
  motherPhone?: string | null;
  fatherName?: string | null;
  fatherPhone?: string | null;
  parentEmail: string;
  dogFear: string | null;
  dogFearScale?: number | null;
  allergies: string | null;
  allergiesText?: string | null;
  healthIssues: string | null;
  healthIssuesText?: string | null;
  notes?: string | null;
  activityStartDate?: string;
  activityEndDate?: string;
}): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch(getApiUrl('send-summer-camp-registration'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to send email: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Helper for contact form emails
export const sendContactForm = async (data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch(getApiUrl('send-contact-form'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to send email: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Helper for pre-questionnaire form
export const sendPreQuestionnaire = async (data: {
  ageYears: number;
  ageMonths: number;
  ageWeeks: number;
  hasAllergies: string;
  allergiesDetails?: string;
  hasSurgeryOrInjury: string;
  surgeryDetails?: string;
  hasBitten: string;
  biteDetails?: string;
  wearsMuzzle?: string;
  contactName: string;
  contactPhone: string;
  city: string;
  street: string;
  houseNumber: string;
  floor: string;
  apartment?: string;
  entranceCode?: string;
}): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch(getApiUrl('send-pre-questionnaire'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to send email: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
