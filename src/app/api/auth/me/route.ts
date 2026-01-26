import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('sso_token')?.value;

        if (!token) {
            // Return 200 dengan user: null agar tidak dianggap error oleh browser console
            return NextResponse.json({ user: null }, { status: 200 });
        }

        const payload = await verifyToken(token);

        if (!payload) {
            return NextResponse.json({ user: null }, { status: 200 });
        }

        return NextResponse.json({
            user: {
                username: payload.username,
                name: payload.name,
                role: payload.role,
                satkerId: payload.satkerId
            }
        });
    } catch (error) {
        console.error('Session check error:', error);
        return NextResponse.json({ user: null }, { status: 500 });
    }
}
