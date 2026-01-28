
import { Shield } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import UserManagement from '@/components/admin/UserManagement';

export const dynamic = 'force-dynamic'; // Selalu fetch data terbaru

export default async function AdminPage() {
    // TUGAS 3: Fetch Data Real
    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
    });

    const logs = await prisma.activityLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 100 // Limit to last 100 logs
    });

    return (
        <main className="min-h-screen pt-8 pb-10">
            <div className="px-8">

                {/* Header Page */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-[#153e70] flex items-center gap-2">
                            <Shield className="w-8 h-8" />
                            Manajemen Akun
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">
                            Kelola data pengguna, hak akses, dan status akun Satker/Internal.
                        </p>
                    </div>
                </div>

                {/* Client Component for Interactive Table */}
                <UserManagement initialUsers={users} logs={logs} />

            </div>
        </main>
    );
}
