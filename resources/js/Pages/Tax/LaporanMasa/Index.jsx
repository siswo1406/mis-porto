import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import PageHeader from '@/Components/PageHeader';
import DataTable from '@/Components/DataTable';
import PageActions from '@/Components/PageActions';
import Pagination from '@/Components/Pagination';
import Tabs from '@/Components/Tabs';
import Swal from 'sweetalert2';
import AddEditLaporanModal from './Partials/AddEditLaporanModal';
import PembetulanModal from './Partials/PembetulanModal';
import UraianModal from './Partials/UraianModal';
import AddEditStpModal from './Partials/AddEditStpModal';
import UraianStpModal from './Partials/UraianStpModal';

export default function Index({
    auth,
    active_tab = 'laporan_masa',
    laporan_masas = null,
    stps = null,
    rekap_ap_data = null,
    rekap_gabungan_data = null,
    company_list = [],
    regions = [],
    available_years = [],
    tax_types = [],
    filters = {}
}) {
    const { flash = {} } = usePage().props;

    // Active workspace tab
    const [currentTab, setCurrentTab] = useState(active_tab);

    // Tab 1 & Tab 2 Filters (Laporan Masa & STP)
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [perPage, setPerPage] = useState(filters?.per_page || 10);
    const [selectedJenisPajak, setSelectedJenisPajak] = useState(filters?.jenis_pajak || 'Semua');
    const [selectedAp, setSelectedAp] = useState(filters?.ap || 'Semua');
    const [selectedTahun, setSelectedTahun] = useState(filters?.tahun || '');

    // Tab 3 Filters (Rekap per AP)
    const [rekapApTarget, setRekapApTarget] = useState(filters?.rekap_ap_target || 'PT MUSTIKA JAYA LESTARI');
    const [rekapTahun, setRekapTahun] = useState(filters?.rekap_tahun || (available_years[0] || new Date().getFullYear()));
    const [rekapSub, setRekapSub] = useState(filters?.rekap_sub || 'laporan_masa');

    // Tab 4 Filters (Rekap Gabungan)
    const [gabunganTahun, setGabunganTahun] = useState(filters?.gabungan_tahun || (available_years[0] || new Date().getFullYear()));
    const [gabunganPajak, setGabunganPajak] = useState(filters?.gabungan_pajak || 'PPh 21');
    const [gabunganTipe, setGabunganTipe] = useState(filters?.gabungan_tipe || 'laporan_masa');

    // Modals state - Laporan Masa
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [editingLaporan, setEditingLaporan] = useState(null);
    const [isPembetulanModalOpen, setIsPembetulanModalOpen] = useState(false);
    const [selectedLaporanPembetulan, setSelectedLaporanPembetulan] = useState(null);
    const [isUraianModalOpen, setIsUraianModalOpen] = useState(false);
    const [selectedLaporanUraian, setSelectedLaporanUraian] = useState(null);

    // Modals state - STP
    const [isAddEditStpModalOpen, setIsAddEditStpModalOpen] = useState(false);
    const [editingStp, setEditingStp] = useState(null);
    const [isUraianStpModalOpen, setIsUraianStpModalOpen] = useState(false);
    const [selectedStpUraian, setSelectedStpUraian] = useState(null);

    // Workspace navigation tabs
    const workspaceTabs = [
        { id: 'laporan_masa', label: '📑 Laporan Masa', icon: null },
        { id: 'stp', label: '📋 Surat Tagihan Pajak (STP)', icon: null },
        { id: 'rekap_ap', label: '📊 Rekapitulasi per AP', icon: null },
        { id: 'rekap_gabungan', label: '🏢 Rekap Gabungan Seluruh AP', icon: null },
    ];

    // Handle Workspace Tab Switching
    const handleTabChange = (tabId) => {
        setCurrentTab(tabId);
        router.get(route('tax.laporan-masa.index'), {
            tab: tabId,
            search: searchQuery,
            per_page: perPage,
            jenis_pajak: selectedJenisPajak,
            ap: selectedAp,
            tahun: selectedTahun,
            rekap_ap_target: rekapApTarget,
            rekap_tahun: rekapTahun,
            rekap_sub: rekapSub,
            gabungan_tahun: gabunganTahun,
            gabungan_pajak: gabunganPajak,
            gabungan_tipe: gabunganTipe,
        }, {
            preserveState: true,
            replace: true,
            preserveScroll: true
        });
    };

    // Filter debounce for Tab 1 & Tab 2
    useEffect(() => {
        if (currentTab !== 'laporan_masa' && currentTab !== 'stp') return;
        const timer = setTimeout(() => {
            if (
                searchQuery !== (filters?.search || '') ||
                perPage !== (filters?.per_page || 10) ||
                selectedJenisPajak !== (filters?.jenis_pajak || 'Semua') ||
                selectedAp !== (filters?.ap || 'Semua') ||
                selectedTahun !== (filters?.tahun || '')
            ) {
                router.get(route('tax.laporan-masa.index'), {
                    tab: currentTab,
                    search: searchQuery,
                    per_page: perPage,
                    jenis_pajak: selectedJenisPajak,
                    ap: selectedAp,
                    tahun: selectedTahun,
                }, {
                    preserveState: true,
                    replace: true,
                    preserveScroll: true
                });
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery, perPage, selectedJenisPajak, selectedAp, selectedTahun]);

    // Apply Filter for Tab 3 (Rekap per AP)
    const applyRekapApFilter = (apVal, yearVal, subVal) => {
        router.get(route('tax.laporan-masa.index'), {
            tab: 'rekap_ap',
            rekap_ap_target: apVal,
            rekap_tahun: yearVal,
            rekap_sub: subVal,
        }, {
            preserveState: true,
            replace: true,
            preserveScroll: true
        });
    };

    // Apply Filter for Tab 4 (Rekap Gabungan)
    const applyRekapGabunganFilter = (yearVal, taxVal, typeVal) => {
        router.get(route('tax.laporan-masa.index'), {
            tab: 'rekap_gabungan',
            gabungan_tahun: yearVal,
            gabungan_pajak: taxVal,
            gabungan_tipe: typeVal,
        }, {
            preserveState: true,
            replace: true,
            preserveScroll: true
        });
    };

    // SweetAlert Flash feedback
    useEffect(() => {
        if (flash?.success) {
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
        if (flash?.error) {
            Swal.fire({
                title: 'Gagal!',
                text: flash.error,
                icon: 'error',
                timer: 4000,
                showConfirmButton: false,
                toast: true,
                position: 'top-end',
                background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
                color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#000000',
            });
        }
    }, [flash]);

    // Helpers
    const monthNames = {
        '01': 'Januari', '02': 'Februari', '03': 'Maret', '04': 'April',
        '05': 'Mei', '06': 'Juni', '07': 'Juli', '08': 'Agustus',
        '09': 'September', '10': 'Oktober', '11': 'November', '12': 'Desember'
    };

    const formatCurrency = (amount) => {
        if (amount === null || amount === undefined || amount === '') return '-';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const formatRibuan = (amount) => {
        if (!amount || amount === 0) return '0';
        return new Intl.NumberFormat('id-ID', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(Math.round(amount / 1000));
    };

    const getTaxBadgeClass = (tax) => {
        switch (tax) {
            case 'PPh 21':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800';
            case 'PPh 22':
                return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800';
            case 'PPh 23':
                return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800';
            case 'PPh 25':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200 dark:border-purple-800';
            case 'PPh Pasal 4 Ayat 2':
            case 'PPh 4 (2)':
                return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
            case 'PPN':
                return 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 border-rose-200 dark:border-rose-800';
            case 'PPh 29':
                return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
            default:
                return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
        }
    };

    // Client-side CSV/Excel Exporter
    const exportCsv = (filename, headers, rows) => {
        const processRow = (row) => {
            return row.map(val => {
                let finalVal = val === null || val === undefined ? '' : String(val);
                finalVal = finalVal.replace(/"/g, '""');
                if (finalVal.search(/("|,|\n)/g) >= 0) {
                    finalVal = `"${finalVal}"`;
                }
                return finalVal;
            }).join(',');
        };

        const csvContent = '\uFEFF' + headers.join(',') + '\n' + rows.map(processRow).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${filename}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Actions for Laporan Masa
    const handleOpenAddLaporan = () => {
        setEditingLaporan(null);
        setIsAddEditModalOpen(true);
    };

    const handleOpenEditLaporan = (item) => {
        setEditingLaporan(item);
        setIsAddEditModalOpen(true);
    };

    const handleDeleteLaporan = (item) => {
        const monthLabel = monthNames[String(item.bulan).padStart(2, '0')] || item.bulan;
        Swal.fire({
            title: 'Hapus Laporan Masa?',
            text: `Yakin ingin menghapus ${item.jenis_pajak} - ${item.ap} (${monthLabel} ${item.tahun}) beserta seluruh pembetulannya?`,
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
                router.delete(route('tax.laporan-masa.destroy', item.id), {
                    preserveScroll: true
                });
            }
        });
    };

    // Actions for STP
    const handleOpenAddStp = () => {
        setEditingStp(null);
        setIsAddEditStpModalOpen(true);
    };

    const handleOpenEditStp = (item) => {
        setEditingStp(item);
        setIsAddEditStpModalOpen(true);
    };

    const handleDeleteStp = (item) => {
        const monthLabel = monthNames[String(item.bulan).padStart(2, '0')] || item.bulan;
        Swal.fire({
            title: 'Hapus Surat Tagihan Pajak?',
            text: `Yakin ingin menghapus STP ${item.jenis_pajak} - ${item.ap} (${monthLabel} ${item.tahun}) No. ${item.nomor_stp || '-'}?`,
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
                router.delete(route('tax.stp.destroy', item.id), {
                    preserveScroll: true
                });
            }
        });
    };

    const handleResetFilters = () => {
        setSearchQuery('');
        setSelectedJenisPajak('Semua');
        setSelectedAp('Semua');
        setSelectedTahun('');
        setPerPage(10);
    };

    const hasActiveFilters = searchQuery || (selectedJenisPajak && selectedJenisPajak !== 'Semua') || (selectedAp && selectedAp !== 'Semua') || selectedTahun;

    const taxTabs = [
        { id: 'Semua', label: 'Semua Pajak' },
        ...tax_types.map(t => ({ id: t, label: t }))
    ];

    // Compute stats for current active dataset
    const totalRecords = currentTab === 'stp' ? (stps?.total || 0) : (laporan_masas?.total || 0);
    const currentItems = currentTab === 'stp' ? (stps?.data || []) : (laporan_masas?.data || []);
    const totalNominalPage = currentItems.reduce((acc, curr) => {
        const val = curr.jenis_pajak === 'PPh Pasal 4 Ayat 2' || curr.jenis_pajak === 'PPh 4 (2)'
            ? parseFloat(curr.pajak_10_persen || curr.nominal) || 0
            : parseFloat(curr.nominal) || 0;
        return acc + val;
    }, 0);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <PageHeader
                    title="Unified Tax Workspace"
                    breadcrumbs={[
                        { label: 'Portal Tax', href: route('tax.portal') },
                        { label: 'Laporan & Rekap Pajak', href: null },
                    ]}
                />
            }
        >
            <Head title="Tax Workspace - Laporan Masa & Rekapitulasi" />

            {/* TOP WORKSPACE NAVIGATION TABS */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-sm mb-6">
                <div className="flex flex-wrap items-center gap-2">
                    {workspaceTabs.map((tab) => {
                        const isActive = currentTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                                    isActive
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                                }`}
                            >
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* =======================================================
                TAB 1: LAPORAN MASA & TAB 2: STP (DATA TABLES)
               ======================================================= */}
            {(currentTab === 'laporan_masa' || currentTab === 'stp') && (
                <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    {currentTab === 'stp' ? 'Total Tagihan STP' : 'Total Laporan Terdata'}
                                </p>
                                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                                    {totalRecords} <span className="text-xs font-normal text-slate-500">dokumen</span>
                                </p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    Total Nominal (Halaman Ini)
                                </p>
                                <p className="text-xl font-bold text-slate-800 dark:text-slate-100">
                                    {formatCurrency(totalNominalPage)}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Entitas Perusahaan</p>
                                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">14 <span className="text-xs font-normal text-slate-500">AP & HO</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Page Actions */}
                    <PageActions
                        searchPlaceholder={currentTab === 'stp' ? 'Cari AP, jenis pajak, No STP, uraian...' : 'Cari AP, jenis pajak, NOP, uraian...'}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                    >
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                <span>Menampilkan</span>
                                <div className="flex items-center bg-white dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                                    <select
                                        value={perPage}
                                        onChange={(e) => setPerPage(e.target.value)}
                                        className="py-1 pl-2 pr-7 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-transparent border-none rounded-md focus:ring-0 cursor-pointer"
                                    >
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                </div>
                                <span>per hal.</span>
                            </div>

                            {currentTab === 'laporan_masa' ? (
                                <button
                                    onClick={handleOpenAddLaporan}
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span>Tambah Laporan</span>
                                </button>
                            ) : (
                                <button
                                    onClick={handleOpenAddStp}
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 active:bg-rose-700 rounded-xl shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span>Tambah STP</span>
                                </button>
                            )}
                        </div>
                    </PageActions>

                    {/* Filter Bar */}
                    <div className="space-y-4 mb-4">
                        <Tabs
                            tabs={taxTabs}
                            activeTab={selectedJenisPajak}
                            onChange={setSelectedJenisPajak}
                        />

                        <div className="bg-white dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-3">
                            <div className="flex flex-wrap items-center gap-3">
                                {/* Filter Tahun */}
                                <div className="flex items-center gap-2">
                                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Tahun:</label>
                                    <select
                                        value={selectedTahun}
                                        onChange={e => setSelectedTahun(e.target.value)}
                                        className="py-1.5 pl-3 pr-8 text-xs font-medium rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option value="">Semua Tahun</option>
                                        {available_years.map(yr => (
                                            <option key={yr} value={yr}>{yr}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Filter AP */}
                                <div className="flex items-center gap-2">
                                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">AP:</label>
                                    <select
                                        value={selectedAp}
                                        onChange={e => setSelectedAp(e.target.value)}
                                        className="py-1.5 pl-3 pr-8 text-xs font-medium rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:border-blue-500 focus:ring-blue-500 max-w-[220px]"
                                    >
                                        <option value="Semua">Semua Perusahaan</option>
                                        <option value="PT MUSTIKA JAYA LESTARI">PT MUSTIKA JAYA LESTARI (HO)</option>
                                        {regions.map(r => (
                                            <option key={r.koderegion} value={r.namaregion}>
                                                {r.namaregion}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {hasActiveFilters && (
                                <button
                                    onClick={handleResetFilters}
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:underline px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Reset Filter
                                </button>
                            )}
                        </div>
                    </div>

                    {/* TABLE: LAPORAN MASA */}
                    {currentTab === 'laporan_masa' && (
                        <DataTable
                            pagination={
                                laporan_masas ? (
                                    <Pagination
                                        links={laporan_masas.links}
                                        from={laporan_masas.from}
                                        to={laporan_masas.to}
                                        total={laporan_masas.total}
                                    />
                                ) : null
                            }
                        >
                            <DataTable.Thead>
                                <DataTable.Th className="w-12 text-center">No</DataTable.Th>
                                <DataTable.Th>Periode</DataTable.Th>
                                <DataTable.Th>Anak Perusahaan</DataTable.Th>
                                <DataTable.Th>Jenis Pajak</DataTable.Th>
                                <DataTable.Th>Tgl Bayar</DataTable.Th>
                                <DataTable.Th>Tgl Lapor</DataTable.Th>
                                <DataTable.Th>NOP / Billing</DataTable.Th>
                                <DataTable.Th className="text-right">Nominal Pajak</DataTable.Th>
                                <DataTable.Th className="text-center">Bukti</DataTable.Th>
                                <DataTable.Th className="text-center">Pembetulan</DataTable.Th>
                                <DataTable.Th className="text-center">Uraian</DataTable.Th>
                                <DataTable.Th className="w-24 text-center">Aksi</DataTable.Th>
                            </DataTable.Thead>

                            <DataTable.Tbody>
                                {laporan_masas?.data && laporan_masas.data.length > 0 ? (
                                    laporan_masas.data.map((item, index) => {
                                        const rowNumber = (laporan_masas.current_page - 1) * laporan_masas.per_page + index + 1;
                                        const monthKey = String(item.bulan).padStart(2, '0');
                                        const monthLabel = monthNames[monthKey] || item.bulan;
                                        const isPPh4Ayat2 = item.jenis_pajak === 'PPh Pasal 4 Ayat 2' || item.jenis_pajak === 'PPh 4 (2)';
                                        const displayedNominal = isPPh4Ayat2 ? item.pajak_10_persen : item.nominal;
                                        const pembetulanCount = item.pembetulans?.length || 0;

                                        return (
                                            <DataTable.Tr key={item.id}>
                                                <DataTable.Td className="text-center text-xs font-semibold text-slate-500">
                                                    {rowNumber}
                                                </DataTable.Td>
                                                <DataTable.Td>
                                                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                                                        {monthLabel} {item.tahun}
                                                    </div>
                                                </DataTable.Td>
                                                <DataTable.Td>
                                                    <div className="font-medium text-slate-800 dark:text-slate-200 max-w-[200px] truncate" title={item.ap}>
                                                        {item.ap}
                                                    </div>
                                                </DataTable.Td>
                                                <DataTable.Td>
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getTaxBadgeClass(item.jenis_pajak)}`}>
                                                        {item.jenis_pajak}
                                                    </span>
                                                </DataTable.Td>
                                                <DataTable.Td className="text-xs text-slate-600 dark:text-slate-400">
                                                    {item.tanggal_bayar || '-'}
                                                </DataTable.Td>
                                                <DataTable.Td className="text-xs text-slate-600 dark:text-slate-400">
                                                    {item.tanggal_lapor || '-'}
                                                </DataTable.Td>
                                                <DataTable.Td className="font-mono text-xs text-slate-700 dark:text-slate-300">
                                                    {item.nop || '-'}
                                                </DataTable.Td>
                                                <DataTable.Td className="text-right font-semibold text-slate-900 dark:text-slate-100">
                                                    {formatCurrency(displayedNominal)}
                                                    {isPPh4Ayat2 && item.nilai_sewa && (
                                                        <div className="text-[10px] text-slate-400 font-normal">
                                                            Sewa: {formatCurrency(item.nilai_sewa)}
                                                        </div>
                                                    )}
                                                </DataTable.Td>
                                                <DataTable.Td className="text-center">
                                                    {item.bukti_bayar ? (
                                                        <a
                                                            href={`/storage/${item.bukti_bayar}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-colors"
                                                            title="Lihat Bukti Bayar / SPT"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                                            </svg>
                                                        </a>
                                                    ) : (
                                                        <span className="text-slate-400">-</span>
                                                    )}
                                                </DataTable.Td>
                                                <DataTable.Td className="text-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedLaporanPembetulan(item);
                                                            setIsPembetulanModalOpen(true);
                                                        }}
                                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                                                            pembetulanCount > 0
                                                                ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100'
                                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                                        }`}
                                                    >
                                                        <span>{pembetulanCount}</span>
                                                    </button>
                                                </DataTable.Td>
                                                <DataTable.Td className="text-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedLaporanUraian(item);
                                                            setIsUraianModalOpen(true);
                                                        }}
                                                        className={`p-1.5 rounded-lg transition-colors ${
                                                            item.uraian
                                                                ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30'
                                                                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                                                        }`}
                                                        title={item.uraian || 'Tambah Uraian'}
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                </DataTable.Td>
                                                <DataTable.Td className="text-center">
                                                    <div className="flex items-center justify-center gap-1.5">
                                                        <button
                                                            onClick={() => handleOpenEditLaporan(item)}
                                                            className="p-1.5 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                                            title="Edit Laporan"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteLaporan(item)}
                                                            className="p-1.5 text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                                            title="Hapus Laporan"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </DataTable.Td>
                                            </DataTable.Tr>
                                        );
                                    })
                                ) : (
                                    <DataTable.Empty message="Belum ada data Laporan Masa yang cocok dengan filter." colSpan={12} />
                                )}
                            </DataTable.Tbody>
                        </DataTable>
                    )}

                    {/* TABLE: STP (SURAT TAGIHAN PAJAK) */}
                    {currentTab === 'stp' && (
                        <DataTable
                            pagination={
                                stps ? (
                                    <Pagination
                                        links={stps.links}
                                        from={stps.from}
                                        to={stps.to}
                                        total={stps.total}
                                    />
                                ) : null
                            }
                        >
                            <DataTable.Thead>
                                <DataTable.Th className="w-12 text-center">No</DataTable.Th>
                                <DataTable.Th>Periode</DataTable.Th>
                                <DataTable.Th>Anak Perusahaan</DataTable.Th>
                                <DataTable.Th>Jenis Pajak</DataTable.Th>
                                <DataTable.Th>No. Surat Tagihan (STP)</DataTable.Th>
                                <DataTable.Th>Tgl Terbit STP</DataTable.Th>
                                <DataTable.Th>Tgl Bayar</DataTable.Th>
                                <DataTable.Th className="text-right">Nominal Tagihan</DataTable.Th>
                                <DataTable.Th className="text-center">Bukti</DataTable.Th>
                                <DataTable.Th className="text-center">Uraian Sanksi</DataTable.Th>
                                <DataTable.Th className="w-24 text-center">Aksi</DataTable.Th>
                            </DataTable.Thead>

                            <DataTable.Tbody>
                                {stps?.data && stps.data.length > 0 ? (
                                    stps.data.map((item, index) => {
                                        const rowNumber = (stps.current_page - 1) * stps.per_page + index + 1;
                                        const monthKey = String(item.bulan).padStart(2, '0');
                                        const monthLabel = monthNames[monthKey] || item.bulan;

                                        return (
                                            <DataTable.Tr key={item.id}>
                                                <DataTable.Td className="text-center text-xs font-semibold text-slate-500">
                                                    {rowNumber}
                                                </DataTable.Td>
                                                <DataTable.Td>
                                                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                                                        {monthLabel} {item.tahun}
                                                    </div>
                                                </DataTable.Td>
                                                <DataTable.Td>
                                                    <div className="font-medium text-slate-800 dark:text-slate-200 max-w-[200px] truncate" title={item.ap}>
                                                        {item.ap}
                                                    </div>
                                                </DataTable.Td>
                                                <DataTable.Td>
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getTaxBadgeClass(item.jenis_pajak)}`}>
                                                        {item.jenis_pajak}
                                                    </span>
                                                </DataTable.Td>
                                                <DataTable.Td className="font-mono text-xs text-rose-700 dark:text-rose-400 font-semibold">
                                                    {item.nomor_stp || '-'}
                                                </DataTable.Td>
                                                <DataTable.Td className="text-xs text-slate-600 dark:text-slate-400">
                                                    {item.tanggal_stp || '-'}
                                                </DataTable.Td>
                                                <DataTable.Td className="text-xs text-slate-600 dark:text-slate-400">
                                                    {item.tanggal_bayar || '-'}
                                                </DataTable.Td>
                                                <DataTable.Td className="text-right font-semibold text-rose-600 dark:text-rose-400">
                                                    {formatCurrency(item.nominal)}
                                                </DataTable.Td>
                                                <DataTable.Td className="text-center">
                                                    {item.bukti_bayar ? (
                                                        <a
                                                            href={`/storage/${item.bukti_bayar}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition-colors"
                                                            title="Lihat Bukti Bayar STP"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                                            </svg>
                                                        </a>
                                                    ) : (
                                                        <span className="text-slate-400">-</span>
                                                    )}
                                                </DataTable.Td>
                                                <DataTable.Td className="text-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedStpUraian(item);
                                                            setIsUraianStpModalOpen(true);
                                                        }}
                                                        className={`p-1.5 rounded-lg transition-colors ${
                                                            item.uraian
                                                                ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30'
                                                                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                                                        }`}
                                                        title={item.uraian || 'Tambah Uraian Sanksi'}
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                </DataTable.Td>
                                                <DataTable.Td className="text-center">
                                                    <div className="flex items-center justify-center gap-1.5">
                                                        <button
                                                            onClick={() => handleOpenEditStp(item)}
                                                            className="p-1.5 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                                            title="Edit STP"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteStp(item)}
                                                            className="p-1.5 text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                                            title="Hapus STP"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </DataTable.Td>
                                            </DataTable.Tr>
                                        );
                                    })
                                ) : (
                                    <DataTable.Empty message="Belum ada Surat Tagihan Pajak (STP) yang sesuai filter." colSpan={11} />
                                )}
                            </DataTable.Tbody>
                        </DataTable>
                    )}
                </>
            )}

            {/* =======================================================
                TAB 3: REKAPITULASI PER ANAK PERUSAHAAN (AP)
               ======================================================= */}
            {currentTab === 'rekap_ap' && (
                <div className="space-y-4">
                    {/* Filter & Export Bar */}
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-3">
                            {/* Selector AP */}
                            <div className="flex items-center gap-2">
                                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Perusahaan:</label>
                                <select
                                    value={rekapApTarget}
                                    onChange={(e) => {
                                        setRekapApTarget(e.target.value);
                                        applyRekapApFilter(e.target.value, rekapTahun, rekapSub);
                                    }}
                                    className="py-1.5 pl-3 pr-8 text-xs font-medium rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:border-blue-500 focus:ring-blue-500 min-w-[220px]"
                                >
                                    <option value="PT MUSTIKA JAYA LESTARI">PT MUSTIKA JAYA LESTARI (HO)</option>
                                    {regions.map(r => (
                                        <option key={r.koderegion} value={r.namaregion}>
                                            {r.namaregion}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Selector Tahun */}
                            <div className="flex items-center gap-2">
                                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Tahun:</label>
                                <select
                                    value={rekapTahun}
                                    onChange={(e) => {
                                        setRekapTahun(e.target.value);
                                        applyRekapApFilter(rekapApTarget, e.target.value, rekapSub);
                                    }}
                                    className="py-1.5 pl-3 pr-8 text-xs font-medium rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:border-blue-500 focus:ring-blue-500"
                                >
                                    {available_years.map(yr => (
                                        <option key={yr} value={yr}>{yr}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Switcher: Laporan Masa vs STP */}
                            <div className="inline-flex rounded-xl p-1 bg-slate-100 dark:bg-slate-800">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setRekapSub('laporan_masa');
                                        applyRekapApFilter(rekapApTarget, rekapTahun, 'laporan_masa');
                                    }}
                                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                                        rekapSub === 'laporan_masa'
                                            ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                >
                                    Laporan Masa
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setRekapSub('stp');
                                        applyRekapApFilter(rekapApTarget, rekapTahun, 'stp');
                                    }}
                                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                                        rekapSub === 'stp'
                                            ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm'
                                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                >
                                    Surat Tagihan (STP)
                                </button>
                            </div>
                        </div>

                        {/* Export Excel Button */}
                        <button
                            type="button"
                            onClick={() => {
                                const headers = ['No', 'Bulan', 'PPh 21', 'PPh 22', 'PPh 23', 'PPh 25', 'PPh Pasal 4(2)', 'PPh 29', 'PPN', 'Total Bulan'];
                                const rows = (rekap_ap_data?.rows || []).map((r, idx) => [
                                    idx + 1,
                                    r.bulan_name,
                                    r.pph_21,
                                    r.pph_22,
                                    r.pph_23,
                                    r.pph_25,
                                    r.pph_ps_4_2,
                                    r.pph_29,
                                    r.ppn,
                                    r.total,
                                ]);
                                const tot = rekap_ap_data?.totals || {};
                                rows.push(['TOTAL', 'TAHUNAN', tot.pph_21, tot.pph_22, tot.pph_23, tot.pph_25, tot.pph_ps_4_2, tot.pph_29, tot.ppn, tot.total]);
                                exportCsv(`Rekap_${rekapSub}_${rekapApTarget}_${rekapTahun}`, headers, rows);
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 rounded-xl shadow-sm transition-all"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>Export Excel / CSV</span>
                        </button>
                    </div>

                    {/* Table Rekap per AP */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 bg-slate-50/50 dark:bg-slate-800/30">
                            <div>
                                <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                                    Rekapitulasi {rekapSub === 'stp' ? 'Surat Tagihan Pajak (STP)' : 'Laporan Masa'} - {rekapApTarget}
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Tahun Pajak {rekapTahun} • Nilai Moneter dalam Rupiah (Rp)
                                </p>
                            </div>
                            <div className="text-right">
                                <span className="text-xs font-medium text-slate-500">Total Akumulasi: </span>
                                <span className="text-base font-bold text-blue-600 dark:text-blue-400">
                                    {formatCurrency(rekap_ap_data?.totals?.total || 0)}
                                </span>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-xs text-left">
                                <thead className="text-[11px] uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                                    <tr>
                                        <th className="py-3.5 px-4 text-center w-12">No</th>
                                        <th className="py-3.5 px-4">Bulan</th>
                                        <th className="py-3.5 px-4 text-right">PPh 21</th>
                                        <th className="py-3.5 px-4 text-right">PPh 22</th>
                                        <th className="py-3.5 px-4 text-right">PPh 23</th>
                                        <th className="py-3.5 px-4 text-right">PPh 25</th>
                                        <th className="py-3.5 px-4 text-right">PPh Ps 4(2)</th>
                                        <th className="py-3.5 px-4 text-right">PPh 29</th>
                                        <th className="py-3.5 px-4 text-right">PPN</th>
                                        <th className="py-3.5 px-4 text-right bg-slate-200/60 dark:bg-slate-700/60 font-bold">Total Bulan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                    {rekap_ap_data?.rows && rekap_ap_data.rows.map((row, idx) => (
                                        <tr key={row.bulan_code} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="py-2.5 px-4 text-center font-medium text-slate-500">{idx + 1}</td>
                                            <td className="py-2.5 px-4 font-semibold text-slate-800 dark:text-slate-200">{row.bulan_name}</td>
                                            <td className="py-2.5 px-4 text-right text-slate-700 dark:text-slate-300 font-mono">{formatCurrency(row.pph_21)}</td>
                                            <td className="py-2.5 px-4 text-right text-slate-700 dark:text-slate-300 font-mono">{formatCurrency(row.pph_22)}</td>
                                            <td className="py-2.5 px-4 text-right text-slate-700 dark:text-slate-300 font-mono">{formatCurrency(row.pph_23)}</td>
                                            <td className="py-2.5 px-4 text-right text-slate-700 dark:text-slate-300 font-mono">{formatCurrency(row.pph_25)}</td>
                                            <td className="py-2.5 px-4 text-right text-slate-700 dark:text-slate-300 font-mono">{formatCurrency(row.pph_ps_4_2)}</td>
                                            <td className="py-2.5 px-4 text-right text-slate-700 dark:text-slate-300 font-mono">{formatCurrency(row.pph_29)}</td>
                                            <td className="py-2.5 px-4 text-right text-slate-700 dark:text-slate-300 font-mono">{formatCurrency(row.ppn)}</td>
                                            <td className="py-2.5 px-4 text-right font-bold text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/40 font-mono">
                                                {formatCurrency(row.total)}
                                            </td>
                                        </tr>
                                    ))}
                                    {/* Baris Total Tahunan */}
                                    <tr className="bg-blue-50/70 dark:bg-blue-950/40 font-bold text-slate-900 dark:text-slate-100 border-t-2 border-slate-300 dark:border-slate-700">
                                        <td colSpan={2} className="py-3.5 px-4 text-center uppercase tracking-wider text-blue-700 dark:text-blue-300">
                                            Total Tahun {rekapTahun}
                                        </td>
                                        <td className="py-3.5 px-4 text-right font-mono text-blue-700 dark:text-blue-300">{formatCurrency(rekap_ap_data?.totals?.pph_21 || 0)}</td>
                                        <td className="py-3.5 px-4 text-right font-mono text-blue-700 dark:text-blue-300">{formatCurrency(rekap_ap_data?.totals?.pph_22 || 0)}</td>
                                        <td className="py-3.5 px-4 text-right font-mono text-blue-700 dark:text-blue-300">{formatCurrency(rekap_ap_data?.totals?.pph_23 || 0)}</td>
                                        <td className="py-3.5 px-4 text-right font-mono text-blue-700 dark:text-blue-300">{formatCurrency(rekap_ap_data?.totals?.pph_25 || 0)}</td>
                                        <td className="py-3.5 px-4 text-right font-mono text-blue-700 dark:text-blue-300">{formatCurrency(rekap_ap_data?.totals?.pph_ps_4_2 || 0)}</td>
                                        <td className="py-3.5 px-4 text-right font-mono text-blue-700 dark:text-blue-300">{formatCurrency(rekap_ap_data?.totals?.pph_29 || 0)}</td>
                                        <td className="py-3.5 px-4 text-right font-mono text-blue-700 dark:text-blue-300">{formatCurrency(rekap_ap_data?.totals?.ppn || 0)}</td>
                                        <td className="py-3.5 px-4 text-right font-mono text-blue-800 dark:text-blue-200 bg-blue-100/60 dark:bg-blue-900/60 text-sm">
                                            {formatCurrency(rekap_ap_data?.totals?.total || 0)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* =======================================================
                TAB 4: REKAPITULASI GABUNGAN SELURUH AP (MATRIX PIVOT)
               ======================================================= */}
            {currentTab === 'rekap_gabungan' && (
                <div className="space-y-4">
                    {/* Filter & Export Bar */}
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-3">
                            {/* Selector Tahun */}
                            <div className="flex items-center gap-2">
                                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Tahun:</label>
                                <select
                                    value={gabunganTahun}
                                    onChange={(e) => {
                                        setGabunganTahun(e.target.value);
                                        applyRekapGabunganFilter(e.target.value, gabunganPajak, gabunganTipe);
                                    }}
                                    className="py-1.5 pl-3 pr-8 text-xs font-medium rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:border-blue-500 focus:ring-blue-500"
                                >
                                    {available_years.map(yr => (
                                        <option key={yr} value={yr}>{yr}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Selector Tipe: Laporan Masa vs STP */}
                            <div className="inline-flex rounded-xl p-1 bg-slate-100 dark:bg-slate-800">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setGabunganTipe('laporan_masa');
                                        applyRekapGabunganFilter(gabunganTahun, gabunganPajak, 'laporan_masa');
                                    }}
                                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                                        gabunganTipe === 'laporan_masa'
                                            ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                >
                                    Laporan Masa
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setGabunganTipe('stp');
                                        applyRekapGabunganFilter(gabunganTahun, gabunganPajak, 'stp');
                                    }}
                                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                                        gabunganTipe === 'stp'
                                            ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm'
                                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                >
                                    Surat Tagihan (STP)
                                </button>
                            </div>

                            {/* Selector Jenis Pajak */}
                            <div className="flex items-center gap-2">
                                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Pajak:</label>
                                <select
                                    value={gabunganPajak}
                                    onChange={(e) => {
                                        setGabunganPajak(e.target.value);
                                        applyRekapGabunganFilter(gabunganTahun, e.target.value, gabunganTipe);
                                    }}
                                    className="py-1.5 pl-3 pr-8 text-xs font-medium rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:border-blue-500 focus:ring-blue-500 min-w-[160px]"
                                >
                                    {tax_types.map(t => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Export Excel Button */}
                        <button
                            type="button"
                            onClick={() => {
                                const companies = rekap_gabungan_data?.companies || [];
                                const headers = ['No', 'Bulan', ...companies, 'Total'];
                                const rows = (rekap_gabungan_data?.rows || []).map((r, idx) => [
                                    idx + 1,
                                    r.bulan_name,
                                    ...companies.map(c => r.aps[c] || 0),
                                    r.total,
                                ]);
                                const apTots = rekap_gabungan_data?.ap_totals || {};
                                rows.push(['TOTAL', 'TAHUNAN', ...companies.map(c => apTots[c] || 0), rekap_gabungan_data?.grand_total || 0]);
                                exportCsv(`RekapGabungan_${gabunganTipe}_${gabunganPajak}_${gabunganTahun}`, headers, rows);
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 rounded-xl shadow-sm transition-all"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>Export Excel / CSV</span>
                        </button>
                    </div>

                    {/* Matrix Pivot Table */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 bg-slate-50/50 dark:bg-slate-800/30">
                            <div>
                                <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                                    Rekap Gabungan Seluruh Anak Perusahaan ({gabunganPajak})
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Tipe: {gabunganTipe === 'stp' ? 'Surat Tagihan Pajak (STP)' : 'Laporan Masa'} • Tahun Pajak {gabunganTahun} • Dalam Rupiah (Rp)
                                </p>
                            </div>
                            <div className="text-right">
                                <span className="text-xs font-medium text-slate-500">Grand Total Konsolidasi: </span>
                                <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                                    {formatCurrency(rekap_gabungan_data?.grand_total || 0)}
                                </span>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-xs text-left">
                                <thead className="text-[11px] uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                                    <tr>
                                        <th className="py-3 px-3 text-center w-10">No</th>
                                        <th className="py-3 px-3 min-w-[100px]">Bulan</th>
                                        {rekap_gabungan_data?.companies && rekap_gabungan_data.companies.map((comp) => {
                                            const shortName = comp.replace('PT ', '');
                                            return (
                                                <th key={comp} className="py-3 px-3 text-right whitespace-nowrap" title={comp}>
                                                    {shortName}
                                                </th>
                                            );
                                        })}
                                        <th className="py-3 px-4 text-right bg-slate-200/60 dark:bg-slate-700/60 font-bold whitespace-nowrap">Total Bulan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
                                    {rekap_gabungan_data?.rows && rekap_gabungan_data.rows.map((row, idx) => (
                                        <tr key={row.bulan_code} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="py-2 px-3 text-center font-sans font-medium text-slate-500">{idx + 1}</td>
                                            <td className="py-2 px-3 font-sans font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                                                {row.bulan_name}
                                            </td>
                                            {rekap_gabungan_data.companies.map((comp) => {
                                                const val = row.aps[comp] || 0;
                                                return (
                                                    <td key={comp} className={`py-2 px-3 text-right whitespace-nowrap ${val > 0 ? 'text-slate-800 dark:text-slate-100 font-semibold' : 'text-slate-400 font-normal'}`}>
                                                        {val > 0 ? formatCurrency(val) : '-'}
                                                    </td>
                                                );
                                            })}
                                            <td className="py-2 px-4 text-right font-bold text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/40 whitespace-nowrap">
                                                {formatCurrency(row.total)}
                                            </td>
                                        </tr>
                                    ))}
                                    {/* Baris Total Per AP */}
                                    <tr className="bg-emerald-50/70 dark:bg-emerald-950/40 font-bold text-slate-900 dark:text-slate-100 border-t-2 border-slate-300 dark:border-slate-700">
                                        <td colSpan={2} className="py-3.5 px-3 text-center uppercase tracking-wider text-emerald-700 dark:text-emerald-300 font-sans">
                                            Total {gabunganTahun}
                                        </td>
                                        {rekap_gabungan_data?.companies && rekap_gabungan_data.companies.map((comp) => {
                                            const totVal = rekap_gabungan_data.ap_totals[comp] || 0;
                                            return (
                                                <td key={comp} className="py-3.5 px-3 text-right text-emerald-700 dark:text-emerald-300 whitespace-nowrap">
                                                    {formatCurrency(totVal)}
                                                </td>
                                            );
                                        })}
                                        <td className="py-3.5 px-4 text-right text-emerald-800 dark:text-emerald-200 bg-emerald-100/60 dark:bg-emerald-900/60 text-sm whitespace-nowrap">
                                            {formatCurrency(rekap_gabungan_data?.grand_total || 0)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Modals - Laporan Masa */}
            <AddEditLaporanModal
                isOpen={isAddEditModalOpen}
                onClose={() => setIsAddEditModalOpen(false)}
                laporan={editingLaporan}
                regions={regions}
                taxTypes={tax_types}
            />

            <PembetulanModal
                isOpen={isPembetulanModalOpen}
                onClose={() => setIsPembetulanModalOpen(false)}
                laporan={selectedLaporanPembetulan}
            />

            <UraianModal
                isOpen={isUraianModalOpen}
                onClose={() => setIsUraianModalOpen(false)}
                laporan={selectedLaporanUraian}
            />

            {/* Modals - STP */}
            <AddEditStpModal
                isOpen={isAddEditStpModalOpen}
                onClose={() => setIsAddEditStpModalOpen(false)}
                stp={editingStp}
                regions={regions}
                taxTypes={tax_types}
            />

            <UraianStpModal
                isOpen={isUraianStpModalOpen}
                onClose={() => setIsUraianStpModalOpen(false)}
                stp={selectedStpUraian}
            />
        </AuthenticatedLayout>
    );
}
