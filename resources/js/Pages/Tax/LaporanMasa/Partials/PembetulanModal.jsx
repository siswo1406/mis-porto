import { useForm, router } from '@inertiajs/react';
import { useState, useRef } from 'react';
import DialogModal from '@/Components/DialogModal';
import Swal from 'sweetalert2';

export default function PembetulanModal({ isOpen, onClose, laporan = null }) {
    if (!isOpen || !laporan) return null;

    const fileInputRef = useRef(null);
    const isPPh4Ayat2 = laporan.jenis_pajak === 'PPh Pasal 4 Ayat 2' || laporan.jenis_pajak === 'PPh 4 (2)';

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        keterangan: '',
        tanggal_bayar: '',
        tanggal_lapor: '',
        nop: '',
        nominal: '',
        nilai_sewa: '',
        pajak_10_persen: '',
        bukti_bayar: null,
    });

    const formatCurrency = (val) => {
        if (!val) return '-';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(val);
    };

    const handleNilaiSewaChange = (val) => {
        const num = parseFloat(val) || 0;
        setData(prev => ({
            ...prev,
            nilai_sewa: val,
            pajak_10_persen: val ? Math.round(num * 0.1) : ''
        }));
    };

    const handleAddPembetulan = (e) => {
        e.preventDefault();
        post(route('tax.laporan-masa.pembetulan.store', laporan.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                clearErrors();
                if (fileInputRef.current) fileInputRef.current.value = '';
            }
        });
    };

    const handleDeletePembetulan = (pembetulan) => {
        Swal.fire({
            title: 'Hapus Pembetulan?',
            text: `Yakin ingin menghapus ${pembetulan.keterangan || 'data pembetulan ini'}?`,
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
                router.delete(route('tax.laporan-masa.pembetulan.destroy', pembetulan.id), {
                    preserveScroll: true
                });
            }
        });
    };

    const closeModal = () => {
        reset();
        clearErrors();
        if (fileInputRef.current) fileInputRef.current.value = '';
        onClose();
    };

    const PembetulanIcon = (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );

    const ModalFooter = (
        <button
            type="button"
            onClick={closeModal}
            className="inline-flex w-full justify-center rounded-lg bg-white dark:bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-900 dark:text-slate-200 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 sm:w-auto transition-colors"
        >
            Tutup
        </button>
    );

    return (
        <DialogModal
            isOpen={isOpen}
            onClose={closeModal}
            maxWidth="2xl"
            title={`Riwayat Pembetulan: ${laporan.jenis_pajak}`}
            description={`${laporan.ap} • Periode Bulan ${laporan.bulan} / Tahun ${laporan.tahun}`}
            icon={PembetulanIcon}
            iconBgClass="bg-indigo-100 dark:bg-indigo-900/50"
            iconTextClass="text-indigo-600 dark:text-indigo-400"
            footer={ModalFooter}
        >
            <div className="space-y-6">
                {/* Riwayat Pembetulan List */}
                <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        Daftar Riwayat Pembetulan ({laporan.pembetulans?.length || 0})
                    </h4>

                    {(!laporan.pembetulans || laporan.pembetulans.length === 0) ? (
                        <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-4 text-center border border-slate-200/60 dark:border-slate-700/60">
                            <p className="text-xs text-slate-500 dark:text-slate-400">Belum ada data pembetulan untuk laporan ini.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700/60">
                            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                                <thead className="bg-slate-50 dark:bg-slate-800/70 uppercase font-semibold text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700">
                                    <tr>
                                        <th className="px-3 py-2.5">Keterangan</th>
                                        <th className="px-3 py-2.5">Tgl Bayar</th>
                                        <th className="px-3 py-2.5">Tgl Lapor</th>
                                        <th className="px-3 py-2.5">NOP</th>
                                        <th className="px-3 py-2.5 text-right">Nominal</th>
                                        <th className="px-3 py-2.5 text-center">Bukti</th>
                                        <th className="px-3 py-2.5 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60 bg-white dark:bg-slate-900/40">
                                    {laporan.pembetulans.map((p) => (
                                        <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="px-3 py-2.5 font-medium text-slate-900 dark:text-slate-100">{p.keterangan}</td>
                                            <td className="px-3 py-2.5">{p.tanggal_bayar || '-'}</td>
                                            <td className="px-3 py-2.5">{p.tanggal_lapor || '-'}</td>
                                            <td className="px-3 py-2.5 font-mono text-[11px]">{p.nop || '-'}</td>
                                            <td className="px-3 py-2.5 text-right font-medium text-slate-800 dark:text-slate-200">
                                                {isPPh4Ayat2 ? formatCurrency(p.pajak_10_persen) : formatCurrency(p.nominal)}
                                            </td>
                                            <td className="px-3 py-2.5 text-center">
                                                {p.bukti_bayar ? (
                                                    <a
                                                        href={`/storage/${p.bukti_bayar}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                                        </svg>
                                                    </a>
                                                ) : '-'}
                                            </td>
                                            <td className="px-3 py-2.5 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeletePembetulan(p)}
                                                    className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                                                    title="Hapus Pembetulan"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Form Tambah Pembetulan */}
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/60">
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Tambah Pembetulan Baru
                    </h4>

                    <form onSubmit={handleAddPembetulan} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 [&_label]:block [&_label]:text-xs [&_label]:font-medium [&_label]:text-slate-700 dark:[&_label]:text-slate-300 [&_input]:mt-1 [&_input]:block [&_input]:w-full [&_input]:rounded-lg [&_input]:border-slate-300 dark:[&_input]:border-slate-700 [&_input]:bg-white dark:[&_input]:bg-slate-800 [&_input]:text-slate-900 dark:[&_input]:text-slate-100 [&_input]:shadow-sm focus:[&_input]:border-blue-500 focus:[&_input]:ring-blue-500 text-xs">
                        <div className="sm:col-span-2">
                            <label>Keterangan Pembetulan *</label>
                            <input
                                type="text"
                                value={data.keterangan}
                                onChange={e => setData('keterangan', e.target.value)}
                                placeholder="Cth: Pembetulan 1 / Koreksi Lebih Bayar"
                                required
                            />
                            {errors.keterangan && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.keterangan}</p>}
                        </div>

                        <div>
                            <label>Tanggal Bayar</label>
                            <input
                                type="date"
                                value={data.tanggal_bayar}
                                onChange={e => setData('tanggal_bayar', e.target.value)}
                            />
                            {errors.tanggal_bayar && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.tanggal_bayar}</p>}
                        </div>

                        <div>
                            <label>Tanggal Lapor</label>
                            <input
                                type="date"
                                value={data.tanggal_lapor}
                                onChange={e => setData('tanggal_lapor', e.target.value)}
                            />
                            {errors.tanggal_lapor && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.tanggal_lapor}</p>}
                        </div>

                        <div>
                            <label>NOP / Billing</label>
                            <input
                                type="text"
                                value={data.nop}
                                onChange={e => setData('nop', e.target.value)}
                                placeholder="Cth: 1234567890"
                            />
                            {errors.nop && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.nop}</p>}
                        </div>

                        {!isPPh4Ayat2 ? (
                            <div>
                                <label>Nominal Pembetulan (Rp)</label>
                                <input
                                    type="number"
                                    step="any"
                                    value={data.nominal}
                                    onChange={e => setData('nominal', e.target.value)}
                                    placeholder="Cth: 1750000"
                                />
                                {errors.nominal && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.nominal}</p>}
                            </div>
                        ) : (
                            <>
                                <div>
                                    <label>Nilai Sewa (Rp)</label>
                                    <input
                                        type="number"
                                        step="any"
                                        value={data.nilai_sewa}
                                        onChange={e => handleNilaiSewaChange(e.target.value)}
                                        placeholder="Cth: 10000000"
                                    />
                                </div>
                                <div>
                                    <label>Pajak 10% (Rp)</label>
                                    <input
                                        type="number"
                                        step="any"
                                        value={data.pajak_10_persen}
                                        onChange={e => setData('pajak_10_persen', e.target.value)}
                                        placeholder="Pajak 10%"
                                    />
                                </div>
                            </>
                        )}

                        <div className="sm:col-span-2">
                            <label>Upload Bukti Bayar / SPT Pembetulan</label>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={e => setData('bukti_bayar', e.target.files[0] || null)}
                                className="file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-[11px] file:font-semibold file:bg-blue-50 dark:file:bg-blue-900/30 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 cursor-pointer"
                            />
                            {errors.bukti_bayar && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.bukti_bayar}</p>}
                        </div>

                        <div className="sm:col-span-2 flex justify-end mt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm disabled:opacity-50 transition-colors"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                {processing ? 'Menyimpan...' : 'Simpan Pembetulan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DialogModal>
    );
}
