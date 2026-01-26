import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        // 1. Seed Satker
        const satkers = [
            { kode: 'A01', nama: 'Biro Keuangan', wilayah: 'Pusat' },
            { kode: 'A02', nama: 'Biro Umum', wilayah: 'Pusat' },
            { kode: 'B01', nama: 'Dinas Tenaga Kerja DKI Jakarta', wilayah: 'DKI Jakarta' },
            { kode: 'C01', nama: 'Balai Latihan Kerja Bandung', wilayah: 'Jawa Barat' },
            { kode: 'D01', nama: 'BBPVP Semarang', wilayah: 'Jawa Tengah' },
        ];

        for (const satker of satkers) {
            await prisma.satker.upsert({
                where: { kode: satker.kode },
                update: {},
                create: satker,
            });
        }

        // 2. Seed Admin User
        const adminPassword = await bcrypt.hash('admin123', 10);
        await prisma.user.upsert({
            where: { nip: 'admin' },
            update: {},
            create: {
                nip: 'admin',
                password: adminPassword,
                name: 'Super Administrator',
                role: 'INTERNAL',
                isActive: true,
            },
        });

        // 3. Seed Users
        const users = [
            { nip: 'satker01', name: 'Operator DKI', role: 'SATKER', satkerCode: 'B01' },
            { nip: 'staff01', name: 'Staff Keuangan', role: 'INTERNAL', satkerCode: null },
            { nip: 'satker02', name: 'Operator Bandung', role: 'SATKER', satkerCode: 'C01' },
        ];

        const defaultPass = await bcrypt.hash('123456', 10);

        for (const u of users) {
            // @ts-ignore
            await prisma.user.upsert({
                where: { nip: u.nip },
                update: {},
                create: {
                    nip: u.nip,
                    password: defaultPass,
                    name: u.name,
                    // @ts-ignore
                    role: u.role,
                    satkerId: u.satkerCode,
                    isActive: true
                }
            });
        }

        return NextResponse.json({ success: true, message: 'Database seeded successfully via API!' });

    } catch (error: any) {
        console.error('Seeding error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
