import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const [authenticated, setAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await fetch(
                    "/api/auth/me",
                    {
                        method: "GET",
                        credentials: "include"
                    }
                );

                if (response.ok) {
                    setAuthenticated(true);
                } else {
                    setAuthenticated(false);
                }
            } catch (error) {
                console.error("Authentication check failed:", error);
                setAuthenticated(false);
            }
        };

        checkAuthentication();
    }, []);

    // Still checking
    if (authenticated === null) {
        return <div>Loading...</div>;
    }

    // Not authenticated
    if (!authenticated) {
        return <Navigate to="/loginandsignup" replace />;
    }

    // Authenticated
    return children;
}

export default ProtectedRoute;