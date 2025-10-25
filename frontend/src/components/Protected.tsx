import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Protected({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/session`, {
                    credentials: "include"
                });

                if (response.ok) {
                    const data = await response.json();
                    
                    if (!data.authenticated || data.user.role !== 'admin') {
                        navigate('/');
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        isLoggedIn();
    }, [navigate]);

    return <>{children}</>;
}