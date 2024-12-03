// New file: src/hooks/useAuthCheck.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useAuthCheck = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:9013/crew/check-auth', {
                    withCredentials: true
                });
                
                // Log response for debugging
                console.log('Auth check response:', response.data);

                if (!response.data.authenticated) {
                    navigate('/login/login');  // Match the path in requireMemberAuth.js
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                navigate('/login/login');
            }
        };

        checkAuth();
    }, [navigate]);
};