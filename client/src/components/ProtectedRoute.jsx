import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const location = useLocation();

    if (!isAuthenticated) {
        alert('You must be logged in to access this page.');
        loginWithRedirect({
            appState: { returnTo: location.pathname }
        });
        return null;
    }
    return children;
};

export default ProtectedRoute;