import { useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import DialogModal from '@/Components/DialogModal';

export default function AddEditStpModal({ isOpen, onClose, stp = null, regions = [], taxTypes = [] }) {
    const isEdit = Boolean(stp);
    const fileInputRef = useRef(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        ap: '',
        jenis_pajak: '',
        bulan: '',
        tahun: new Date().getFullYear(),
        nomor_stp: '',
        tanggal_bayar: '',
        tanggal_stp: '',
        nominal: '',
        uraian: '',
        bukti_bayar: null,
    });

    useEffect(() => {
        if (stp) {
            setData({
                ap: stp.ap || '',
                jenis_pajak: stp.jenis_pajak || '',
                bulan: stp.bulan ? String(stp.bulan).padStart(2, '0') : '',
                tahun: stp.tahun || new Date().getFullYear(),
                nomor_stp: stp.nomor_stp || '',
                tanggal_bayar: stp.tanggal_bayar || '',
                tanggal_stp: stp.tanggal_stp || '',
                nominal: stp.nominal || '',
                uraian: stp.uraian || '',
                bukti_bayar: null,
            });
        } else {
            setData({
                ap: '',
                jenis_pajak: '',
                bulan: '',
                tahun: new Date().getFullYear(),
                nomor_stp: '',
                tanggal_bayar: '',
                tanggal_stp: '',
                nominal: '',
                uraian: '',
                bukti_bayar: null,
            });
        }
    }, [stp, isOpen]);

    const months = [
        { value: '01', label: 'Januari' },
        { value: '02', label: 'Februari' },
        { value: '03', label: 'Maret' },
        { value: '04', label: 'April' },
        { value: '05', label: 'Mei' },
        { value: '06', label: 'Juni' },
        { value: '07', label: 'Juli' },
        { value: '08', label: 'Agustus' },
        { value: '09', label: 'September' },
        { value: '10', label: 'Oktober' },
        { value: '11', label: 'November' },
        { value: '12', label: 'Desember' },
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 6 }, (_, i) => currentYear - 4 + i).reverse();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            post(route('tax.stp.update', stp.id), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('tax.stp.store'), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        }
    };

    const closeModal = () => {
        reset();
        clearErrors();
        if (fileInputRef.current) fileInputRef.current.value = '';
        onClose();
    };

    const StpIcon = (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
    );

    const ModalFooter = (
        <>
            <button
                type="button"
                onClick={closeModal}
                disabled={processing}
                className="inline-flex w-full justify-center rounded-lg bg-white dark:bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-900 dark:text-slate-200 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 sm:w-auto transition-colors"
            >
                Batal
            </button>
            <button
                type="submit"
                disabled={processing}
                className="inline-flex w-full justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:opacity-50 sm:w-auto transition-colors"
            >
                {processing ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah STP'}
            </button>
        </>
    );

    return (
        <DialogModal
            isOpen={isOpen}
            onClose={closeModal}
            maxWidth="2xl"
            title={isEdit ? 'Edit Surat Tagihan Pajak (STP)' : 'Tambah Surat Tagihan Pajak (STP)'}
            description={isEdit ? 'Perbarui rincian surat tagihan atau sanksi administrasi pajak.' : 'Catat dokumen surat tagihan pajak (STP) atau denda bunga perpajakan.'}
            icon={StpIcon}
            iconBgClass="bg-rose-100 dark:bg-rose-900/50"
            iconTextClass="text-rose-600 dark:text-rose-400"
            onSubmit={handleSubmit}
            footer={ModalFooter}
        >
            <div className="space-y-4">
                {/* Entitas AP & Jenis Pajak */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                            Anak Perusahaan <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={data.ap}
                            onChange={e => setData('ap', e.target.value)}
                            className="w-full text-sm rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                            required
                        >
                            <option value="">Pilih Perusahaan</option>
                            <option value="PT MUSTIKA JAYA LESTARI">PT MUSTIKA JAYA LESTARI (HO)</option>
                            {regions.map(r => (
                                <option key={r.koderegion} value={r.namaregion}>
                                    {r.namaregion}
                                </option>
                            ))}
                        </select>
                        {errors.ap && <p className="mt-1 text-xs text-red-500">{errors.ap}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                            Jenis Pajak <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={data.jenis_pajak}
                            onChange={e => setData('jenis_pajak', e.target.value)}
                            className="w-full text-sm rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                            required
                        >
                            <option value="">Pilih Jenis Pajak</option>
                            {taxTypes.map(t => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                        {errors.jenis_pajak && <p className="mt-1 text-xs text-red-500">{errors.jenis_pajak}</p>}
                    </div>
                </div>

                {/* Masa & Tahun Pajak */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                            Bulan Masa STP <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={data.bulan}
                            onChange={e => setData('bulan', e.target.value)}
                            className="w-full text-sm rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                            required
                        >
                            <option value="">Pilih Bulan</option>
                            {months.map(m => (
                                <option key={m.value} value={m.value}>{m.label}</option>
                            ))}
                        </select>
                        {errors.bulan && <p className="mt-1 text-xs text-red-500">{errors.bulan}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                            Tahun Pajak <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={data.tahun}
                            onChange={e => setData('tahun', parseInt(e.target.value))}
                            className="w-full text-sm rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                            required
                        >
                            {years.map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                        {errors.tahun && <p className="mt-1 text-xs text-red-500">{errors.tahun}</p>}
                    </div>
                </div>

                {/* Nomor STP & Nominal */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                            Nomor STP
                        </label>
                        <input
                            type="text"
                            value={data.nomor_stp}
                            onChange={e => setData('nomor_stp', e.target.value)}
                            placeholder="Contoh: 00012/101/26/501/000"
                            className="w-full text-sm rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500 shadow-sm font-mono"
                        />
                        {errors.nomor_stp && <p className="mt-1 text-xs text-red-500">{errors.nomor_stp}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                            Nominal Tagihan STP (Rp) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            step="any"
                            value={data.nominal}
                            onChange={e => setData('nominal', e.target.value)}
                            placeholder="Contoh: 1500000"
                            className="w-full text-sm rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                            required
                        />
                        {errors.nominal && <p className="mt-1 text-xs text-red-500">{errors.nominal}</p>}
                    </div>
                </div>

                {/* Tanggal STP & Tanggal Bayar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                            Tanggal Terbit STP
                        </label>
                        <input
                            type="date"
                            value={data.tanggal_stp}
                            onChange={e => setData('tanggal_stp', e.target.value)}
                            className="w-full text-sm rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        />
                        {errors.tanggal_stp && <p className="mt-1 text-xs text-red-500">{errors.tanggal_stp}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                            Tanggal Bayar
                        </label>
                        <input
                            type="date"
                            value={data.tanggal_bayar}
                            onChange={e => setData('tanggal_bayar', e.target.value)}
                            className="w-full text-sm rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        />
                        {errors.tanggal_bayar && <p className="mt-1 text-xs text-red-500">{errors.tanggal_bayar}</p>}
                    </div>
                </div>

                {/* Catatan / Uraian STP */}
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                        Uraian / Sanksi Administrasi
                    </label>
                    <textarea
                        rows="2"
                        value={data.uraian}
                        onChange={e => setData('uraian', e.target.value)}
                        placeholder="Contoh: Sanksi bunga Pasal 19 Ayat (1) KUP atas keterlambatan setor PPh 21..."
                        className="w-full text-sm rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                    ></textarea>
                    {errors.uraian && <p className="mt-1 text-xs text-red-500">{errors.uraian}</p>}
                </div>

                {/* Upload Bukti */}
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                        Bukti Bayar / Dokumen STP (PDF, JPG, PNG - Maks 5MB)
                    </label>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={e => setData('bukti_bayar', e.target.files[0] || null)}
                        className="w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 dark:file:bg-blue-900/40 dark:file:text-blue-300 hover:file:bg-blue-100 cursor-pointer"
                    />
                    {errors.bukti_bayar && <p className="mt-1 text-xs text-red-500">{errors.bukti_bayar}</p>}
                </div>
            </div>
        </DialogModal>
    );
}
