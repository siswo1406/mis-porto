import React, { useEffect, useRef } from 'react';
import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function AddSopModal({ isOpen, onClose }) {
    const fileInputRef = useRef();

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        no_sop: '',
        nama: '',
        tanggal: '',
        file: null,
        attachments: []
    });

    useEffect(() => {
        if (!isOpen) {
            reset();
            clearErrors();
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    }, [isOpen]);

    const submit = (e) => {
        e.preventDefault();
        post(route('qa.sop.store'), {
            onSuccess: () => {
                onClose();
            },
        });
    };

    const addAttachment = () => {
        setData('attachments', [...data.attachments, { nama: '', file: null, link: '' }]);
    };

    const removeAttachment = (index) => {
        const newAttachments = [...data.attachments];
        newAttachments.splice(index, 1);
        setData('attachments', newAttachments);
    };

    const handleAttachmentChange = (index, field, value) => {
        const newAttachments = [...data.attachments];
        newAttachments[index][field] = value;
        setData('attachments', newAttachments);
    };

    return (
        <Modal show={isOpen} onClose={onClose} maxWidth="4xl">
            <div className="bg-white dark:bg-slate-900 overflow-hidden shadow-xl sm:rounded-lg">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                        Tambah SOP Baru
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Buat SOP baru beserta lampiran pendukungnya.
                    </p>
                </div>

                <form onSubmit={submit} className="flex flex-col h-[75vh]">
                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                        {/* Section SOP Utama */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2">
                                Dokumen Utama
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="no_sop" value="Nomor SOP" className="text-slate-700 dark:text-slate-300 font-semibold" />
                                    <TextInput
                                        id="no_sop"
                                        type="text"
                                        name="no_sop"
                                        value={data.no_sop}
                                        className="mt-1 block w-full bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
                                        onChange={(e) => setData('no_sop', e.target.value)}
                                        required
                                        placeholder="Contoh: SOP-HR-001"
                                    />
                                    <InputError message={errors.no_sop} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="tanggal" value="Tanggal SOP" className="text-slate-700 dark:text-slate-300 font-semibold" />
                                    <TextInput
                                        id="tanggal"
                                        type="date"
                                        name="tanggal"
                                        value={data.tanggal}
                                        className="mt-1 block w-full bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
                                        onChange={(e) => setData('tanggal', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.tanggal} className="mt-2" />
                                </div>
                            </div>

                            <div>
                                <InputLabel htmlFor="nama" value="Judul SOP" className="text-slate-700 dark:text-slate-300 font-semibold" />
                                <TextInput
                                    id="nama"
                                    type="text"
                                    name="nama"
                                    value={data.nama}
                                    className="mt-1 block w-full bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
                                    onChange={(e) => setData('nama', e.target.value)}
                                    required
                                    placeholder="Masukkan judul SOP..."
                                />
                                <InputError message={errors.nama} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="file" value="Unggah File SOP (Wajib PDF)" className="text-slate-700 dark:text-slate-300 font-semibold" />
                                <input
                                    id="file"
                                    type="file"
                                    name="file"
                                    ref={fileInputRef}
                                    accept=".pdf"
                                    onChange={(e) => setData('file', e.target.files[0])}
                                    className="mt-1 block w-full text-sm text-slate-500 dark:text-slate-400
                                        file:mr-4 file:py-2.5 file:px-4
                                        file:rounded-lg file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-blue-50 file:text-blue-700
                                        dark:file:bg-blue-900/30 dark:file:text-blue-400
                                        hover:file:bg-blue-100 dark:hover:file:bg-blue-900/50
                                        cursor-pointer border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800"
                                    required
                                />
                                <InputError message={errors.file} className="mt-2" />
                            </div>
                        </div>

                        {/* Section Lampiran Pendukung */}
                        <div className="space-y-4 pt-4">
                            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">
                                    Lampiran Pendukung
                                </h3>
                                <button
                                    type="button"
                                    onClick={addAttachment}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-sm font-bold rounded-lg transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                    Tambah Lampiran
                                </button>
                            </div>

                            {data.attachments.length === 0 ? (
                                <div className="text-center py-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">Belum ada lampiran pendukung ditambahkan.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {data.attachments.map((att, index) => (
                                        <div key={index} className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl relative group">
                                            <button
                                                type="button"
                                                onClick={() => removeAttachment(index)}
                                                className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                                title="Hapus Lampiran"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                            </button>
                                            
                                            <div className="grid grid-cols-1 gap-4 pr-8">
                                                <div>
                                                    <InputLabel value={`Nama Lampiran ${index + 1}`} className="text-slate-700 dark:text-slate-300 font-semibold" />
                                                    <TextInput
                                                        type="text"
                                                        value={att.nama}
                                                        onChange={(e) => handleAttachmentChange(index, 'nama', e.target.value)}
                                                        className="mt-1 block w-full bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 rounded-lg text-sm"
                                                        placeholder="Contoh: Form Serah Terima"
                                                        required
                                                    />
                                                    <InputError message={errors[`attachments.${index}.nama`]} className="mt-1" />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <InputLabel value="Upload File (Opsional)" className="text-slate-700 dark:text-slate-300 font-semibold" />
                                                        <input
                                                            type="file"
                                                            onChange={(e) => handleAttachmentChange(index, 'file', e.target.files[0])}
                                                            className="mt-1 block w-full text-xs text-slate-500 dark:text-slate-400
                                                                file:mr-3 file:py-1.5 file:px-3
                                                                file:rounded-md file:border-0
                                                                file:text-xs file:font-semibold
                                                                file:bg-indigo-50 file:text-indigo-700
                                                                dark:file:bg-indigo-900/30 dark:file:text-indigo-400
                                                                hover:file:bg-indigo-100 dark:hover:file:bg-indigo-900/50
                                                                cursor-pointer border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900"
                                                        />
                                                        <InputError message={errors[`attachments.${index}.file`]} className="mt-1" />
                                                    </div>
                                                    <div>
                                                        <InputLabel value="URL Link (Opsional)" className="text-slate-700 dark:text-slate-300 font-semibold" />
                                                        <TextInput
                                                            type="url"
                                                            value={att.link}
                                                            onChange={(e) => handleAttachmentChange(index, 'link', e.target.value)}
                                                            className="mt-1 block w-full bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 rounded-lg text-sm"
                                                            placeholder="https://docs.google.com/..."
                                                        />
                                                        <InputError message={errors[`attachments.${index}.link`]} className="mt-1" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer / Actions */}
                    <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
                        <SecondaryButton onClick={onClose} disabled={processing}>
                            Batal
                        </SecondaryButton>
                        <PrimaryButton disabled={processing} className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500">
                            {processing ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Menyimpan...
                                </span>
                            ) : 'Simpan SOP'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
