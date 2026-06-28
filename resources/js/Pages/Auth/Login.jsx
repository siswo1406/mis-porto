import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import ThemeToggle from '@/Components/ThemeToggle';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nik: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
            <Head title="Masuk - MIS Portal" />

            {/* Theme Toggle Top Right */}
            <div className="absolute top-6 right-6 z-50">
                <ThemeToggle className="bg-white/80 dark:bg-slate-800/80 px-3 py-2 rounded-full shadow-lg backdrop-blur-sm border border-slate-200 dark:border-slate-700" />
            </div>

            {/* Dynamic Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }}></div>
            
            <div className="w-full px-4 sm:px-8 py-10 relative z-10 flex flex-col items-center">
                {/* Logo & Title Area */}
                <div className="text-center mb-10 w-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/30 mb-6 transform transition hover:scale-105 duration-300">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                        </svg>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white tracking-tight whitespace-nowrap">Management Information System</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">Sistem Pelaporan Terpadu</p>
                </div>

                {/* Glassmorphism Card */}
                <div className="w-full max-w-md bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl shadow-xl dark:shadow-2xl p-8 relative overflow-hidden transition-colors">
                    {/* Subtle top reflection */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent"></div>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-emerald-400 bg-emerald-400/10 p-3 rounded-lg border border-emerald-400/20 text-center">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div className="group">
                            <InputLabel htmlFor="nik" value="Nama Pengguna (NIK)" className="text-slate-600 dark:text-slate-300 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors" />
                            <TextInput
                                id="nik"
                                type="text"
                                name="nik"
                                value={data.nik}
                                className="mt-1 block w-full bg-white dark:bg-slate-800/50 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-blue-500 focus:ring focus:ring-blue-500/20 transition-all rounded-lg shadow-sm dark:shadow-none"
                                autoComplete="username"
                                isFocused={true}
                                placeholder="contoh: 1978.MTK.1222"
                                onChange={(e) => setData('nik', e.target.value)}
                            />
                            <InputError message={errors.nik} className="mt-2 text-red-400" />
                        </div>

                        <div className="group">
                            <InputLabel htmlFor="password" value="Kata Sandi" className="text-slate-600 dark:text-slate-300 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors" />
                            <div className="relative mt-1">
                                <TextInput
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    className="block w-full bg-white dark:bg-slate-800/50 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-blue-500 focus:ring focus:ring-blue-500/20 transition-all rounded-lg shadow-sm dark:shadow-none pr-10"
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-200 transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <InputError message={errors.password} className="mt-2 text-red-400" />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer group">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 checked:bg-blue-600 focus:ring-blue-500/30 rounded"
                                />
                                <span className="ms-2 text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                                    Tetap masuk
                                </span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                    Lupa kata sandi?
                                </Link>
                            )}
                        </div>

                        <PrimaryButton 
                            className="w-full justify-center py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border-none shadow-lg shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5" 
                            disabled={processing}
                        >
                            {processing ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : 'Masuk'}
                        </PrimaryButton>
                    </form>
                </div>
                
                <div className="mt-8 text-center text-xs text-slate-500">
                    Didukung oleh LIRT Stack & Laravel Octane
                </div>
            </div>
        </div>
    );
}
