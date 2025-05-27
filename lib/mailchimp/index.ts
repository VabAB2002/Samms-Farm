/**
 * Mailchimp Integration
 * Handles newsletter subscriptions using the Mailchimp Marketing API
 */
import crypto from 'crypto';

// Create MD5 hash function
const md5 = (input: string): string => {
  return crypto.createHash('md5').update(input).digest('hex');
};

// Mailchimp API URLs
const DC = process.env.MAILCHIMP_DC || 'us1';
const LIST_ID = process.env.MAILCHIMP_LIST_ID;
const API_KEY = process.env.MAILCHIMP_API_KEY;
const BASE_URL = `https://${DC}.api.mailchimp.com/3.0`;

/**
 * Subscribe a user to the newsletter
 * @param email User's email address
 * @param firstName Optional first name
 * @param lastName Optional last name
 */
export async function subscribeToNewsletter(
  email: string,
  firstName?: string,
  lastName?: string
): Promise<{ success: boolean; error?: string }> {
  if (!API_KEY || !LIST_ID) {
    console.error('Mailchimp API key or List ID not configured');
    return {
      success: false,
      error: 'Newsletter service is not properly configured',
    };
  }

  // Create an MD5 hash of the lowercase email address for the subscriber ID
  const subscriberHash = md5(email.toLowerCase());

  try {
    // Check if the user is already subscribed before trying to add them
    const checkResponse = await fetch(
      `${BASE_URL}/lists/${LIST_ID}/members/${subscriberHash}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(`apikey:${API_KEY}`).toString('base64')}`,
        },
      }
    );

    const checkData = await checkResponse.json();

    if (checkResponse.ok && checkData.status === 'subscribed') {
      return {
        success: true,
      };
    }

    // Prepare member data
    const memberData = {
      email_address: email,
      status: 'pending', // Use 'pending' for double opt-in, 'subscribed' for single opt-in
      merge_fields: {
        ...(firstName && { FNAME: firstName }),
        ...(lastName && { LNAME: lastName }),
      },
      tags: ['website-signup'],
    };

    // Make API request
    const response = await fetch(`${BASE_URL}/lists/${LIST_ID}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`apikey:${API_KEY}`).toString('base64')}`,
      },
      body: JSON.stringify(memberData),
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle specific error cases
      if (data.title === 'Member Exists') {
        // Update the existing member's subscription status if they previously unsubscribed
        return await updateSubscriberStatus(subscriberHash, 'pending');
      }

      return {
        success: false,
        error: data.detail || data.title || 'Failed to subscribe',
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Mailchimp API error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Update a subscriber's status
 * @param subscriberHash MD5 hash of the email address
 * @param status New status ('subscribed', 'unsubscribed', 'pending', etc.)
 */
export async function updateSubscriberStatus(
  subscriberHash: string,
  status: 'subscribed' | 'unsubscribed' | 'pending' | 'cleaned'
): Promise<{ success: boolean; error?: string }> {
  if (!API_KEY || !LIST_ID) {
    return {
      success: false,
      error: 'Newsletter service is not properly configured',
    };
  }

  try {
    const response = await fetch(
      `${BASE_URL}/lists/${LIST_ID}/members/${subscriberHash}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(`apikey:${API_KEY}`).toString('base64')}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.detail || data.title || 'Failed to update subscription status',
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Mailchimp API error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
