import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleCallback = async () => {
            // Get the code from URL parameters
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            console.log(window.location)
            console.log(code);
            console.log(urlParams);
            
            if (!code) {
                console.error('No code found in URL');
                navigate('/');
                return;
            }

            try {
                // Exchange code for tokens with your backend
                const response = await fetch(`http://localhost:8888/callback?code=${code}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.detail || 'Failed to get tokens');
                }

                // Store tokens (consider using a more secure storage method or state management)
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);

                // Redirect to home or dashboard
                navigate('/dashboard');
            } catch (error) {
                console.error('Error during callback:', error);
                navigate('/', { state: { error: 'Authentication failed' } });
            }
        };

        handleCallback();
    }, [navigate]);

    // Show loading state while processing
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Logging you in...</p>
        </div>
    );
};

export default Callback;