import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PageHeader from '@/Components/PageHeader';
import Card from '@/Components/Card';

export default function Portal({ auth }) {
    const taxCategories = [
        {
            id: 1,
            title: 'Pelaporan Masa & STP',
            icon: (
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            color: 'bg-blue-50 dark:bg-blue-900/30',
            menus: [
                {
                    name: 'Laporan Masa',
                    href: route('tax.laporan-masa.index'),
                    description: 'PPh 21, 22, 23, 25, 29, Pasal 4 Ayat 2, PPN & Pembetulan',
                    isAvailable: true,
                },
                {
                    name: 'Surat Tagihan Pajak (STP)',
                    href: '#',
                    description: 'Daftar & rekapitulasi STP per Anak Perusahaan',
                    isAvailable: false,
                },
                {
                    name: 'Laporan PPh Unifikasi',
                    href: '#',
                    description: 'Pelaporan SPT Masa PPh Unifikasi',
                    isAvailable: false,
                },
            ]
        },
        {
            id: 2,
            title: 'Rekapitulasi Pajak',
            icon: (
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            color: 'bg-emerald-50 dark:bg-emerald-900/30',
            menus: [
                {
                    name: 'Rekap Pajak per AP',
                    href: '#',
                    description: 'Rekap tahunan per unit AP & Export Excel',
                    isAvailable: false,
                },
                {
                    name: 'Rekap Gabungan Pajak',
                    href: '#',
                    description: 'Konsolidasi data seluruh AP & Export Excel',
                    isAvailable: false,
                },
            ]
        },
        {
            id: 3,
            title: 'Master & Penugasan',
            icon: (
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            color: 'bg-purple-50 dark:bg-purple-900/30',
            menus: [
                {
                    name: 'Pembagian AP Staff Pajak',
                    href: '#',
                    description: 'Pengaturan penugasan AP untuk masing-masing Staff Pajak',
                    isAvailable: false,
                },
            ]
        }
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <PageHeader
                    title="Portal Tax"
                    breadcrumbs={[
                        { label: 'Beranda', href: route('dashboard') },
                        { label: 'TAF', href: null },
                        { label: 'Portal Tax', href: null },
                    ]}
                />
            }
        >
            <Head title="Portal Tax" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {taxCategories.map((category) => (
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
                                            className={`group flex items-center justify-between p-3.5 rounded-xl transition-all duration-200 ${
                                                menu.isAvailable
                                                    ? 'hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer'
                                                    : 'opacity-60 cursor-not-allowed bg-slate-50/50 dark:bg-slate-900/30'
                                            }`}
                                            onClick={(e) => !menu.isAvailable && e.preventDefault()}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 transition-colors ${
                                                    menu.isAvailable
                                                        ? 'bg-blue-500 dark:bg-blue-400 group-hover:scale-125'
                                                        : 'bg-slate-300 dark:bg-slate-600'
                                                }`}></div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`font-semibold text-sm transition-colors ${
                                                            menu.isAvailable
                                                                ? 'text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                                                                : 'text-slate-500 dark:text-slate-400'
                                                        }`}>
                                                            {menu.name}
                                                        </span>
                                                        {!menu.isAvailable && (
                                                            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                                                Segera
                                                            </span>
                                                        )}
                                                    </div>
                                                    {menu.description && (
                                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                                            {menu.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {menu.isAvailable && (
                                                <div className="text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
