/**
 * API functions for sending data to external services
 */

// Demo Survey Webhook
export const sendSurveyData = async (data: any) => {
  const response = await fetch('https://hook.eu2.make.com/2oec4witw2e3e35j3xfv8jbdonbv1lov', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to submit survey data');
  }
  
  return await response.json().catch(() => ({}));
};

// Contact Form Webhook
export const sendContactFormData = async (data: any) => {
  const response = await fetch('https://hook.eu2.make.com/tzajippi8g4qo50cferk6e1xyre2balv', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to submit contact form');
  }
  
  return await response.json().catch(() => ({}));
};