import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import PageHeader from '@/Components/PageHeader';
import DataTable from '@/Components/DataTable';
import PageActions from '@/Components/PageActions';
import Pagination from '@/Components/Pagination';
import ViewSopModal from './Partials/ViewSopModal';
import AddSopModal from './Partials/AddSopModal';

export default function SopIndex({ auth, sops, filters }) {
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [perPage, setPerPage] = useState(filters?.per_page || 10);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [viewingSop, setViewingSop] = useState(null);

    const openViewModal = (sop) => {
        setViewingSop(sop);
        setIsViewModalOpen(true);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery !== (filters?.search || '') || perPage !== (filters?.per_page || 10)) {
                router.get(route('qa.sop.index'), { 
                    search: searchQuery,
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
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <PageHeader 
                    title="Daftar SOP" 
                    breadcrumbs={[
                        { label: 'Portal QA', href: route('qa.portal') },
                        { label: 'SOP', href: null },
                    ]} 
                />
            }
        >
            <Head title="SOP QA" />

            <PageActions 
                searchPlaceholder="Cari SOP berdasarkan nama atau nomor..."
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                actionLabel="Tambah SOP"
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

            <DataTable 
                pagination={
                    <Pagination 
                        links={sops.links} 
                        from={sops.from} 
                        to={sops.to} 
                        total={sops.total}
                        perPage={perPage}
                        setPerPage={setPerPage}
                    />
                }
            >
                <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700/60 transition-colors">
                    <tr>
                        <th scope="col" className="px-6 py-4 font-semibold tracking-wider text-left align-middle">No SOP</th>
                        <th scope="col" className="px-6 py-4 font-semibold tracking-wider text-left align-middle">Judul SOP</th>
                        <th scope="col" className="px-6 py-4 font-semibold tracking-wider text-left align-middle">Tanggal Update</th>
                        <th scope="col" className="px-6 py-4 font-semibold tracking-wider text-center align-middle">Lampiran Pendukung</th>
                        <th scope="col" className="px-6 py-4 font-semibold tracking-wider text-center align-middle">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 transition-colors">
                    {sops.data && sops.data.length > 0 ? (
                        sops.data.map((sop) => (
                        <tr key={sop.id} className="hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors duration-200 group">
                            <td className="px-6 py-4 whitespace-nowrap font-mono text-slate-600 dark:text-slate-300">
                                {sop.no_sop}
                            </td>
                            <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                                <button 
                                    onClick={() => openViewModal(sop)}
                                    className="hover:text-blue-600 dark:hover:text-blue-400 text-left transition-colors focus:outline-none"
                                >
                                    {sop.nama}
                                </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-slate-500 dark:text-slate-400">
                                {sop.tanggal}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                {sop.attachments && sop.attachments.length > 0 ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
                                        {sop.attachments.length} berkas
                                    </span>
                                ) : (
                                    <span className="text-slate-400">-</span>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <button 
                                        onClick={() => openViewModal(sop)}
                                        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors" 
                                        title="Lihat Dokumen"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
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
                                Data SOP belum tersedia
                            </td>
                        </tr>
                    )}
                </tbody>
            </DataTable>

            <ViewSopModal 
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                sop={viewingSop}
            />

            <AddSopModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />
        </AuthenticatedLayout>
    );
}
