import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  getAuth
} from 'firebase/auth';
import type { ConfirmationResult } from 'firebase/auth';
import { app } from './firebase.config';

const auth = getAuth(app);

// Phone Authentication
export const setupRecaptcha = (containerId: string): RecaptchaVerifier => {
  return new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved - will proceed with phone auth
    }
  });
};

export const sendPhoneOTP = async (
  phoneNumber: string,
  recaptchaVerifier: RecaptchaVerifier
): Promise<ConfirmationResult> => {
  // Add +91 if not present
  const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
  return await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifier);
};

export const verifyPhoneOTP = async (
  confirmationResult: ConfirmationResult,
  otp: string
) => {
  return await confirmationResult.confirm(otp);
};

// Email Authentication
export const sendEmailMagicLink = async (email: string) => {
  const actionCodeSettings = {
    url: window.location.href, // Redirect back to current page
    handleCodeInApp: true,
  };

  await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  // Save email to localStorage to complete sign-in
  window.localStorage.setItem('emailForSignIn', email);
};

export const completeEmailSignIn = async (url: string) => {
  if (isSignInWithEmailLink(auth, url)) {
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      email = window.prompt('Please provide your email for confirmation');
    }
    if (email) {
      const result = await signInWithEmailLink(auth, email, url);
      window.localStorage.removeItem('emailForSignIn');
      return result;
    }
  }
  return null;
};
