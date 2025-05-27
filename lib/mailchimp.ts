import mailchimp from '@mailchimp/mailchimp_marketing';

// Initialize the Mailchimp client
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export default mailchimp;

// Subscribe a new member to your newsletter
export async function subscribeToNewsletter(email: string, firstName?: string, lastName?: string) {
  try {
    const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID || '', {
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
    // Handle errors gracefully
    if (error.response && error.response.body && error.response.body.title === 'Member Exists') {
      return {
        success: false,
        error: 'This email is already subscribed to the newsletter.',
      };
    }
    
    return {
      success: false,
      error: error.message || 'An error occurred while subscribing to the newsletter.',
    };
  }
}
