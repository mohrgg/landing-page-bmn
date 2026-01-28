import { prisma } from '@/lib/prisma';
import ActivityLogViewer from '@/components/admin/ActivityLogViewer';
import { ClipboardList } from 'lucide-react';

export default async function ActivityLogsPage() {
    const logs = await prisma.activityLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 100
    });

    return (
        <main className="min-h-screen pt-8 pb-10">
            <div className="px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-[#153e70]">
                            Log Aktivitas
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">
                            Riwayat audit aktivitas admin dalam sistem.
                        </p>
                    </div>
                </div>

                {/* Log Viewer */}
                <ActivityLogViewer logs={logs} />
            </div>
        </main>
    );
}
