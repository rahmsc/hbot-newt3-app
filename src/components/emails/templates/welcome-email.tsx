import type * as React from 'react';

interface WelcomeEmailProps {
  email: string;
}

export const WelcomeEmail: React.FC<Readonly<WelcomeEmailProps>> = ({
  email,
}) => (
  <div>
    <h1>Welcome to HQ Insider!</h1>
    <p>Thank you for subscribing to our newsletter. We&apos;re excited to have you join our community!</p>
    <p>Follow us on social media to stay even more connected:</p>
    <ul>
      <li>Instagram: @yourhandle</li>
      <li>Facebook: @yourhandle</li>
      <li>Twitter: @yourhandle</li>
    </ul>
    <p>Best regards,</p>
    <p>The HQ Insider Team</p>
  </div>
); 