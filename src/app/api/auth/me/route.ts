import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export async function GET() {
    try {
        console.log('🔍 [AUTH_ME] ===== CHECKING SESSION =====');

        const cookieStore = await cookies();
        console.log('🔍 [AUTH_ME] CookieStore type:', typeof cookieStore);
        console.log('🔍 [AUTH_ME] CookieStore keys:', Object.keys(cookieStore));

        // Cek semua cookie yang ada
        const allCookies = cookieStore.getAll();
        console.log('🔍 [AUTH_ME] All cookies:', allCookies.map(c => c.name));

        const token = cookieStore.get('sso_token');
        console.log('🔍 [AUTH_ME] Token object:', token ? 'FOUND' : 'NOT FOUND');
        console.log('🔍 [AUTH_ME] Token value:', token?.value ? token.value.substring(0, 50) + '...' : 'N/A');
        console.log('🔍 [AUTH_ME] Token length:', token?.value?.length || 0);

        if (!token || !token.value) {
            console.log('🔴 [AUTH_ME] ❌ No token found, returning user: null');
            // Return 200 dengan user: null agar tidak dianggap error oleh browser console
            const response = NextResponse.json({ user: null }, { status: 200 });
            response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
            response.headers.set('Pragma', 'no-cache');
            response.headers.set('Expires', '0');
            response.headers.set('x-cache-bust', Date.now().toString());
            return response;
        }

        console.log('🔍 [AUTH_ME] Verifying token...');

        const payload = await verifyToken(token.value);

        if (!payload) {
            console.log('🔴 [AUTH_ME] ❌ Token verification failed');
            const response = NextResponse.json({ user: null }, { status: 200 });
            response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
            response.headers.set('Pragma', 'no-cache');
            response.headers.set('Expires', '0');
            response.headers.set('x-cache-bust', Date.now().toString());
            return response;
        }

        console.log('✅ [AUTH_ME] ✅ Token verified successfully!');
        console.log('✅ [AUTH_ME] Username:', payload.username);
        console.log('✅ [AUTH_ME] Name:', payload.name);
        console.log('✅ [AUTH_ME] Role:', payload.role);

        const responseData = {
            user: {
                username: payload.username,
                name: payload.name,
                role: payload.role,
                satkerId: payload.satkerId
            }
        };

        const response = NextResponse.json(responseData);
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
        response.headers.set('x-cache-bust', Date.now().toString());

        console.log('✅ [AUTH_ME] Returning user data successfully');

        return response;
    } catch (error) {
        console.error('🔴 [AUTH_ME] ❌ Session check error:', error);
        const response = NextResponse.json({ user: null }, { status: 500 });
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
        response.headers.set('x-cache-bust', Date.now().toString());
        return response;
    }
}
