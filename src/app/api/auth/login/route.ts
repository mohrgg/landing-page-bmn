import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { signToken, authenticateUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password } = body;

        // Validasi input
        if (!username || !password) {
            return NextResponse.json(
                { success: false, message: 'Username dan password wajib diisi' },
                { status: 400 }
            );
        }

        // Authenticate user dengan mock data
        const user = authenticateUser(username, password);

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Username atau password salah' },
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = await signToken({
            username: user.username,
            role: user.role,
            name: user.name,
        });

        // Set cookie dengan konfigurasi SSO
        const cookieStore = await cookies();
        cookieStore.set('sso_token', token, {
            domain: '.bmn.local', // PENTING: Titik di depan agar terbaca di subdomain
            path: '/',
            httpOnly: true,
            secure: false, // false untuk development
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 24 jam
        });

        return NextResponse.json({
            success: true,
            message: 'Login berhasil',
            user: {
                username: user.username,
                role: user.role,
                name: user.name,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan pada server' },
            { status: 500 }
        );
    }
}
