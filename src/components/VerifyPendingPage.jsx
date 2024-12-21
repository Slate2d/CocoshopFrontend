import React from 'react';
import { useLocation } from 'react-router-dom';
import { Mail } from 'lucide-react';
import '../css/VerifyPendingPage.css';

const VerifyPendingPage = () => {
  const location = useLocation();
  const email = location.state?.email || 'your email';

  return (
    <div className="verify-pending-container">
      <div className="verify-pending-box">
        <div className="verify-pending-icon">
          <Mail className="h-12 w-12 text-blue-600" />
        </div>
        <h2>Verify your email</h2>
        <p>We've sent a verification link to <span className="font-medium text-gray-900">{email}</span></p>
        <div className="verify-pending-steps">
          <h3>Next steps:</h3>
          <ol>
            <li>Check your email inbox for the verification link</li>
            <li>Click the link in the email to verify your account</li>
            <li>After verification, you'll be able to sign in</li>
          </ol>
        </div>
        <div className="verify-pending-msg">
          <p>Didn't receive the email? Check your spam folder</p>
          <button className="verify-pending-resend-btn">Click here to resend</button>
        </div>
      </div>
    </div>
  );
};

export default VerifyPendingPage;
