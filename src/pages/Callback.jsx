import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleCallback = () => {
            // Only process if there's actually a hash
            if (!window.location.hash) {
                return;
            }

            // Get the access_token from URL hash parameters
            const hashParams = new URLSearchParams(window.location.hash.substring(1));
            const accessToken = hashParams.get('access_token');
            
            if (!accessToken) {
                console.error('No access token found in URL');
                navigate('/');
                return;
            }

            // Store access token
            localStorage.setItem('access_token', accessToken);

            // Clear the hash from the URL
            window.history.pushState("", document.title, window.location.pathname);

            // Redirect to dashboard
            navigate('/');
        };

        handleCallback();

        // Cleanup function
        return () => {
            // Any cleanup if needed
        };
    }, [navigate]);

    // Show loading state while processing
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Logging you in...</p>
        </div>
    );
};

export default Callback;