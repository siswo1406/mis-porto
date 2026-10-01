import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import DialogModal from '@/Components/DialogModal';

export default function UraianStpModal({ isOpen, onClose, stp = null }) {
    if (!isOpen || !stp) return null;

    const { data, setData, patch, processing, errors, reset, clearErrors } = useForm({
        uraian: '',
    });

    useEffect(() => {
        if (stp) {
            setData({
                uraian: stp.uraian || '',
            });
        }
    }, [stp, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('tax.stp.uraian', stp.id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const closeModal = () => {
        reset();
        clearErrors();
        onClose();
    };

    const NoteIcon = (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
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
                {processing ? 'Menyimpan...' : 'Simpan Uraian STP'}
            </button>
        </>
    );

    return (
        <DialogModal
            isOpen={isOpen}
            onClose={closeModal}
            maxWidth="lg"
            title={`Uraian Sanksi STP: ${stp.jenis_pajak}`}
            description={`${stp.ap} • Bulan ${stp.bulan} / ${stp.tahun} ${stp.nomor_stp ? `• No: ${stp.nomor_stp}` : ''}`}
            icon={NoteIcon}
            iconBgClass="bg-rose-100 dark:bg-rose-900/50"
            iconTextClass="text-rose-600 dark:text-rose-400"
            onSubmit={handleSubmit}
            footer={ModalFooter}
        >
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Catatan Sanksi / Rincian Tagihan STP
                </label>
                <textarea
                    rows="6"
                    value={data.uraian}
                    onChange={e => setData('uraian', e.target.value)}
                    placeholder="Tulis rincian sanksi administrasi atau keterangan STP ini..."
                    className="block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm transition-colors"
                ></textarea>
                {errors.uraian && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.uraian}</p>}
            </div>
        </DialogModal>
    );
}
