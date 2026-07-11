import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import PageActions from '@/Components/PageActions';
import DataTable from '@/Components/DataTable';
import AddUserModal from './Partials/AddUserModal';
import EditUserModal from './Partials/EditUserModal';
import PageHeader from '@/Components/PageHeader';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function Index({ users, regions, units, jabatans, filters }) {
    const { flash = {} } = usePage().props;
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [perPage, setPerPage] = useState(filters?.per_page || 10);
    
    const openEditModal = (user) => {
        setEditingUser(user);
        setIsEditModalOpen(true);
    };

    const handleDelete = (user) => {
        Swal.fire({
            title: 'Hapus Pengguna?',
            text: `Apakah Anda yakin ingin menghapus akses untuk ${user.name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal',
            reverseButtons: true,
            background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
            color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#000000',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('master.users.destroy', user.id), {
                    preserveScroll: true
                });
            }
        });
    };
    
    const { sort_field = 'created_at', sort_direction = 'desc' } = filters || {};

    const handleSort = (field) => {
        let direction = 'asc';
        if (sort_field === field && sort_direction === 'asc') {
            direction = 'desc';
        }
        
        router.get(route('master.users.index'), {
            search: searchQuery,
            sort_field: field,
            sort_direction: direction,
            per_page: perPage
        }, { preserveState: true, preserveScroll: true, replace: true });
    };

    const renderSortIcon = (field) => {
        if (sort_field !== field) {
            return <svg className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>;
        }
        if (sort_direction === 'asc') {
            return <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg>;
        }
        return <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>;
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery !== (filters?.search || '') || perPage !== (filters?.per_page || 10)) {
                router.get(route('master.users.index'), { 
                    search: searchQuery,
                    sort_field,
                    sort_direction,
                    per_page: perPage
                }, {
                    preserveState: true,
                    replace: true,
                    preserveScroll: true
                });
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery, perPage]);

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
        <AuthenticatedLayout 
            header={
                <PageHeader 
                    title="Manajemen Pengguna" 
                    breadcrumbs={[
                        { label: 'Data Master', url: null },
                        { label: 'Pengguna', url: null }
                    ]}
                />
            }
        >
            <Head title="Manajemen Pengguna" />

            <PageActions 
                searchPlaceholder="Cari pengguna berdasarkan nama, NIK, atau Email..."
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                actionLabel="Tambah Pengguna"
                onAction={() => setIsAddModalOpen(true)}
            >
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <span>Menampilkan</span>
                    <div className="flex items-center bg-white dark:bg-slate-800/60 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700/60 shadow-sm backdrop-blur-md">
                        <select 
                            value={perPage} 
                            onChange={(e) => setPerPage(e.target.value)}
                            className="py-1 pl-2 pr-7 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-transparent border-none rounded-md focus:ring-0 cursor-pointer transition-colors"
                        >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <span>data per halaman</span>
                </div>
            </PageActions>

            <AddUserModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
                regions={regions}
                units={units}
                jabatans={jabatans}
            />

            <EditUserModal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
                user={editingUser}
                regions={regions}
                units={units}
                jabatans={jabatans}
            />

            <DataTable 
                pagination={
                    <Pagination 
                        links={users.links} 
                        from={users.from} 
                        to={users.to} 
                        total={users.total}
                        perPage={perPage}
                        setPerPage={setPerPage}
                    />
                }
            >
                <DataTable.Thead>
                    <DataTable.Th sortable onClick={() => handleSort('name')}>
                        <div className="flex items-center gap-2">
                            Nama Lengkap
                            {renderSortIcon('name')}
                        </div>
                    </DataTable.Th>
                    <DataTable.Th sortable onClick={() => handleSort('nik')}>
                        <div className="flex items-center gap-2">
                            NIK
                            {renderSortIcon('nik')}
                        </div>
                    </DataTable.Th>
                    <DataTable.Th sortable onClick={() => handleSort('email')}>
                        <div className="flex items-center gap-2">
                            Email
                            {renderSortIcon('email')}
                        </div>
                    </DataTable.Th>
                    <DataTable.Th sortable onClick={() => handleSort('nowa')}>
                        <div className="flex items-center gap-2">
                            No. WA
                            {renderSortIcon('nowa')}
                        </div>
                    </DataTable.Th>
                    <DataTable.Th sortable onClick={() => handleSort('region')}>
                        <div className="flex items-center gap-2">
                            Region
                            {renderSortIcon('region')}
                        </div>
                    </DataTable.Th>
                    <DataTable.Th sortable onClick={() => handleSort('unit')}>
                        <div className="flex items-center gap-2">
                            Unit
                            {renderSortIcon('unit')}
                        </div>
                    </DataTable.Th>
                    <DataTable.Th sortable onClick={() => handleSort('jabatan')}>
                        <div className="flex items-center gap-2">
                            Jabatan
                            {renderSortIcon('jabatan')}
                        </div>
                    </DataTable.Th>
                    <DataTable.Th sortable onClick={() => handleSort('roles')}>
                        <div className="flex items-center gap-2">
                            Akses
                            {renderSortIcon('roles')}
                        </div>
                    </DataTable.Th>
                    <DataTable.Th>Aksi</DataTable.Th>
                </DataTable.Thead>
                <DataTable.Tbody>
                    {users.data && users.data.length > 0 ? (
                        users.data.map((user) => (
                            <DataTable.Tr key={user.id}>
                                <DataTable.Td>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-50 dark:from-blue-900/50 dark:to-indigo-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800 shrink-0">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {user.name}
                                        </div>
                                    </div>
                                </DataTable.Td>
                                <DataTable.Td>
                                    <div className="text-sm text-slate-500 dark:text-slate-400 font-mono">{user.nik}</div>
                                </DataTable.Td>
                                <DataTable.Td>
                                    <div className="text-sm text-slate-700 dark:text-slate-300">{user.email}</div>
                                </DataTable.Td>
                                <DataTable.Td>
                                    <div className="text-sm text-slate-500 dark:text-slate-400 font-mono">{user.nowa || '-'}</div>
                                </DataTable.Td>
                                <DataTable.Td>
                                    <div className="flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300">
                                        <svg className="w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                        {user.region || 'Pusat'}
                                    </div>
                                </DataTable.Td>
                                <DataTable.Td>
                                    <div className="text-sm text-slate-500 dark:text-slate-400">{user.unit || '-'}</div>
                                </DataTable.Td>
                                <DataTable.Td>
                                    <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{user.jabatan || '-'}</div>
                                </DataTable.Td>
                                <DataTable.Td>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800 truncate max-w-[150px]" title={user.roles}>
                                        {user.roles || 'USER'}
                                    </span>
                                </DataTable.Td>
                                <DataTable.Td className="text-left">
                                    <div className="flex items-center justify-start gap-2 transition-opacity duration-200">
                                        <Link href={route('master.users.generate', user.id)} className="p-2 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors" title="Generate Kredensial">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
                                        </Link>
                                        <button onClick={() => openEditModal(user)} className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="Ubah Pengguna">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                        </button>
                                        <button onClick={() => handleDelete(user)} className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors" title="Hapus Pengguna">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        </button>
                                    </div>
                                </DataTable.Td>
                            </DataTable.Tr>
                        ))
                    ) : (
                        <DataTable.Empty colSpan={9} message="Belum ada data pengguna yang terdaftar." />
                    )}
                </DataTable.Tbody>
            </DataTable>
        </AuthenticatedLayout>
    );
}
