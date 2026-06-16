import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ logdocs = [] }) {
    // Fungsi untuk memfilter data dari database berdasarkan ID kategori
    const getMenusByCategory = (categoryId) => {
        return logdocs
            .filter(doc => doc.kategori === categoryId)
            .map(doc => ({
                id: doc.id,
                name: doc.name,
                href: doc.link,
                views: doc.dilihat,
            }));
    };

    // Struktur Kategori (UI/Icon dihardcode untuk estetika, tapi isinya dinamis)
    const menuCategories = [
        {
            id: 1,
            title: 'Performance DOC',
            icon: (
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
            ),
            color: 'bg-blue-50',
            menus: getMenusByCategory(1)
        },
        {
            id: 2,
            title: 'Evaluasi',
            icon: (
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
            ),
            color: 'bg-emerald-50',
            menus: getMenusByCategory(2)
        },
        {
            id: 3,
            title: 'Harga',
            icon: (
                <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            ),
            color: 'bg-amber-50',
            menus: getMenusByCategory(3)
        },
        {
            id: 4,
            title: 'Administrasi',
            icon: (
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>
            ),
            color: 'bg-purple-50',
            menus: getMenusByCategory(4)
        }
    ];

    return (
        <AuthenticatedLayout header="Logistik DOC (Day Old Chick)">
            <Head title="DOC - Operation" />

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Data Logistik DOC</h2>
                    <p className="text-sm text-slate-500 mt-1">Pilih menu navigasi di bawah untuk mengelola operasional DOC.</p>
                </div>
                {/* Tombol MASTER (hanya contoh visual, logic roles bisa ditambahkan nanti) */}
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    MASTER
                </button>
            </div>

            {/* Grid Layout Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {menuCategories.map((category) => (
                    <div key={category.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                        {/* Card Header */}
                        <div className="p-5 border-b border-slate-100 flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${category.color}`}>
                                {category.icon}
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wide">
                                {category.title}
                            </h3>
                        </div>
                        
                        {/* Menu Items List */}
                        <div className="p-2">
                            <ul className="space-y-1">
                                {category.menus.map((menu, idx) => (
                                    <li key={idx}>
                                        <Link 
                                            href={menu.href} 
                                            className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all duration-200"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors"></div>
                                                <span className="text-slate-600 group-hover:text-slate-900 font-medium transition-colors">
                                                    {menu.name}
                                                </span>
                                            </div>
                                            
                                            <div className="flex items-center gap-4">
                                                {/* Views count badge */}
                                                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 group-hover:text-slate-500 transition-colors">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                                    {menu.views}
                                                </div>
                                                
                                                {/* Action Buttons */}
                                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    <button className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title="Edit">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                                    </button>
                                                    <button className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors bg-slate-100" title="View Detail">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
