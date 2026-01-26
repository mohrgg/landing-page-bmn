'use client';

import { useState, useEffect } from 'react';

export interface UserData {
    username: string;
    role: string;
    name: string;
}

export function useAuth() {
    const [user, setUser] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkSession = async () => {
        try {
            // Fetch session from server (secure HttpOnly cookie check)
            const res = await fetch('/api/auth/me', {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (e) {
            console.error("Failed to check session:", e);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkSession();

        // Optional: Listen for storage events or custom events if we want multi-tab sync
        // But for single tab navigation, mount check is usually enough.
        // We can create a custom event listener for 'login-success' or 'logout'

        const handleAuthUpdate = () => {
            checkSession();
        };

        window.addEventListener('auth-update', handleAuthUpdate);
        return () => window.removeEventListener('auth-update', handleAuthUpdate);
    }, []);

    const refreshAuth = () => {
        // Small delay to ensure cookie is set
        setTimeout(() => {
            checkSession();
            // Trigger event for other components
            window.dispatchEvent(new Event('auth-update'));
        }, 100);
    };

    const logout = () => {
        // Hard navigate to logout API to specifically clear HttpOnly cookies on server
        window.location.href = '/api/auth/logout';
    };

    return { user, isLoading, refreshAuth, logout };
}
