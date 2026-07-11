import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PageHeader from '@/Components/PageHeader';
import DataTable from '@/Components/DataTable';

export default function Portal({ auth, updates }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<PageHeader title="Portal QA" breadcrumbs={[{ label: 'Portal QA', url: null }]} />}
        >
            <Head title="Portal QA" />

            {/* Content Container Format (Match users table wrapper look) */}
            <div className="mb-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-200">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                    <h3 className="font-semibold text-lg mb-4 text-slate-800 dark:text-slate-200">Modul Quality Assurance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link 
                            href={route('qa.sop.index')} 
                            className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 group flex items-center justify-between"
                        >
                            <div>
                                <h3 className="font-bold text-lg text-blue-600 dark:text-blue-400">SOP 2024</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Standar Operasional Prosedur Perusahaan</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                        <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl opacity-50 cursor-not-allowed flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-lg">Buku Saku (Coming Soon)</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Panduan singkat operasional</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 mb-4 px-1 mt-8">
                <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200">Informasi Update SOP & Buku Saku Terbaru</h3>
            </div>

            {/* Table Container Format */}
            <DataTable>
                <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700/60 transition-colors">
                    <tr>
                        <th scope="col" className="px-6 py-4 font-semibold tracking-wider text-left align-middle">Tanggal</th>
                        <th scope="col" className="px-6 py-4 font-semibold tracking-wider text-left align-middle">Nama Dokumen</th>
                        <th scope="col" className="px-6 py-4 font-semibold tracking-wider text-left align-middle">PIC / Pembuat</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 transition-colors">
                    {updates.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors duration-200 group">
                            <td className="px-6 py-4 whitespace-nowrap text-red-500 font-bold italic">
                                Updated : {item.tanggal}
                            </td>
                            <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                                "{item.nama}"
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap uppercase text-slate-700 dark:text-slate-300">
                                {item.nik}
                            </td>
                        </tr>
                    ))}
                    {updates.length === 0 && (
                        <tr>
                            <td colSpan="3" className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                Belum ada update dokumen terbaru.
                            </td>
                        </tr>
                    )}
                </tbody>
            </DataTable>
        </AuthenticatedLayout>
    );
}
