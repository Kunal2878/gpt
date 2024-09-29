'use client'
import { Amplify, type ResourcesConfig } from 'aws-amplify';
import { useEffect } from 'react';

export const authConfig: ResourcesConfig["Auth"] = {
  Cognito: {
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID ?? '',
    userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID ?? '',
    // signUpVerificationMethod: 'code'
  }
};

Amplify.configure(
  {
    Auth: authConfig,
  },
  { ssr: true }
);

export default function configureAmplifyClient() {
  // Initialize Amplify on client-side


  return null
  
}