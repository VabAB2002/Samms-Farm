'use client';

import React, { useState } from 'react';

type NewsletterFormProps = {
  className?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  placeholderText?: string;
  darkMode?: boolean;
};

const NewsletterForm: React.FC<NewsletterFormProps> = ({
  className = '',
  title = 'Stay Connected with Our Farm',
  description = 'Sign up for our newsletter to receive updates on seasonal menus, upcoming events, and farm news.',
  buttonText = 'Subscribe',
  placeholderText = 'Your email address',
  darkMode = false,
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    try {
      // Replace with your actual API endpoint for Mailchimp subscription
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      setStatus('success');
      setMessage('Thank you for subscribing! Please check your email to confirm.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  // Color classes based on dark/light mode
  const colorClasses = darkMode
    ? {
        container: 'bg-green-900 text-white',
        input: 'bg-green-800 border-green-700 text-white placeholder-green-400',
        button: 'bg-amber-600 hover:bg-amber-700 text-white',
        successText: 'text-green-300',
        errorText: 'text-red-300',
      }
    : {
        container: 'bg-cream-100 text-green-900',
        input: 'bg-white border-amber-200 text-gray-800 placeholder-gray-400',
        button: 'bg-green-700 hover:bg-green-800 text-white',
        successText: 'text-green-700',
        errorText: 'text-red-600',
      };

  return (
    <div className={`newsletter-form rounded-xl p-6 ${colorClasses.container} ${className}`}>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="mb-4 opacity-80">{description}</p>
      
      {status === 'success' ? (
        <div className={`rounded-md p-4 mb-4 ${colorClasses.successText}`}>
          {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholderText}
              className={`flex-grow px-4 py-2 rounded-md border ${colorClasses.input} focus:outline-none focus:ring-2 focus:ring-amber-500`}
              disabled={status === 'loading'}
              required
            />
            <button
              type="submit"
              className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${colorClasses.button} disabled:opacity-70`}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Subscribing...' : buttonText}
            </button>
          </div>
          
          {status === 'error' && (
            <div className={`text-sm ${colorClasses.errorText}`}>
              {message}
            </div>
          )}
        </form>
      )}
      
      {/* Privacy note */}
      <p className="mt-3 text-xs opacity-70">
        By subscribing, you agree to our privacy policy. We'll never share your email with third parties.
      </p>
    </div>
  );
};

export default NewsletterForm;
