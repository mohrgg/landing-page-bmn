'use client';

import { ActivityLog } from '@prisma/client';
import { History, Clock, User } from 'lucide-react';

interface ActivityLogViewerProps {
    logs: ActivityLog[];
}

export default function ActivityLogViewer({ logs }: ActivityLogViewerProps) {
    // Format date: "28 Jan 2026, 10:30"
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-[#153e70] flex items-center gap-2">
                    <History className="w-5 h-5" />
                    Riwayat Aktivitas
                </h3>
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                    {logs.length} Total
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-medium">
                        <tr>
                            <th className="px-4 py-3">Waktu</th>
                            <th className="px-4 py-3">User Admin</th>
                            <th className="px-4 py-3">Aksi</th>
                            <th className="px-4 py-3">Detail</th>
                            <th className="px-4 py-3">Target</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {logs.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                                    Belum ada aktivitas tercatat
                                </td>
                            </tr>
                        ) : (
                            logs.map((log) => (
                                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                                            {formatDate(log.createdAt)}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 font-medium text-[#153e70]">
                                        {log.actorName}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${log.action.includes('CREATE') ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                log.action.includes('DELETE') ? 'bg-red-50 text-red-700 border-red-100' :
                                                    log.action.includes('UPDATE') ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                        log.action.includes('RESET') ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                                            'bg-slate-100 text-slate-600 border-slate-200'
                                            }`}>
                                            {log.action.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-slate-600 max-w-[300px] truncate" title={log.details}>
                                        {log.details}
                                    </td>
                                    <td className="px-4 py-3 text-slate-500">
                                        {log.target || '-'}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
