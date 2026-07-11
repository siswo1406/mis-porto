import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import DialogModal from '@/Components/DialogModal';

export default function EditUserModal({ isOpen, onClose, user, regions = [], units = [], jabatans = [] }) {
    const { data, setData, put, processing, errors, reset, clearErrors, transform } = useForm({
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
        confirm_password: '',
    });

    useEffect(() => {
        if (user && isOpen) {
            let parsedMultiunit = '';
            if (user.multiunit) {
                try {
                    parsedMultiunit = JSON.parse(user.multiunit).join(', ');
                } catch (e) {
                    parsedMultiunit = '';
                }
            }
            
            setData({
                name: user.name || '',
                nik: user.nik || '',
                email: user.email || '',
                nowa: user.nowa || '',
                roles: user.roles || '',
                region: user.region || '',
                unit: user.unit || '',
                multiunit: parsedMultiunit,
                jabatan: user.jabatan || '',
                password: '',
                confirm_password: '',
            });
        }
    }, [user, isOpen]);

    transform((data) => ({
        ...data,
        multiunit: typeof data.multiunit === 'string' && data.multiunit.trim() !== '' 
            ? data.multiunit.split(',').map(item => item.trim()) 
            : null,
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (data.nik.indexOf(' ') >= 0) {
            Swal.fire({ icon: 'error', title: 'Format NIK Salah', text: 'NIK tidak boleh mengandung spasi!' });
            return;
        }

        if (data.password || data.confirm_password) {
            if (data.password !== data.confirm_password) {
                Swal.fire({ icon: 'error', title: 'Validasi Gagal', text: 'Password dan Konfirmasi Password tidak sesuai!' });
                return;
            }
            const hasUpperCase = /[A-Z]/.test(data.password);
            const hasLowerCase = /[a-z]/.test(data.password);
            const hasNumbers = /\d/.test(data.password);
            const hasSpecialChar = /[!@#\$%\^&\*]/.test(data.password);

            if (data.password.length < 8 || !hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
                Swal.fire({
                    icon: 'error',
                    title: 'Password Lemah',
                    html: 'Password harus minimal 8 karakter dan mengandung:<br>- Huruf Besar<br>- Huruf Kecil<br>- Angka<br>- Karakter Khusus (!@#$%^&*)'
                });
                return;
            }
        }

        put(route('master.users.update', user.id), {
            onSuccess: () => {
                closeModal();
                Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Data pengguna berhasil diperbarui!', timer: 1500, showConfirmButton: false });
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

    if (!isOpen || !user) return null;

    const rolesList = ['admin', 'pusat', 'region', 'sr', 'user'];
    const filteredUnits = data.region ? units.filter(u => u.region === data.region) : units;

    const EditIcon = (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
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
                className="inline-flex w-full justify-center rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 disabled:opacity-50 sm:w-auto transition-colors"
            >
                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
        </>
    );

    return (
        <DialogModal
            isOpen={isOpen}
            onClose={closeModal}
            maxWidth="full"
            title="Edit Pengguna"
            description="Ubah data formulir di bawah ini untuk mengedit data pengguna."
            icon={EditIcon}
            iconBgClass="bg-orange-100 dark:bg-orange-900/50"
            iconTextClass="text-orange-600 dark:text-orange-400"
            onSubmit={handleSubmit}
            footer={ModalFooter}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 [&_label]:block [&_label]:text-sm [&_label]:font-medium [&_label]:text-slate-700 dark:[&_label]:text-slate-300 [&_input]:mt-1 [&_input]:block [&_input]:w-full [&_input]:rounded-lg [&_input]:border-slate-300 dark:[&_input]:border-slate-700 [&_input]:bg-white dark:[&_input]:bg-slate-800 [&_input]:text-slate-900 dark:[&_input]:text-slate-100 [&_input]:shadow-sm focus:[&_input]:border-orange-500 focus:[&_input]:ring-orange-500 sm:[&_input]:text-sm transition-colors [&_select]:mt-1 [&_select]:block [&_select]:w-full [&_select]:rounded-lg [&_select]:border-slate-300 dark:[&_select]:border-slate-700 [&_select]:bg-white dark:[&_select]:bg-slate-800 [&_select]:text-slate-900 dark:[&_select]:text-slate-100 [&_select]:shadow-sm focus:[&_select]:border-orange-500 focus:[&_select]:ring-orange-500 sm:[&_select]:text-sm">
                
                <div className="md:col-span-2">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2 mb-2">Identitas Pengguna</h4>
                </div>

                <div>
                    <label>Nama Lengkap *</label>
                    <input type="text" value={data.name} onChange={e => setData('name', e.target.value.toUpperCase())}
                        placeholder="Cth: AHMAD BUDI" required />
                    {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                </div>

                <div>
                    <label>Username (NIK) *</label>
                    <input type="text" value={data.nik} onChange={e => setData('nik', e.target.value)}
                        placeholder="Cth: 1234.MTK.01" required />
                    {errors.nik && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.nik}</p>}
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

                <div className="md:col-span-2 mt-4">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2 mb-2">Lokasi & Hak Akses</h4>
                </div>

                <div>
                    <label>Region *</label>
                    <select value={data.region} onChange={e => setData('region', e.target.value)} required>
                        <option value="">-- Pilih Region --</option>
                        <option value="MJL">PT MUSTIKA JAYA LESTARI (MJL)</option>
                        {regions.map(r => <option key={r.koderegion} value={r.koderegion}>{r.namaregion} ({r.koderegion})</option>)}
                    </select>
                </div>

                <div>
                    <label>Unit Utama *</label>
                    <select value={data.unit} onChange={e => setData('unit', e.target.value)} required
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
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Pilih unit tambahan jika user butuh banyak akses unit.</p>
                </div>

                <div className="md:col-span-2 mt-4">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2 mb-2">Keamanan Akun</h4>
                </div>

                <div>
                    <label>Password Baru</label>
                    <input type="password" value={data.password} onChange={e => setData('password', e.target.value)}
                        placeholder="Kosongkan jika tidak ingin diubah" />
                </div>
                <div>
                    <label>Konfirmasi Password Baru</label>
                    <input type="password" value={data.confirm_password} onChange={e => setData('confirm_password', e.target.value)}
                        placeholder="Ulangi password baru" />
                </div>
            </div>
        </DialogModal>
    );
}
