'use client'
import { Provider } from 'react-redux';
import { store } from './state';
import { Amplify, type ResourcesConfig } from 'aws-amplify';
export const authConfig: ResourcesConfig["Auth"] = {
  Cognito: {
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID ?? '',
    userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID ?? '',
 
  }
};

Amplify.configure(
  {
    Auth: authConfig,
  },
  { ssr: true }
);
export  function ReduxProvider({ children }: { children: React.ReactNode }) {
  return(
    <Provider store={store}>
    
    {children}
    </Provider>
  ) 
}
