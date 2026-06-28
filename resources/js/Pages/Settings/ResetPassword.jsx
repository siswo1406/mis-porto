import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import PageHeader from '@/Components/PageHeader';
import Swal from 'sweetalert2';

export default function ResetPassword({ accounts }) {
    
    const handleReset = (acc) => {
        if (!['mis', 'erp', 'zimbra'].includes(acc.app_key)) {
            Swal.fire({
                icon: 'info',
                title: 'Belum Didukung',
                text: `Fitur otomatisasi untuk ${acc.name} belum didukung di versi ini.`,
                confirmButtonColor: '#3b82f6',
                background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
                color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#000000',
            });
            return;
        }

        Swal.fire({
            title: `Reset Sandi ${acc.name}`,
            html: `
                <div class="text-sm text-slate-500 dark:text-slate-400 mb-2 text-left">
                    Silakan pastikan Nama Pengguna / Akun Anda benar:
                </div>
                <input type="text" id="swal-username" class="swal2-input !w-[90%] !text-sm !mt-0 mb-4" value="${acc.username}" placeholder="Nama Pengguna">
                <div class="text-sm text-slate-500 dark:text-slate-400 mb-2 text-left">
                    Masukkan kata sandi baru: <br/>
                    <small>Minimal 8 karakter, mengandung huruf besar, huruf kecil, angka, dan karakter khusus (!@#$%^&*).</small>
                </div>
                <input type="password" id="swal-input1" class="swal2-input !w-[90%] !text-sm !mt-0" placeholder="Kata Sandi Baru" autocomplete="new-password">
                <input type="password" id="swal-input2" class="swal2-input !w-[90%] !text-sm" placeholder="Konfirmasi Kata Sandi" autocomplete="new-password">
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Reset Sekarang',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#d97706',
            showLoaderOnConfirm: true,
            background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
            color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#000000',
            allowOutsideClick: () => !Swal.isLoading(),
            preConfirm: () => {
                const username = document.getElementById('swal-username').value;
                const password = document.getElementById('swal-input1').value;
                const confirmPassword = document.getElementById('swal-input2').value;

                if (!username) {
                    Swal.showValidationMessage('Nama pengguna tidak boleh kosong');
                    return false;
                }
                if (!password || !confirmPassword) {
                    Swal.showValidationMessage('Semua kolom kata sandi harus diisi');
                    return false;
                }
                if (password !== confirmPassword) {
                    Swal.showValidationMessage('Kata sandi tidak cocok');
                    return false;
                }
                
                const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
                if (password.length < 8 || !regex.test(password)) {
                    Swal.showValidationMessage('Format kata sandi tidak memenuhi syarat keamanan');
                    return false;
                }

                return new Promise((resolve, reject) => {
                    router.post(route('settings.password.reset.submit'), {
                        target_app: acc.app_key,
                        username: username,
                        new_password: password
                    }, {
                        preserveScroll: true,
                        onSuccess: (page) => {
                            resolve(page);
                        },
                        onError: (errors) => {
                            Swal.showValidationMessage(errors.new_password || errors.target_app || 'Terjadi kesalahan pada validasi.');
                            resolve(false);
                        }
                    });
                });
            }
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const page = result.value;
                const successMsg = page.props.flash?.success;
                const errorMsg = page.props.flash?.error;
                
                if (successMsg) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil!',
                        text: successMsg,
                        background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
                        color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#000000',
                    });
                } else if (errorMsg) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal!',
                        text: errorMsg,
                        background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
                        color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#000000',
                    });
                }
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <PageHeader 
                    title="Reset Kata Sandi" 
                    breadcrumbs={[
                        { label: 'Pengaturan', url: null },
                        { label: 'Reset Kata Sandi', url: null }
                    ]}
                />
            }
        >
            <Head title="Reset Kata Sandi" />

            <div className="mb-6">
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                    Kelola kata sandi untuk berbagai aplikasi yang terhubung dengan akun Anda.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accounts.map((acc, index) => (
                    <div key={index} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col hover:border-amber-300 dark:hover:border-amber-700 transition-colors">
                        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
                            <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                                {acc.name.toUpperCase()}
                            </h4>
                        </div>
                        
                        <div className="p-4 flex-1 space-y-3">
                            <div>
                                <div className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase mb-1">Tautan Akses</div>
                                <a href={acc.link} target="_blank" rel="noreferrer" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline break-all">
                                    {acc.link}
                                </a>
                            </div>
                            <div>
                                <div className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase mb-1">Nama Pengguna</div>
                                <div className="text-sm font-medium text-slate-800 dark:text-slate-200 break-all">
                                    {acc.username}
                                </div>
                            </div>
                        </div>

                        <div className="p-3 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 mt-auto">
                            <button 
                                onClick={() => handleReset(acc)}
                                className="w-full flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-900/50 border border-amber-200 dark:border-amber-800/60 rounded-lg transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                                Reset Kata Sandi
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {accounts.length === 0 && (
                <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 border-dashed">
                    <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-100">Tidak ada aplikasi</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Anda belum diberikan akses ke aplikasi manapun.</p>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
