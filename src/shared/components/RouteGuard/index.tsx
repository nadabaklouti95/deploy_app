import React, { ReactNode } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useUser } from 'shared/hooks/UserContext';

interface RouteGuardProps {
  children: ReactNode;
}

const isConfigPath = (pathName: string, accessRulesRoutes: string[]) => {
  return accessRulesRoutes.some((route) => pathName.includes(route));
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const location = useLocation();
  const userContext = useUser();

  if (userContext) {
    const { accessRulesRoutes } = userContext;

    if (accessRulesRoutes) {
      const statusPath = isConfigPath(location.pathname, accessRulesRoutes);

      return (
        <>
          {statusPath ? (
            children
          ) : (
            <Redirect to="/error-pages/error-403" /> // Redirect to error-404 if the route is not allowed
          )}
        </>
      );
    } else {
      // Render a loading indicator or placeholder content while waiting for accessRulesRoutes
      return <div/>; 
    }
  }

  return null;
};

export default RouteGuard;