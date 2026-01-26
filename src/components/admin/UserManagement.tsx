'use client';

import { useState, useEffect, useRef } from 'react';
import {
    Users, Plus, Search, Edit2, Shield, UserCheck,
    RefreshCw, X, Save, MoreVertical, Trash2, KeyRound,
    User, Building2, CreditCard
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createUser, updateUser, toggleUserStatus, resetPassword, deleteUser } from '@/app/actions/admin';
import { User as PrismaUser, Role } from '@prisma/client';

interface UserManagementProps {
    initialUsers: PrismaUser[];
}

export default function UserManagement({ initialUsers }: UserManagementProps) {
    const router = useRouter();
    const [users, setUsers] = useState<PrismaUser[]>(initialUsers);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<PrismaUser | null>(null);
    const [isLoadingAction, setIsLoadingAction] = useState(false);

    // Dropdown State
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        nip: '',
        name: '',
        role: 'SATKER' as Role,
        satkerCode: '',
    });

    // Close menu on scroll or click outside logic is handled by backdrop
    const toggleMenu = (id: string) => {
        if (openMenuId === id) {
            setOpenMenuId(null);
        } else {
            setOpenMenuId(id);
        }
    };

    // Display Logic
    const filteredUsers = initialUsers.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.nip.includes(searchQuery)
    );

    const handleAddNew = () => {
        setEditingUser(null);
        setFormData({ nip: '', name: '', role: 'SATKER', satkerCode: '' });
        setIsFormOpen(true);
    };

    const handleEdit = (user: PrismaUser) => {
        setOpenMenuId(null);
        setEditingUser(user);
        setFormData({
            nip: user.nip,
            name: user.name,
            role: user.role,
            satkerCode: user.satkerId || '',
        });
        setIsFormOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoadingAction(true);

        const data = new FormData();
        data.append('nip', formData.nip);
        data.append('name', formData.name);
        data.append('role', formData.role);
        if (formData.satkerCode) data.append('satkerCode', formData.satkerCode);

        try {
            let result;
            if (editingUser) {
                result = await updateUser(editingUser.id, data);
            } else {
                result = await createUser(data);
            }

            if (result.success) {
                setIsFormOpen(false);
                router.refresh();
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error(error);
            alert('Terjadi kesalahan');
        } finally {
            setIsLoadingAction(false);
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        if (confirm('Ubah status user?')) {
            await toggleUserStatus(id, currentStatus);
        }
    };

    const handleResetPassword = async (id: string) => {
        if (!confirm('Apakah Anda yakin ingin mereset password user ini menjadi "bmn2026"?')) return;

        setOpenMenuId(null);
        setIsLoadingAction(true);
        const result = await resetPassword(id);
        setIsLoadingAction(false);
        alert(result.message);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('PERINGATAN: Apakah Anda yakin ingin MENGHAPUS user ini? Tindakan ini tidak dapat dibatalkan.')) return;

        setOpenMenuId(null);
        setIsLoadingAction(true);
        const result = await deleteUser(id);
        setIsLoadingAction(false);
        if (result.success) {
            router.refresh();
        } else {
            alert(result.message);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            {/* Backdrop for closing dropdown */}
            {openMenuId && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpenMenuId(null)}
                />
            )}

            {/* Header & Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <div className="relative w-full sm:w-80">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
                        placeholder="Cari user..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleAddNew}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah User
                </button>
            </div>

            {/* Standard Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                User Info
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Satker
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user, index) => {
                                // Simple logic for dropdown direction (last 3 items go up)
                                const isLastRows = index >= filteredUsers.length - 3 && filteredUsers.length > 3;

                                return (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white ${user.role === 'INTERNAL' ? 'bg-blue-600' : 'bg-green-600'}`}>
                                                        {user.name.charAt(0)}
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                    <div className="text-sm text-gray-500">{user.nip}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'INTERNAL' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                            {user.satkerId || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <button
                                                onClick={() => handleToggleStatus(user.id, user.isActive)}
                                                type="button"
                                                className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${user.isActive ? 'bg-green-600' : 'bg-gray-200'}`}
                                            >
                                                <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${user.isActive ? 'translate-x-5' : 'translate-x-0'}`} />
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium relative">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleMenu(user.id);
                                                }}
                                                className="text-gray-400 hover:text-gray-600"
                                            >
                                                <MoreVertical className="w-5 h-5" />
                                            </button>

                                            {openMenuId === user.id && (
                                                <div className={`absolute right-10 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 ${isLastRows ? 'bottom-0 mb-2' : 'top-8'}`}>
                                                    <div className="py-1" role="menu" aria-orientation="vertical">
                                                        <button
                                                            onClick={() => handleEdit(user)}
                                                            className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-left items-center gap-2"
                                                        >
                                                            <Edit2 className="w-4 h-4" /> Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleResetPassword(user.id)}
                                                            className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-left items-center gap-2"
                                                        >
                                                            <RefreshCw className="w-4 h-4" /> Reset Password
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(user.id)}
                                                            className="flex w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 hover:text-red-900 text-left items-center gap-2"
                                                        >
                                                            <Trash2 className="w-4 h-4" /> Hapus
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                    Tidak ada data user.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Premium Modal with Robust Flexbox Centering (Login Theme) */}
            {isFormOpen && (
                <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-black/50 transition-opacity z-[100]"
                            aria-hidden="true"
                            onClick={() => setIsFormOpen(false)}
                            style={{ animation: 'fadeIn 200ms ease-out' }}
                        ></div>

                        {/* Centering trick */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        {/* Login Theme Modal Panel */}
                        <div
                            className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full z-[110] relative"
                            style={{ animation: 'scaleIn 200ms ease-out' }}
                        >
                            {/* Header Gradient */}
                            <div className="h-2 bg-gradient-to-r from-[#153e70] to-blue-500"></div>

                            {/* Close Button */}
                            <button
                                onClick={() => setIsFormOpen(false)}
                                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="p-8 pt-6">
                                {/* Title */}
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-[#153e70] flex items-center gap-2">
                                        {editingUser ? <Edit2 className="w-6 h-6" /> : <UserCheck className="w-6 h-6" />}
                                        {editingUser ? 'Edit Akun' : 'Tambah Akun'}
                                    </h2>
                                    <p className="text-sm text-slate-500 mt-1">Lengkapi data di bawah ini untuk {editingUser ? 'mengubah' : 'membuat'} akun.</p>
                                </div>

                                {/* Form Content */}
                                <form onSubmit={handleSave} className="space-y-5">
                                    {/* NIP Input */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-[#153e70] uppercase tracking-wider ml-1">
                                            NIP / Username
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <CreditCard className="h-5 w-5 text-slate-400" />
                                            </div>
                                            <input
                                                type="text"
                                                required
                                                name="nip"
                                                disabled={!!editingUser}
                                                value={formData.nip}
                                                onChange={e => setFormData({ ...formData, nip: e.target.value })}
                                                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none placeholder:text-slate-300 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed"
                                                placeholder="Contoh: 199001..."
                                            />
                                        </div>
                                    </div>

                                    {/* Name Input */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-[#153e70] uppercase tracking-wider ml-1">
                                            Nama Lengkap
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-slate-400" />
                                            </div>
                                            <input
                                                type="text"
                                                required
                                                name="name"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none placeholder:text-slate-400"
                                                placeholder="Nama Pegawai / User"
                                            />
                                        </div>
                                    </div>

                                    {/* Role Select */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-[#153e70] uppercase tracking-wider ml-1">
                                            Role Aplikasi
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Shield className="h-5 w-5 text-slate-400" />
                                            </div>
                                            <select
                                                name="role"
                                                value={formData.role}
                                                onChange={e => setFormData({ ...formData, role: e.target.value as Role })}
                                                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none bg-white appearance-none"
                                            >
                                                <option value="SATKER">Satker</option>
                                                <option value="INTERNAL">Internal (Admin)</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Satker Code Input (Conditional) */}
                                    {formData.role === 'SATKER' && (
                                        <div className="space-y-1 animate-[fadeIn_0.2s_ease-out]">
                                            <label className="text-xs font-bold text-[#153e70] uppercase tracking-wider ml-1">
                                                Kode Satker
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Building2 className="h-5 w-5 text-slate-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="satkerCode"
                                                    value={formData.satkerCode}
                                                    onChange={e => setFormData({ ...formData, satkerCode: e.target.value })}
                                                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none font-mono placeholder:text-slate-300"
                                                    placeholder="Contoh: A01"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="pt-2 flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setIsFormOpen(false)}
                                            className="flex-1 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-xl transition-colors text-sm"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoadingAction}
                                            className="flex-1 flex items-center justify-center gap-2 bg-[#153e70] hover:bg-blue-800 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all text-sm"
                                        >
                                            <Save className="w-4 h-4" />
                                            {isLoadingAction ? 'Menyimpan...' : 'Simpan'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
