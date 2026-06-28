import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PageHeader from '@/Components/PageHeader';
import Swal from 'sweetalert2';

export default function Generate({ target_user, accounts }) {
    
    const handleCopyAll = () => {
        let textToCopy = `Pendaftaran Akun - ${target_user.name}\n\n`;
        accounts.forEach(acc => {
            textToCopy += `Aplikasi: ${acc.name}\n`;
            textToCopy += `Tautan: ${acc.link}\n`;
            textToCopy += `Username: ${acc.username}\n`;
            textToCopy += `Password: ${acc.password} ${acc.note}\n`;
            textToCopy += `------------------\n`;
        });

        navigator.clipboard.writeText(textToCopy).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Disalin!',
                text: 'Semua kredensial berhasil disalin ke clipboard.',
                timer: 1500,
                showConfirmButton: false,
                background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
                color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#000000',
            });
        });
    };

    const handleCopyOne = (acc) => {
        let textToCopy = `Aplikasi: ${acc.name}\nTautan: ${acc.link}\nUsername: ${acc.username}\nPassword: ${acc.password} ${acc.note}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
                color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#000000',
            });
            Toast.fire({
                icon: 'success',
                title: `Kredensial ${acc.name} disalin`
            });
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Generate Kredensial - ${target_user.name}`} />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <PageHeader 
                    title="Generate Kredensial" 
                    subtitle="Manajemen akun dan password untuk berbagai aplikasi perusahaan."
                    icon={
                        <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                        </svg>
                    }
                />
                
                <div className="flex items-center gap-2">
                    <button onClick={handleCopyAll} className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                        Salin Semua
                    </button>
                    <Link href={route('master.users.index')} className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg transition-colors border border-slate-200 dark:border-slate-700">
                        Kembali
                    </Link>
                </div>
            </div>

            {/* User Banner */}
            <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        {target_user.name}
                        {target_user.roles && (
                            <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 rounded font-semibold uppercase">
                                {target_user.roles}
                            </span>
                        )}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-300 mt-1">
                        <span className="font-mono bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">{target_user.nik}</span>
                        {target_user.jabatan && (
                            <>
                                <span>•</span>
                                <span>{target_user.jabatan}</span>
                            </>
                        )}
                        {(target_user.unit || target_user.region) && (
                            <>
                                <span>•</span>
                                <span>{target_user.unit || target_user.region}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Applications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accounts.map((acc, index) => (
                    <div key={index} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
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
                            <div>
                                <div className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase mb-1">Kata Sandi</div>
                                <div className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                    {acc.password}
                                    {acc.note && <span className="ml-1 text-xs font-normal text-amber-600 dark:text-amber-500">{acc.note}</span>}
                                </div>
                            </div>
                        </div>

                        <div className="p-3 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 mt-auto">
                            <button 
                                onClick={() => Swal.fire('Info', 'Fungsi Aksi (Integrasi API) akan dibangun pada fase selanjutnya.', 'info')}
                                className="px-3 py-2 text-xs font-semibold text-blue-700 dark:text-white bg-blue-100 dark:bg-blue-600 hover:bg-blue-200 dark:hover:bg-blue-500 rounded transition-colors"
                            >
                                AKSI {acc.name.toUpperCase()}
                            </button>
                            <button 
                                onClick={() => handleCopyOne(acc)}
                                className="px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded shadow-sm transition-colors"
                            >
                                SALIN
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {accounts.length === 0 && (
                <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 border-dashed">
                    <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-100">Tidak ada aplikasi</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">User dengan jabatan ini tidak memiliki akses ke aplikasi manapun.</p>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
