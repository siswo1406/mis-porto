import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PageHeader from '@/Components/PageHeader';
import DataTable from '@/Components/DataTable';
import Card from '@/Components/Card';

export default function Portal({ auth, updates }) {
    const qaCategories = [
        {
            id: 1,
            title: 'Aturan & Standar',
            icon: (
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            ),
            color: 'bg-blue-50 dark:bg-blue-900/30',
            menus: [
                { name: 'SOP', href: route('qa.sop.index'), views: '152', isAvailable: true },
                { name: 'Surat Resmi', href: route('qa.surat-resmi.index'), views: '17', isAvailable: true }
            ]
        },
        {
            id: 2,
            title: 'Audit & Inspeksi',
            icon: (
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
            ),
            color: 'bg-emerald-50 dark:bg-emerald-900/30',
            menus: []
        }
    ];

    // Logika grid: Jika item cuma 2, pakai 2 kolom. Jika 3 atau lebih, pakai 3 kolom per baris.
    const gridCols = qaCategories.length <= 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3';

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<PageHeader title="Portal QA" breadcrumbs={[{ label: 'Portal QA', url: null }]} />}
        >
            <Head title="Portal QA" />

            <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-6 mb-8`}>
                {qaCategories.map((category) => (
                    <Card key={category.id} hoverEffect={true}>
                        {/* Card Header */}
                        <Card.Header>
                            <div className={`p-3 rounded-xl ${category.color}`}>
                                {category.icon}
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">
                                {category.title}
                            </h3>
                        </Card.Header>
                        
                        {/* Menu Items List */}
                        <Card.Body noPadding={true} className="p-2">
                            <ul className="space-y-1">
                                {category.menus.map((menu, idx) => (
                                    <li key={idx}>
                                        <Link 
                                            href={menu.href} 
                                            className={`group flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${menu.isAvailable ? 'hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer' : 'opacity-60 cursor-not-allowed'}`}
                                            onClick={(e) => !menu.isAvailable && e.preventDefault()}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-1.5 h-1.5 rounded-full transition-colors ${menu.isAvailable ? 'bg-slate-300 dark:bg-slate-600 group-hover:bg-blue-500' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
                                                <span className={`font-medium transition-colors ${menu.isAvailable ? 'text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
                                                    {menu.name}
                                                </span>
                                            </div>
                                            
                                            <div className="flex items-center gap-4">
                                                {/* Views count badge */}
                                                <div className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${menu.isAvailable ? 'text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-300' : 'text-slate-300 dark:text-slate-600'}`}>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                                    {menu.views}
                                                </div>
                                                
                                                {/* Action Buttons (Only if available) */}
                                                {menu.isAvailable && (
                                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                        <button className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-colors" title="Ubah">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                                        </button>
                                                        <button className="p-1.5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors bg-slate-100 dark:bg-slate-800" title="Lihat Detail">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                ))}
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
