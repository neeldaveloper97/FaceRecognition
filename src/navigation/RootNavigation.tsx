import React from 'react';
import AppNavigation from './AppNavigation';
import AuthNavigation from './AuthNavigation';

export default function RootNavigation() {
  /**
   * isAuthenticated, we will manage through the ContextAPI
   */
  const isAuthenticated = true;
  return isAuthenticated ? <AppNavigation /> : <AuthNavigation />;
}
