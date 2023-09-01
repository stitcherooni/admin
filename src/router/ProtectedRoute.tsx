import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import React, { ReactNode } from 'react';
import UnauthorizedLayout from '../layouts/UnauthorizedLayout/UnauthorizedLayout';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => (
  <>
    <AuthenticatedTemplate>
      { children }
    </AuthenticatedTemplate>
    <UnauthenticatedTemplate>
      <UnauthorizedLayout />
    </UnauthenticatedTemplate>
  </>
);
