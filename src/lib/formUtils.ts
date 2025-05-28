/**
 * Utility functions for form validation and data handling
 */

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number format (basic validation)
export const isValidPhone = (phone: string): boolean => {
  // Allow for international format with + and spaces
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone);
};

// Format form data for webhook submission
export const formatFormData = (data: Record<string, any>): Record<string, any> => {
  // Create a copy to avoid modifying original data
  const formattedData = { ...data };
  
  // Format arrays as comma-separated strings if needed
  Object.keys(formattedData).forEach(key => {
    if (Array.isArray(formattedData[key])) {
      formattedData[key] = formattedData[key].join(', ');
    }
  });
  
  // Add submission timestamp
  formattedData.submittedAt = new Date().toISOString();
  
  // Add source information
  formattedData.source = window.location.href;
  formattedData.userAgent = navigator.userAgent;
  
  return formattedData;
};

// Generate a unique submission ID
export const generateSubmissionId = (): string => {
  return `sub_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};