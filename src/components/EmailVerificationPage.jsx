import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';
import '../css/EmailVerificationPage.css';

const EmailVerificationPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState({
    loading: true,
    success: false,
    message: ''
  });

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`http://localhost:8000/shop/verify-email/${token}/`);
        const data = await response.json();

        if (response.ok) {
          setVerificationStatus({
            loading: false,
            success: true,
            message: data.message
          });

          if (data.tokens) {
            localStorage.setItem('access_token', data.tokens.access);
            localStorage.setItem('refresh_token', data.tokens.refresh);
          }

          setTimeout(() => {
            navigate('/');
          }, 3000);
        } else {
          setVerificationStatus({
            loading: false,
            success: false,
            message: data.message || 'Verification failed'
          });
        }
      } catch (error) {
        setVerificationStatus({
          loading: false,
          success: false,
          message: 'An error occurred during verification'
        });
      }
    };

    verifyEmail();
  }, [token, navigate]);

  if (verificationStatus.loading) {
    return (
      <div className="email-verification-container">
        <div className="email-verification-box">
          <div className="email-verification-icon">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
          <p className="email-verification-loading-msg">Verifying your email...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="email-verification-container">
      <div className="email-verification-box">
        {verificationStatus.success ? (
          <div>
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h2>Email Verified Successfully!</h2>
            <p>Your email has been verified. You will be redirected to the home page shortly.</p>
          </div>
        ) : (
          <div>
            <XCircle className="h-16 w-16 text-red-500 mx-auto" />
            <h2>Verification Failed</h2>
            <p>{verificationStatus.message}</p>
            <button
              onClick={() => navigate('/register')}
              className="email-verification-back-btn"
            >
              Back to Registration
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationPage;
