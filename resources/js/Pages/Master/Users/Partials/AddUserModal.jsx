import { useForm } from '@inertiajs/react';
import { Fragment, useState, useEffect } from 'react';
import DialogModal from '@/Components/DialogModal';

export default function AddUserModal({ isOpen, onClose, regions = [], units = [], jabatans = [] }) {
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        nik: '',
        email: '',
        nowa: '',
        roles: '',
        region: '',
        unit: '',
        multiunit: '',
        jabatan: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const submitData = { ...data };
        if (typeof submitData.multiunit === 'string' && submitData.multiunit.trim() !== '') {
            submitData.multiunit = submitData.multiunit.split(',').map(item => item.trim());
        } else {
            submitData.multiunit = null;
        }

        post(route('master.users.store'), {
            data: submitData,
            onSuccess: () => {
                closeModal();
            },
        });
    };

    const closeModal = () => {
        reset();
        clearErrors();
        onClose();
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                closeModal();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    if (!isOpen) return null;

    const rolesList = ['admin', 'pusat', 'region', 'sr', 'user'];

    const filteredUnits = data.region ? units.filter(u => u.region === data.region) : units;

    const UserIcon = (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
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
                {processing ? 'Menyimpan...' : 'Simpan Data'}
            </button>
        </>
    );

    return (
        <DialogModal
            isOpen={isOpen}
            onClose={closeModal}
            maxWidth="full"
            title="Tambah Pengguna Baru"
            description="Isi data form di bawah ini untuk mendaftarkan pengguna baru ke sistem."
            icon={UserIcon}
            iconBgClass="bg-blue-100 dark:bg-blue-900/50"
            iconTextClass="text-blue-600 dark:text-blue-400"
            onSubmit={handleSubmit}
            footer={ModalFooter}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 [&_label]:block [&_label]:text-sm [&_label]:font-medium [&_label]:text-slate-700 dark:[&_label]:text-slate-300 [&_input]:mt-1 [&_input]:block [&_input]:w-full [&_input]:rounded-lg [&_input]:border-slate-300 dark:[&_input]:border-slate-700 [&_input]:bg-white dark:[&_input]:bg-slate-800 [&_input]:text-slate-900 dark:[&_input]:text-slate-100 [&_input]:shadow-sm focus:[&_input]:border-blue-500 focus:[&_input]:ring-blue-500 sm:[&_input]:text-sm transition-colors [&_select]:mt-1 [&_select]:block [&_select]:w-full [&_select]:rounded-lg [&_select]:border-slate-300 dark:[&_select]:border-slate-700 [&_select]:bg-white dark:[&_select]:bg-slate-800 [&_select]:text-slate-900 dark:[&_select]:text-slate-100 [&_select]:shadow-sm focus:[&_select]:border-blue-500 focus:[&_select]:ring-blue-500 sm:[&_select]:text-sm">
                <div className="md:col-span-2">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2 mb-2">Identitas Pengguna</h4>
                </div>

                <div>
                    <label>Nama Lengkap *</label>
                    <input type="text" value={data.name} onChange={e => setData('name', e.target.value)}
                        placeholder="Cth: Ahmad Budi" required />
                    {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                </div>

                <div>
                    <label>Username (NIK) *</label>
                    <input type="text" value={data.nik} onChange={e => setData('nik', e.target.value)}
                        placeholder="Cth: 1234.MTK.01" required />
                    {errors.nik && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.nik}</p>}
                </div>

                <div>
                    <label>Email</label>
                    <input type="email" value={data.email} onChange={e => setData('email', e.target.value)}
                        placeholder="opsional@ptmjl.co.id" />
                    {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
                </div>

                <div>
                    <label>No. WhatsApp</label>
                    <input type="text" value={data.nowa} onChange={e => setData('nowa', e.target.value)}
                        placeholder="Cth: 08123456789" />
                </div>

                <div>
                    <label>Jabatan</label>
                    <select value={data.jabatan} onChange={e => setData('jabatan', e.target.value)}>
                        <option value="">-- Pilih Jabatan --</option>
                        {jabatans.map((j, index) => <option key={index} value={j.nama}>{j.nama}</option>)}
                    </select>
                </div>

                <div>
                    <label>Roles (Hak Akses) *</label>
                    <select value={data.roles} onChange={e => setData('roles', e.target.value)} required>
                        <option value="">-- Pilih Role --</option>
                        {rolesList.map(r => <option key={r} value={r}>{r.toUpperCase()}</option>)}
                    </select>
                </div>

                <div className="md:col-span-2 mt-4">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2 mb-2">Lokasi & Hak Akses</h4>
                </div>

                <div>
                    <label>Region</label>
                    <select value={data.region} onChange={e => setData('region', e.target.value)}>
                        <option value="">-- Pilih Region --</option>
                        <option value="MJL">PT MUSTIKA JAYA LESTARI (MJL)</option>
                        {regions.map(r => <option key={r.koderegion} value={r.koderegion}>{r.namaregion} ({r.koderegion})</option>)}
                    </select>
                </div>

                <div>
                    <label>Unit Utama</label>
                    <select value={data.unit} onChange={e => setData('unit', e.target.value)}
                        disabled={!data.region && units.length > 0}>
                        <option value="">-- Pilih Unit --</option>
                        {data.region === 'MJL' && <option value="HO">HEAD OFFICE (HO)</option>}
                        {filteredUnits.map(u => <option key={u.kodeunit} value={u.kodeunit}>{u.namaunit} ({u.kodeunit})</option>)}
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label>Multi Unit</label>
                    <input type="text" value={data.multiunit} onChange={e => setData('multiunit', e.target.value.toUpperCase())}
                        placeholder="Pemisah koma. Cth: HO, SLG, GKD" />
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Isi jika pengguna memiliki lebih dari 1 unit tanggung jawab.</p>
                </div>

                <div className="md:col-span-2 mt-4">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2 mb-2">Keamanan Akun</h4>
                </div>

                <div className="md:col-span-2">
                    <label>Password</label>
                    <input type="password" value={data.password} onChange={e => setData('password', e.target.value)}
                        placeholder="Kosongkan untuk menggunakan password default (Mustika@Tahun)" />
                </div>
            </div>
        </DialogModal>
    );
}
