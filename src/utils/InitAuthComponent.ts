/* eslint-disable max-len */
import { AuthError, AuthenticationResult, EventType, PublicClientApplication, RedirectRequest } from '@azure/msal-browser';
import { useEffect } from 'react';
import { b2cPolicies, silentRequest } from '../authConfig';
import { msalInstance } from '..';

interface InitAuthComponentProps {
  instance: PublicClientApplication;
}

export const InitAuthComponent = ({ instance }: InitAuthComponentProps) => {
  useEffect(() => {
    instance.enableAccountStorageEvents();
    const callbackId = instance.addEventCallback((event) => {
      const { eventType } = event;
      const payload = event.payload as AuthenticationResult;
      const error = event.error as AuthError;

      if (error && error.errorCode === 'no_tokens_found') msalInstance.logoutRedirect();

      if (
        (eventType === EventType.LOGIN_SUCCESS || eventType === EventType.ACQUIRE_TOKEN_SUCCESS) && payload?.account
      ) {
        /**
               * For the purpose of setting an active account for UI update, we want to consider only the auth
               * response resulting from SUSI flow. "tfp" claim in the id token tells us the policy (NOTE: legacy
               * policies may use "acr" instead of "tfp"). To learn more about B2C tokens, visit:
               * https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
               */
        if ((payload.idTokenClaims as Record<string, string>).tfp === b2cPolicies.names.editProfile) {
          // retrieve the account from initial sing-in to the app
          const originalSignInAccount = instance
            .getAllAccounts()
            .find(
              (account) => {
                const idTokenClaims = account?.idTokenClaims;
                return idTokenClaims?.oid === (payload.idTokenClaims as Record<string, string>).oid
                && idTokenClaims?.sub === (payload.idTokenClaims as Record<string, string>).sub
                && idTokenClaims.tfp === b2cPolicies.names.signUpSignIn
              }
            );

          const signUpSignInFlowRequest = {
            authority: b2cPolicies.authorities.signUpSignIn.authority,
            account: originalSignInAccount,
          };

          // silently login again with the signUpSignIn policy
          instance.ssoSilent(signUpSignInFlowRequest);
        }

        /**
               * Below we are checking if the user is returning from the reset password flow.
               * If so, we will ask the user to reauthenticate with their new password.
               * If you do not want this behavior and prefer your users to stay signed in instead,
               * you can replace the code below with the same pattern used for handling the return from
               * profile edit flow
               */
        if ((payload.idTokenClaims as Record<string, string>).tfp === b2cPolicies.names.forgotPassword) {
          const signUpSignInFlowRequest = {
            authority: b2cPolicies.authorities.signUpSignIn.authority,
          };
          instance.loginRedirect(signUpSignInFlowRequest as RedirectRequest);
        }
      }

      if (
        (event.eventType === EventType.LOGIN_SUCCESS
                || event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
                || event.eventType === EventType.SSO_SILENT_SUCCESS)
            && payload.account
      ) {
        instance.setActiveAccount(payload.account);
      }

      if (eventType === EventType.LOGIN_FAILURE) {
        // Check for forgot password error
        // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
        if (event.error && (event.error as AuthError).errorMessage.includes('AADB2C90118')) {
          const resetPasswordRequest = {
            authority: b2cPolicies.authorities.forgotPassword.authority,
            scopes: [],
          };
          instance.loginRedirect(resetPasswordRequest);
        }
      }

      if (event.error && (event.error as AuthError).errorMessage.includes('AADB2C90080')) {
        instance.logoutRedirect({ postLogoutRedirectUri: document.location.href.split('//')[1] });
      }
    });

    return () => {
      instance.disableAccountStorageEvents();
      if (callbackId) {
        instance.removeEventCallback(callbackId);
      }
    };
    // eslint-disable-next-line
  }, [instance]);

  return null;
};
