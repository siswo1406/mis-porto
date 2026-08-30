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

export default function Index({ auth, laporan_masas, regions = [], available_years = [], tax_types = [], filters = {} }) {
    const { flash = {} } = usePage().props;

    // Filters state
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [perPage, setPerPage] = useState(filters?.per_page || 10);
    const [selectedJenisPajak, setSelectedJenisPajak] = useState(filters?.jenis_pajak || 'Semua');
    const [selectedAp, setSelectedAp] = useState(filters?.ap || 'Semua');
    const [selectedTahun, setSelectedTahun] = useState(filters?.tahun || '');

    // Modals state
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [editingLaporan, setEditingLaporan] = useState(null);
    const [isPembetulanModalOpen, setIsPembetulanModalOpen] = useState(false);
    const [selectedLaporanPembetulan, setSelectedLaporanPembetulan] = useState(null);
    const [isUraianModalOpen, setIsUraianModalOpen] = useState(false);
    const [selectedLaporanUraian, setSelectedLaporanUraian] = useState(null);

    // Filter debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            if (
                searchQuery !== (filters?.search || '') ||
                perPage !== (filters?.per_page || 10) ||
                selectedJenisPajak !== (filters?.jenis_pajak || 'Semua') ||
                selectedAp !== (filters?.ap || 'Semua') ||
                selectedTahun !== (filters?.tahun || '')
            ) {
                router.get(route('tax.laporan-masa.index'), {
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

    // Helper functions
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

    const handleOpenAdd = () => {
        setEditingLaporan(null);
        setIsAddEditModalOpen(true);
    };

    const handleOpenEdit = (item) => {
        setEditingLaporan(item);
        setIsAddEditModalOpen(true);
    };

    const handleOpenPembetulan = (item) => {
        setSelectedLaporanPembetulan(item);
        setIsPembetulanModalOpen(true);
    };

    const handleOpenUraian = (item) => {
        setSelectedLaporanUraian(item);
        setIsUraianModalOpen(true);
    };

    const handleDelete = (item) => {
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

    const handleResetFilters = () => {
        setSearchQuery('');
        setSelectedJenisPajak('Semua');
        setSelectedAp('Semua');
        setSelectedTahun('');
        setPerPage(10);
    };

    const hasActiveFilters = searchQuery || (selectedJenisPajak && selectedJenisPajak !== 'Semua') || (selectedAp && selectedAp !== 'Semua') || selectedTahun;

    // Tabs for Jenis Pajak
    const taxTabs = [
        { id: 'Semua', label: 'Semua Pajak' },
        ...tax_types.map(t => ({ id: t, label: t }))
    ];

    // Compute stats from current dataset
    const totalRecords = laporan_masas?.total || 0;
    const currentItems = laporan_masas?.data || [];
    const totalPembetulanCount = currentItems.reduce((acc, curr) => acc + (curr.pembetulans?.length || 0), 0);
    const totalNominalPage = currentItems.reduce((acc, curr) => {
        const val = curr.jenis_pajak === 'PPh Pasal 4 Ayat 2' || curr.jenis_pajak === 'PPh 4 (2)'
            ? parseFloat(curr.pajak_10_persen) || 0
            : parseFloat(curr.nominal) || 0;
        return acc + val;
    }, 0);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <PageHeader
                    title="Laporan Masa Pajak"
                    breadcrumbs={[
                        { label: 'Portal Tax', href: route('tax.portal') },
                        { label: 'Laporan Masa', href: null },
                    ]}
                />
            }
        >
            <Head title="Laporan Masa - Tax" />

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Laporan Terdata</p>
                        <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{totalRecords} <span className="text-xs font-normal text-slate-500">dokumen</span></p>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Nominal (Halaman Ini)</p>
                        <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{formatCurrency(totalNominalPage)}</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Riwayat Pembetulan</p>
                        <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{totalPembetulanCount} <span className="text-xs font-normal text-slate-500">entri</span></p>
                    </div>
                </div>
            </div>

            {/* Page Actions (Search & Add Button) */}
            <PageActions
                searchPlaceholder="Cari AP, jenis pajak, NOP, uraian..."
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

                    <button
                        onClick={handleOpenAdd}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Tambah Laporan</span>
                    </button>
                </div>
            </PageActions>

            {/* Filter Bar (Jenis Pajak Tabs & Select Filters) */}
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

                        {/* Filter Anak Perusahaan */}
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

            {/* DataTable */}
            <DataTable
                pagination={
                    <Pagination
                        links={laporan_masas.links}
                        from={laporan_masas.from}
                        to={laporan_masas.to}
                        total={laporan_masas.total}
                    />
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
                                            onClick={() => handleOpenPembetulan(item)}
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                                                pembetulanCount > 0
                                                    ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100'
                                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                            }`}
                                            title="Kelola Riwayat Pembetulan"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                            <span>{pembetulanCount}</span>
                                        </button>
                                    </DataTable.Td>

                                    <DataTable.Td className="text-center">
                                        <button
                                            type="button"
                                            onClick={() => handleOpenUraian(item)}
                                            className={`inline-flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
                                                item.uraian
                                                    ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-100'
                                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                            }`}
                                            title={item.uraian ? `Uraian: ${item.uraian}` : 'Tambah Uraian'}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                    </DataTable.Td>

                                    <DataTable.Td className="text-center">
                                        <div className="flex items-center justify-center gap-1.5">
                                            <button
                                                type="button"
                                                onClick={() => handleOpenEdit(item)}
                                                className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
                                                title="Edit Laporan"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(item)}
                                                className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 transition-colors"
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
                        <DataTable.Empty
                            colSpan={12}
                            message={hasActiveFilters ? 'Tidak ada data Laporan Masa yang cocok dengan filter.' : 'Belum ada data Laporan Masa. Klik "Tambah Laporan" untuk mulai mencatat.'}
                        />
                    )}
                </DataTable.Tbody>
            </DataTable>

            {/* Modals */}
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
        </AuthenticatedLayout>
    );
}
