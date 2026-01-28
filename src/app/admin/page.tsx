
import { Shield } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import UserManagement from '@/components/admin/UserManagement';

export const dynamic = 'force-dynamic'; // Selalu fetch data terbaru

export default async function AdminPage() {
    // TUGAS 3: Fetch Data Real
    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
    });



    return (
        <main className="p-4 min-h-screen">
            <UserManagement initialUsers={users} />
        </main>
    );
}
