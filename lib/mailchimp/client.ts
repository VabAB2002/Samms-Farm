import mailchimp from '@mailchimp/mailchimp_marketing';

// Initialize Mailchimp client
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, // e.g., 'us1'
});

export const mailchimpClient = mailchimp;

// Helper function to subscribe a user to the newsletter
export async function subscribeToNewsletter(email: string, firstName?: string, lastName?: string) {
  try {
    const listId = process.env.MAILCHIMP_LIST_ID || '';
    
    const response = await mailchimpClient.lists.addListMember(listId, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName || '',
        LNAME: lastName || '',
      },
    });
    
    return {
      success: true,
      data: response,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Error subscribing to newsletter',
    };
  }
}
