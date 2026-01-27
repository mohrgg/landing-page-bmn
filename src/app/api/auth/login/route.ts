import { NextRequest, NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password } = body;
        const cleanUsername = username?.trim();
        console.log(`[LOGIN_DEBUG] Attempt for: '${cleanUsername}'`);

        // TUGAS 4: Real Database Auth Check
        const user = await prisma.user.findUnique({
            where: { nip: cleanUsername }
        });

        console.log(`[LOGIN_DEBUG] User found in DB:`, user ? `YES (Role: ${user.role})` : 'NO');

        // Cek User & Password
        if (!user || !user.isActive) {
            console.log('[LOGIN_DEBUG] User not found or inactive');
            return NextResponse.json(
                { success: false, message: 'Akun tidak ditemukan atau tidak aktif' },
                { status: 401 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(`[LOGIN_DEBUG] Password valid: ${isPasswordValid}`);

        if (!isPasswordValid) {
            console.log('[LOGIN_DEBUG] Password mismatch');
            return NextResponse.json(
                { success: false, message: 'Password salah' },
                { status: 401 }
            );
        }

        // Generate Token
        const token = await signToken({
            username: user.nip,
            role: user.role, // Prisma enum matches INTERNAL | SATKER
            name: user.name,
            satkerId: user.satkerId || undefined
        });

        // Set Cookie Shared Domain
        const cookieStore = await cookies();

        // Setup cookie options
        // Jika environment development (localhost), domain undefined agar bisa set di localhost
        // Jika environment production/simulasi domain (.bmn.local), gunakan .bmn.local
        // Kita cek host header
        const host = request.headers.get('host') || '';
        const protocol = request.headers.get('x-forwarded-proto') || 'http';
        const isHttps = protocol === 'https';

        const isLocalDomain = host.includes('.bmn.local');
        const isLocalhost = host.includes('localhost');

        // Debug log
        console.log('[LOGIN_DEBUG] Host:', host);
        console.log('[LOGIN_DEBUG] Protocol:', protocol);
        console.log('[LOGIN_DEBUG] Is HTTPS:', isHttps);
        console.log('[LOGIN_DEBUG] Is Local Domain (.bmn.local):', isLocalDomain);
        console.log('[LOGIN_DEBUG] Is Localhost:', isLocalhost);

        // Domain logic:
        // - localhost: domain = undefined
        // - .bmn.local: domain = .bmn.local
        let domain: string | undefined = undefined;
        if (isLocalDomain) {
            domain = '.bmn.local';
        }

        console.log('[LOGIN_DEBUG] Cookie domain set to:', domain || 'undefined (local)');
        console.log('[LOGIN_DEBUG] Token length:', token.length);
        console.log('[LOGIN_DEBUG] Setting cookie...');

        const response = NextResponse.json({
            success: true,
            user: {
                username: user.nip,
                name: user.name,
                role: user.role
            }
        });

        // Explicitly clear any existing cookie first to avoid conflicts
        response.cookies.delete('sso_token');

        // Set cookie di response (lebih pasti)
        response.cookies.set('sso_token', token, {
            httpOnly: true,
            secure: isHttps,       // Only secure if actually HTTPS
            sameSite: 'lax',       // Allows redirect navigation
            path: '/',             // Root path
            maxAge: 24 * 60 * 60,  // 24 Hours
            domain: domain         // .bmn.local or undefined
        });

        console.log(`[LOGIN_DEBUG] Cookie set with: Secure=${isHttps}, Domain=${domain}, SameSite=lax`);

        console.log('[LOGIN_DEBUG] Cookie set successfully, returning response');

        return response;



    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}
