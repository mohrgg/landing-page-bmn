import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
    // TUGAS 1: Backend Logout Logic
    const cookieStore = await cookies();

    // CRITICAL: Hapus cookie dengan domain .bmn.local dan path '/'
    // Ini adalah shared cookie untuk SSO
    cookieStore.delete({
        name: 'sso_token',
        path: '/',
        domain: '.bmn.local',
    });

    // Fallback: Hapus juga cookie di domain host saat ini (misal landing.bmn.local)
    // untuk memastikan bersih total
    cookieStore.delete({
        name: 'sso_token',
        path: '/',
    });

    // Set expired manual sebagai double protection
    cookieStore.set('sso_token', '', {
        domain: '.bmn.local',
        path: '/',
        maxAge: 0,
        expires: new Date(0)
    });

    // Lakukan redirect
    // Note: Route '/login' tidak ada di project (menggunakan Modal), 
    // jadi kita redirect ke homepage ('/')
    const redirectUrl = new URL('/', 'http://landing.bmn.local:3000');

    const response = NextResponse.redirect(redirectUrl);

    // Header anti-cache agar browser tidak menyimpan state login
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
}
