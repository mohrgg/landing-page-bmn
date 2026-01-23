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

    const checkSession = () => {
        try {
            const cookies = document.cookie.split(';');
            const ssoCookie = cookies.find(c => c.trim().startsWith('sso_token='));

            if (ssoCookie) {
                const token = ssoCookie.split('=')[1];
                // Simple base64 decode for client-side display 
                // Security verification still happens on server/middleware side
                const payloadPart = token.split('.')[1];
                if (payloadPart) {
                    const payload = JSON.parse(atob(payloadPart));
                    if (payload && payload.username) {
                        setUser({
                            username: payload.username,
                            role: payload.role,
                            name: payload.name
                        });
                    }
                }
            } else {
                setUser(null);
            }
        } catch (e) {
            console.error("Failed to restore session:", e);
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
        // Clear for .bmn.local
        document.cookie = 'sso_token=; path=/; domain=.bmn.local; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        // Clear for current domain (localhost)
        document.cookie = 'sso_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

        setUser(null);
        refreshAuth();
    };

    return { user, isLoading, refreshAuth, logout };
}
