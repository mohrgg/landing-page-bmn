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
        console.log('🔍 [AUTH] checkSession START');
        try {
            // Fetch session from server (secure HttpOnly cookie check)
            // Tambahkan timestamp untuk cache-busting
            const res = await fetch(`/api/auth/me?_t=${Date.now()}`, {
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
                    'Pragma': 'no-cache',
                },
                credentials: 'include' // Penting: include cookies
            });

            console.log('📡 [AUTH] /api/auth/me response:', res.status, res.statusText);

            if (res.ok) {
                const data = await res.json();
                console.log('📊 [AUTH] Response body:', JSON.stringify(data, null, 2));
                if (data.user) {
                    console.log('✅ [AUTH] User FOUND:', data.user.name);
                    console.log('✅ [AUTH] Calling setUser...');
                    setUser(data.user);
                    console.log('✅ [AUTH] User state should UPDATE now');
                } else {
                    console.log('❌ [AUTH] User NOT found in response');
                    console.log('✅ [AUTH] Calling setUser(null)...');
                    setUser(null);
                }
            } else {
                console.log('❌ [AUTH] /api/auth/me returned NOT OK');
                console.log('✅ [AUTH] Calling setUser(null)...');
                setUser(null);
            }
        } catch (e) {
            console.error('❌ [AUTH] ERROR in checkSession:', e);
            const error = e as Error;
            console.error('❌ [AUTH] Error details:', error?.message);
            setUser(null);
        } finally {
            console.log('✅ [AUTH] checkSession COMPLETED, isLoading=false');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log('🔄 [AUTH] useAuth MOUNTED - checking session on mount...');
        checkSession();

        // Optional: Listen for storage events or custom events if we want multi-tab sync
        // But for single tab navigation, mount check is usually enough.
        // We can create a custom event listener for 'login-success' or 'logout'

        const handleAuthUpdate = () => {
            console.log('🔔 [AUTH] auth-update event triggered');
            checkSession();
        };

        window.addEventListener('auth-update', handleAuthUpdate);
        return () => {
            console.log('🚫 [AUTH] useAuth UNMOUNTED - removing listener');
            window.removeEventListener('auth-update', handleAuthUpdate);
        };
    }, []);

    const refreshAuth = () => {
        console.log('🔄 [AUTH] refreshAuth START');
        // Small delay to ensure cookie is set
        setTimeout(() => {
            console.log('🔄 [AUTH] Calling checkSession now...');
            checkSession();
            // Trigger event for other components
            window.dispatchEvent(new Event('auth-update'));
            console.log('🔔 [AUTH] Dispatched auth-update event');
        }, 500);
    };

    const logout = () => {
        console.log('🚪 [AUTH] logout called');
        // Hard navigate to logout API to specifically clear HttpOnly cookies on server
        window.location.href = '/api/auth/logout';
    };

    return { user, isLoading, refreshAuth, logout };
}
