'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

// Helper for Logging
async function logActivity(action: string, details: string, target?: string) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('sso_token')?.value;
        const payload = token ? await verifyToken(token) : null;

        await prisma.activityLog.create({
            data: {
                action,
                details,
                actorName: payload?.name || 'Unknown Admin',
                target
            }
        });
    } catch (e) {
        console.error("Failed to log activity:", e);
    }
}

export async function createUser(formData: FormData) {
    const nip = formData.get('nip') as string;
    const name = formData.get('name') as string;
    const role = formData.get('role') as Role;
    const satkerCode = formData.get('satkerCode') as string || null;

    if (!nip || !name || !role) {
        return { success: false, message: 'Data tidak lengkap' };
    }

    try {
        const hashedPassword = await bcrypt.hash('123456', 10);

        // Auto-create Satker if it doesn't exist
        if (role === 'SATKER' && satkerCode) {
            await prisma.satker.upsert({
                where: { kode: satkerCode },
                update: {},
                create: {
                    kode: satkerCode,
                    nama: `Satker ${satkerCode}`, // Default name
                }
            });
        }

        await prisma.user.create({
            data: {
                nip,
                name,
                role,
                satkerId: role === 'SATKER' ? satkerCode : null,
                password: hashedPassword,
                isActive: true
            }
        });

        await logActivity('CREATE_USER', `Created user ${name} (${role})`, nip);

        revalidatePath('/admin');
        return { success: true, message: 'User berhasil dibuat' };
    } catch (error: any) {
        console.error(error);
        if (error.code === 'P2002') {
            return { success: false, message: 'NIP sudah terdaftar' };
        }
        return { success: false, message: 'Gagal membuat user' };
    }
}

export async function updateUser(id: string, formData: FormData) {
    const name = formData.get('name') as string;
    const role = formData.get('role') as Role;
    const satkerCode = formData.get('satkerCode') as string || null;

    try {
        // Auto-create Satker if it doesn't exist
        if (role === 'SATKER' && satkerCode) {
            await prisma.satker.upsert({
                where: { kode: satkerCode },
                update: {},
                create: {
                    kode: satkerCode,
                    nama: `Satker ${satkerCode}`, // Default name
                }
            });
        }

        const user = await prisma.user.update({
            where: { id },
            data: {
                name,
                role,
                satkerId: role === 'SATKER' ? satkerCode : null
            }
        });

        await logActivity('UPDATE_USER', `Updated user ${user.name} to Role ${role}`, user.nip);

        revalidatePath('/admin');
        return { success: true, message: 'User berhasil diupdate' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Gagal update user' };
    }
}

export async function toggleUserStatus(id: string, currentStatus: boolean) {
    try {
        const user = await prisma.user.update({
            where: { id },
            data: { isActive: !currentStatus }
        });

        await logActivity('TOGGLE_STATUS', `Changed status to ${!currentStatus ? 'Active' : 'Inactive'}`, user.nip);

        revalidatePath('/admin');
        return { success: true, message: 'Status user diubah' };
    } catch (error) {
        return { success: false, message: 'Gagal mengubah status' };
    }
}

export async function resetPassword(id: string) {
    try {
        const hashedPassword = await bcrypt.hash('bmn2026', 10);
        const user = await prisma.user.update({
            where: { id },
            data: { password: hashedPassword }
        });

        await logActivity('RESET_PASSWORD', `Reset password to default`, user.nip);

        revalidatePath('/admin');
        return { success: true, message: 'Password direset ke bmn2026' };
    } catch (error) {
        return { success: false, message: 'Gagal reset password' };
    }
}

export async function deleteUser(id: string) {
    try {
        const user = await prisma.user.delete({
            where: { id }
        });

        await logActivity('DELETE_USER', `Deleted user ${user.name}`, user.nip);

        revalidatePath('/admin');
        return { success: true, message: 'User berhasil dihapus' };
    } catch (error) {
        return { success: false, message: 'Gagal menghapus user' };
    }
}
