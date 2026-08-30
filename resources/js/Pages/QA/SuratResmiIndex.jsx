import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import PageHeader from '@/Components/PageHeader';
import DataTable from '@/Components/DataTable';
import PageActions from '@/Components/PageActions';
import Pagination from '@/Components/Pagination';
import Tabs from '@/Components/Tabs';

export default function SuratResmiIndex({ auth, surat_edarans, filters }) {
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [perPage, setPerPage] = useState(filters?.per_page || 10);
    const [activeTab, setActiveTab] = useState(filters?.tab || 'semua');

    useEffect(() => {
        const timer = setTimeout(() => {
            if (
                searchQuery !== (filters?.search || '') || 
                perPage !== (filters?.per_page || 10) ||
                activeTab !== (filters?.tab || 'semua')
            ) {
                router.get(route('qa.surat-resmi.index'), { 
                    search: searchQuery,
                    per_page: perPage,
                    tab: activeTab
                }, {
                    preserveState: true,
                    replace: true,
                    preserveScroll: true
                });
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery, perPage, activeTab]);

    const formatPIC = (picData) => {
        if (!picData) return '-';
        try {
            // Because picData could be an array string from MySQL JSON
            let parsed = typeof picData === 'string' ? JSON.parse(picData) : picData;
            return Array.isArray(parsed) ? parsed.join(', ') : picData;
        } catch (e) {
            return picData;
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <PageHeader 
                    title="Daftar Surat Resmi (Edaran)" 
                    breadcrumbs={[
                        { label: 'Portal QA', href: route('qa.portal') },
                        { label: 'Surat Resmi', href: null },
                    ]} 
                />
            }
        >
            <Head title="Surat Resmi QA" />

            <PageActions 
                searchPlaceholder="Cari berdasarkan nama atau no surat..."
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
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

            <div className="mb-4">
                <Tabs 
                    tabs={[
                        { id: 'semua', label: 'Semua' },
                        { id: 'edaran', label: 'Edaran' },
                        { id: 'pemberitahuan', label: 'Pemberitahuan' },
                        { id: 'lainnya', label: 'Lainnya' },
                    ]}
                    activeTab={activeTab}
                    onChange={setActiveTab}
                />
            </div>

            <DataTable 
                pagination={
                    <Pagination 
                        links={surat_edarans.links} 
                        from={surat_edarans.from} 
                        to={surat_edarans.to} 
                        total={surat_edarans.total}
                        perPage={perPage}
                        setPerPage={setPerPage}
                    />
                }
            >
                <DataTable.Thead>
                    <DataTable.Th>No Surat</DataTable.Th>
                    <DataTable.Th>Judul</DataTable.Th>
                    <DataTable.Th>Tanggal Berlaku</DataTable.Th>
                    <DataTable.Th>PIC</DataTable.Th>
                    <DataTable.Th className="text-center">Status</DataTable.Th>
                    <DataTable.Th className="text-center">File</DataTable.Th>
                </DataTable.Thead>
                <DataTable.Tbody>
                    {surat_edarans.data && surat_edarans.data.length > 0 ? (
                        surat_edarans.data.map((surat) => (
                        <DataTable.Tr key={surat.id}>
                            <DataTable.Td className="font-mono text-slate-600 dark:text-slate-300">
                                {surat.no_surat}
                            </DataTable.Td>
                            <DataTable.Td className="font-semibold text-slate-900 dark:text-white">
                                {surat.nama}
                            </DataTable.Td>
                            <DataTable.Td className="text-slate-500 dark:text-slate-400">
                                {surat.tanggal_berlaku ? new Date(surat.tanggal_berlaku).toLocaleDateString('id-ID') : '-'}
                            </DataTable.Td>
                            <DataTable.Td className="text-slate-500 dark:text-slate-400 text-sm">
                                {formatPIC(surat.pic)}
                            </DataTable.Td>
                            <DataTable.Td className="text-center">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${surat.status === 'DISETUJUI' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800' : 'bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}>
                                    {surat.status}
                                </span>
                            </DataTable.Td>
                            <DataTable.Td className="text-center">
                                {surat.link_file ? (
                                    <a 
                                        href={surat.link_file}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 inline-block text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors" 
                                        title="Buka File"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                    </a>
                                ) : (
                                    <span className="text-slate-400">-</span>
                                )}
                            </DataTable.Td>
                        </DataTable.Tr>
                    ))
                    ) : (
                        <DataTable.Empty colSpan={6} message="Data Surat Edaran belum tersedia" />
                    )}
                </DataTable.Tbody>
            </DataTable>
        </AuthenticatedLayout>
    );
}
