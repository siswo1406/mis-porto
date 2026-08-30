import { useForm, router } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import DialogModal from '@/Components/DialogModal';

export default function AddEditLaporanModal({ isOpen, onClose, laporan = null, regions = [], taxTypes = [] }) {
    const isEdit = Boolean(laporan);
    const fileInputRef = useRef(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        jenis_pajak: '',
        ap: '',
        bulan: '',
        tahun: '',
        tanggal_bayar: '',
        tanggal_lapor: '',
        nop: '',
        nominal: '',
        nilai_sewa: '',
        pajak_10_persen: '',
        uraian: '',
        bukti_bayar: null,
    });

    useEffect(() => {
        if (laporan) {
            setData({
                jenis_pajak: laporan.jenis_pajak || '',
                ap: laporan.ap || '',
                bulan: laporan.bulan ? String(laporan.bulan).padStart(2, '0') : '',
                tahun: laporan.tahun || '',
                tanggal_bayar: laporan.tanggal_bayar || '',
                tanggal_lapor: laporan.tanggal_lapor || '',
                nop: laporan.nop || '',
                nominal: laporan.nominal || '',
                nilai_sewa: laporan.nilai_sewa || '',
                pajak_10_persen: laporan.pajak_10_persen || '',
                uraian: laporan.uraian || '',
                bukti_bayar: null,
            });
        } else {
            setData({
                jenis_pajak: '',
                ap: '',
                bulan: '',
                tahun: '',
                tanggal_bayar: '',
                tanggal_lapor: '',
                nop: '',
                nominal: '',
                nilai_sewa: '',
                pajak_10_persen: '',
                uraian: '',
                bukti_bayar: null,
            });
        }
    }, [laporan, isOpen]);

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

    const handleNilaiSewaChange = (val) => {
        const num = parseFloat(val) || 0;
        setData(prev => ({
            ...prev,
            nilai_sewa: val,
            pajak_10_persen: val ? Math.round(num * 0.1) : ''
        }));
    };

    const closeModal = () => {
        reset();
        clearErrors();
        if (fileInputRef.current) fileInputRef.current.value = '';
        onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            // Use router.post with _method: 'put' for multipart form data support in Laravel
            router.post(route('tax.laporan-masa.update', laporan.id), {
                _method: 'put',
                ...data
            }, {
                onSuccess: () => {
                    closeModal();
                },
                preserveScroll: true,
            });
        } else {
            post(route('tax.laporan-masa.store'), {
                onSuccess: () => {
                    closeModal();
                },
                preserveScroll: true,
            });
        }
    };

    if (!isOpen) return null;

    const isPPh4Ayat2 = data.jenis_pajak === 'PPh Pasal 4 Ayat 2' || data.jenis_pajak === 'PPh 4 (2)';

    const TaxIcon = (
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
                {processing ? 'Menyimpan...' : isEdit ? 'Perbarui Laporan' : 'Simpan Laporan'}
            </button>
        </>
    );

    return (
        <DialogModal
            isOpen={isOpen}
            onClose={closeModal}
            maxWidth="full"
            title={isEdit ? 'Ubah Laporan Masa' : 'Tambah Laporan Masa Baru'}
            description={isEdit ? 'Perbarui data Laporan Masa di bawah ini.' : 'Isi form di bawah ini untuk mencatat Laporan Masa baru.'}
            icon={TaxIcon}
            iconBgClass="bg-blue-100 dark:bg-blue-900/50"
            iconTextClass="text-blue-600 dark:text-blue-400"
            onSubmit={handleSubmit}
            footer={ModalFooter}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 [&_label]:block [&_label]:text-sm [&_label]:font-medium [&_label]:text-slate-700 dark:[&_label]:text-slate-300 [&_input]:mt-1 [&_input]:block [&_input]:w-full [&_input]:rounded-lg [&_input]:border-slate-300 dark:[&_input]:border-slate-700 [&_input]:bg-white dark:[&_input]:bg-slate-800 [&_input]:text-slate-900 dark:[&_input]:text-slate-100 [&_input]:shadow-sm focus:[&_input]:border-blue-500 focus:[&_input]:ring-blue-500 sm:[&_input]:text-sm transition-colors [&_select]:mt-1 [&_select]:block [&_select]:w-full [&_select]:rounded-lg [&_select]:border-slate-300 dark:[&_select]:border-slate-700 [&_select]:bg-white dark:[&_select]:bg-slate-800 [&_select]:text-slate-900 dark:[&_select]:text-slate-100 [&_select]:shadow-sm focus:[&_select]:border-blue-500 focus:[&_select]:ring-blue-500 sm:[&_select]:text-sm [&_textarea]:mt-1 [&_textarea]:block [&_textarea]:w-full [&_textarea]:rounded-lg [&_textarea]:border-slate-300 dark:[&_textarea]:border-slate-700 [&_textarea]:bg-white dark:[&_textarea]:bg-slate-800 [&_textarea]:text-slate-900 dark:[&_textarea]:text-slate-100 [&_textarea]:shadow-sm focus:[&_textarea]:border-blue-500 focus:[&_textarea]:ring-blue-500 sm:[&_textarea]:text-sm">
                <div className="md:col-span-2">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2 mb-1">
                        Informasi Pajak & Perusahaan
                    </h4>
                </div>

                <div>
                    <label>Jenis Pajak *</label>
                    <select
                        value={data.jenis_pajak}
                        onChange={e => setData('jenis_pajak', e.target.value)}
                        required
                    >
                        <option value="">-- Pilih Jenis Pajak --</option>
                        {taxTypes.map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                    {errors.jenis_pajak && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.jenis_pajak}</p>}
                </div>

                <div>
                    <label>Anak Perusahaan (AP) *</label>
                    <select
                        value={data.ap}
                        onChange={e => setData('ap', e.target.value)}
                        required
                    >
                        <option value="">-- Pilih Anak Perusahaan --</option>
                        <option value="PT MUSTIKA JAYA LESTARI">PT MUSTIKA JAYA LESTARI (HO)</option>
                        {regions.map(r => (
                            <option key={r.koderegion} value={r.namaregion}>
                                {r.namaregion}
                            </option>
                        ))}
                    </select>
                    {errors.ap && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.ap}</p>}
                </div>

                <div>
                    <label>Bulan *</label>
                    <select
                        value={data.bulan}
                        onChange={e => setData('bulan', e.target.value)}
                        required
                    >
                        <option value="">-- Pilih Bulan --</option>
                        {months.map(m => (
                            <option key={m.value} value={m.value}>{m.label}</option>
                        ))}
                    </select>
                    {errors.bulan && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.bulan}</p>}
                </div>

                <div>
                    <label>Tahun *</label>
                    <input
                        type="number"
                        min="2000"
                        max="2099"
                        placeholder="Cth: 2026"
                        value={data.tahun}
                        onChange={e => setData('tahun', e.target.value ? parseInt(e.target.value) : '')}
                        required
                    />
                    {errors.tahun && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.tahun}</p>}
                </div>

                <div className="md:col-span-2 mt-2">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2 mb-1">
                        Realisasi Pembayaran & Pelaporan
                    </h4>
                </div>

                <div>
                    <label>Tanggal Bayar</label>
                    <input
                        type="date"
                        value={data.tanggal_bayar}
                        onChange={e => setData('tanggal_bayar', e.target.value)}
                    />
                    {errors.tanggal_bayar && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.tanggal_bayar}</p>}
                </div>

                <div>
                    <label>Tanggal Lapor</label>
                    <input
                        type="date"
                        value={data.tanggal_lapor}
                        onChange={e => setData('tanggal_lapor', e.target.value)}
                    />
                    {errors.tanggal_lapor && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.tanggal_lapor}</p>}
                </div>

                <div>
                    <label>NOP / Kode Billing</label>
                    <input
                        type="text"
                        value={data.nop}
                        onChange={e => setData('nop', e.target.value)}
                        placeholder="Cth: 123456789012345"
                    />
                    {errors.nop && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.nop}</p>}
                </div>

                {!isPPh4Ayat2 ? (
                    <div>
                        <label>Nominal Pajak (Rp)</label>
                        <input
                            type="number"
                            step="any"
                            value={data.nominal}
                            onChange={e => setData('nominal', e.target.value)}
                            placeholder="Cth: 1500000"
                        />
                        {errors.nominal && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.nominal}</p>}
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
                            {errors.nilai_sewa && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.nilai_sewa}</p>}
                        </div>
                        <div>
                            <label>Pajak 10% (Rp)</label>
                            <input
                                type="number"
                                step="any"
                                value={data.pajak_10_persen}
                                onChange={e => setData('pajak_10_persen', e.target.value)}
                                placeholder="Otomatis terhitung atau isi manual"
                            />
                            {errors.pajak_10_persen && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.pajak_10_persen}</p>}
                        </div>
                    </>
                )}

                <div className="md:col-span-2">
                    <label>Uraian / Keterangan Tambahan</label>
                    <textarea
                        rows="3"
                        value={data.uraian}
                        onChange={e => setData('uraian', e.target.value)}
                        placeholder="Tulis uraian atau catatan jika ada..."
                    ></textarea>
                    {errors.uraian && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.uraian}</p>}
                </div>

                <div className="md:col-span-2">
                    <label>Upload Bukti Bayar / SPT (PDF / Gambar, maks. 5MB)</label>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={e => setData('bukti_bayar', e.target.files[0] || null)}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 dark:file:bg-blue-900/30 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 cursor-pointer"
                    />
                    {isEdit && laporan?.bukti_bayar && !data.bukti_bayar && (
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            File saat ini: <a href={`/storage/${laporan.bukti_bayar}`} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Lihat Bukti Bayar</a> (Upload file baru jika ingin mengganti).
                        </p>
                    )}
                    {errors.bukti_bayar && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.bukti_bayar}</p>}
                </div>
            </div>
        </DialogModal>
    );
}
