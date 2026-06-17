import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-slate-800 dark:text-slate-100">
                    Beranda
                </h2>
            }
        >
            <Head title="Beranda" />

            <div className="overflow-hidden bg-white dark:bg-slate-900 shadow-sm sm:rounded-2xl border border-slate-200 dark:border-slate-800 transition-colors duration-200">
                <div className="p-6 text-slate-900 dark:text-slate-200">
                    Anda berhasil masuk ke dalam sistem!
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
