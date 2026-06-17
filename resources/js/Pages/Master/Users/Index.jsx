import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import PageActions from '@/Components/PageActions';
import DataTable from '@/Components/DataTable';
import AddUserModal from './Partials/AddUserModal';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function Index({ users, regions, units, jabatans, filters }) {
    const { flash = {} } = usePage().props;
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery !== (filters?.search || '')) {
                router.get(route('master.users.index'), { search: searchQuery }, {
                    preserveState: true,
                    replace: true,
                    preserveScroll: true
                });
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        if (flash.success) {
            Swal.fire({
                title: 'Berhasil!',
                text: flash.success,
                icon: 'success',
                timer: 3000,
                showConfirmButton: false,
                toast: true,
                position: 'top-end',
                background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
                color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#000000',
            });
        }
        if (flash.error) {
            Swal.fire({
                title: 'Gagal!',
                text: flash.error,
                icon: 'error',
                timer: 3000,
                showConfirmButton: false,
                toast: true,
                position: 'top-end',
                background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
                color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#000000',
            });
        }
    }, [flash]);

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-slate-800 leading-tight">Manajemen Pengguna</h2>}>
            <Head title="Manajemen Pengguna" />

            <PageActions 
                searchPlaceholder="Cari pengguna berdasarkan nama, NIK, atau Email..."
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                actionLabel="Tambah User"
                onAction={() => setIsAddModalOpen(true)}
            />

            <AddUserModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
                regions={regions}
                units={units}
                jabatans={jabatans}
            />

            {/* Table Card */}
            <DataTable 
                pagination={<Pagination links={users.links} from={users.from} to={users.to} total={users.total} />}
            >
                <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 transition-colors">
                    <tr>
                        <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Name / NIK</th>
                        <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Contact</th>
                        <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Region & Unit</th>
                        <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Roles</th>
                        <th scope="col" className="px-6 py-4 font-semibold tracking-wider text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 transition-colors">
                    {users.data && users.data.length > 0 ? (
                        users.data.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors duration-200 group">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-50 dark:from-blue-900/50 dark:to-indigo-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800 shrink-0">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{user.name}</div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">{user.nik}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-slate-700 dark:text-slate-300">{user.email}</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{user.nowa || '-'}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                                        <svg className="w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                        {user.region || 'Pusat'}
                                    </div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400 ml-5 mt-0.5">{user.unit || '-'}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800 truncate max-w-[150px]" title={user.roles}>
                                        {user.roles || 'USER'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="Edit User">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                        </button>
                                        <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors" title="Hapus User">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                <svg className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Belum ada data pengguna yang terdaftar.
                            </td>
                        </tr>
                    )}
                </tbody>
            </DataTable>
        </AuthenticatedLayout>
    );
}
