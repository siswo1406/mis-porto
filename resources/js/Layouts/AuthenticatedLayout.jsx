import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import SidebarLink from '@/Components/SidebarLink';
import SidebarDropdown from '@/Components/SidebarDropdown';
import { useTheme } from '@/Contexts/ThemeContext';
import ThemeToggle from '@/Components/ThemeToggle';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const { theme, toggleTheme } = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(false); // For mobile overlay
    const [isFolded, setIsFolded] = useState(true); // For desktop folded state

    const handleExpandSidebar = () => {
        setIsFolded(false);
    };

    return (
        <div className={`min-h-screen flex bg-slate-50 dark:bg-slate-900 font-sans transition-colors duration-200 ${theme}`}>
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col ${sidebarOpen ? 'translate-x-0 w-80' : '-translate-x-full'} ${isFolded ? 'lg:w-[88px]' : 'lg:w-80'}`}>
                
                {/* Logo Area */}
                <Link href={route('dashboard')} className="flex items-center h-20 px-6 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 shrink-0 transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-900">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                        </svg>
                    </div>
                    <span className={`overflow-hidden whitespace-nowrap font-bold text-xl text-slate-800 dark:text-white tracking-tight transition-all duration-300 ease-in-out ${isFolded ? 'max-w-0 opacity-0 ml-0' : 'max-w-[200px] opacity-100 ml-3'}`}>
                        MIS Portal
                    </span>
                </Link>

                {/* Navigation Menu */}
                <div className={`flex-1 py-6 px-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400 dark:hover:[&::-webkit-scrollbar-thumb]:bg-white/20 ${isFolded ? 'overflow-visible' : 'overflow-y-auto overflow-x-hidden'}`}>
                    <nav className="space-y-1">
                        <SidebarLink 
                            href={route('dashboard')} 
                            active={route().current('dashboard')}
                            isFolded={isFolded}
                            icon={
                                <svg className="w-6 h-6 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            }
                        >
                            Beranda
                        </SidebarLink>

                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isFolded ? 'max-h-0 opacity-0 my-0 border-transparent' : 'max-h-[40px] opacity-100 mt-6 pt-6 border-t border-slate-200 dark:border-white/10 mb-2'}`}>
                            <p className="px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Modul</p>
                        </div>
                        {isFolded && <div className="h-4"></div>}

                        <SidebarDropdown 
                            title="Operasional" 
                            isFolded={isFolded}
                            onExpand={handleExpandSidebar}
                            active={route().current('operation.*')}
                            icon={<svg className="w-6 h-6 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
                        >
                            <SidebarLink href="#" isFolded={false}>Produksi</SidebarLink>
                            <SidebarLink href={route('operation.doc.index')} active={route().current('operation.doc.index')} isFolded={false}>DOC</SidebarLink>
                            <SidebarLink href="#" isFolded={false}>Pakan & OVK</SidebarLink>
                            <SidebarLink href="#" isFolded={false}>Penjualan</SidebarLink>
                        </SidebarDropdown>

                        <SidebarDropdown 
                            title="SDM" 
                            isFolded={isFolded}
                            onExpand={handleExpandSidebar}
                            icon={<svg className="w-6 h-6 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                        >
                            <SidebarLink href="#" isFolded={false}>Personalia</SidebarLink>
                            <SidebarLink href="#" isFolded={false}>Pelatihan & Pengembangan</SidebarLink>
                            <SidebarLink href="#" isFolded={false}>Audit Internal</SidebarLink>
                        </SidebarDropdown>

                        <SidebarDropdown 
                            title="TAF" 
                            isFolded={isFolded}
                            onExpand={handleExpandSidebar}
                            icon={<svg className="w-6 h-6 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                        >
                            <SidebarLink href="#" isFolded={false}>Accounting</SidebarLink>
                            <SidebarLink href="#" isFolded={false}>Finance</SidebarLink>
                            <SidebarLink href="#" isFolded={false}>Tax</SidebarLink>
                        </SidebarDropdown>

                        <SidebarDropdown 
                            title="Corp Com" 
                            isFolded={isFolded}
                            onExpand={handleExpandSidebar}
                            icon={<svg className="w-6 h-6 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>}
                        >
                            <SidebarLink href="#" isFolded={false}>Monitoring & Reporting</SidebarLink>
                            <SidebarLink href="#" isFolded={false}>Quality Assurance</SidebarLink>
                            <SidebarLink href="#" isFolded={false}>SRM</SidebarLink>
                            <SidebarLink href="#" isFolded={false}>MIS</SidebarLink>
                        </SidebarDropdown>
                        
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isFolded ? 'max-h-0 opacity-0 my-0 border-transparent' : 'max-h-[40px] opacity-100 mt-6 pt-6 border-t border-slate-200 dark:border-white/10 mb-2'}`}>
                            <p className="px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Data Master</p>
                        </div>
                        {isFolded && <div className="h-4"></div>}

                        <SidebarDropdown 
                            title="Master" 
                            isFolded={isFolded}
                            onExpand={handleExpandSidebar}
                            active={route().current('master.*')}
                            icon={<svg className="w-6 h-6 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>}
                        >
                            <SidebarLink href={route('master.users.index')} active={route().current('master.users.index')} isFolded={false}>Pengguna</SidebarLink>
                        </SidebarDropdown>
                        
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isFolded ? 'max-h-0 opacity-0 my-0 border-transparent' : 'max-h-[40px] opacity-100 mt-6 pt-6 border-t border-slate-200 dark:border-white/10 mb-2'}`}>
                            <p className="px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Sistem</p>
                        </div>
                        {isFolded && <div className="h-4"></div>}
                        
                        <SidebarLink 
                            href="#"
                            isFolded={isFolded}
                            icon={
                                <svg className="w-6 h-6 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            }
                        >
                            Pengaturan
                        </SidebarLink>
                    </nav>
                </div>

                {/* Fold Toggle Button */}
                <div className="px-3 py-2 shrink-0 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-950/20">
                    <button 
                        onClick={() => setIsFolded(!isFolded)}
                        className={`w-full flex items-center p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-all duration-300 focus:outline-none focus:ring-0 ${isFolded ? 'justify-center' : 'justify-end'}`}
                        title={isFolded ? "Unfold Sidebar" : "Fold Sidebar"}
                    >
                        <svg 
                            className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isFolded ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                        <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out font-medium ${isFolded ? 'max-w-0 opacity-0 ml-0' : 'max-w-[100px] opacity-100 ml-2 mr-auto'}`}>
                            Tutup Sidebar
                        </span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header Navbar */}
                <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-sm transition-colors duration-200">
                    <div className="flex items-center">
                        <button 
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 -ml-2 mr-4 text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        {header && (
                            <div className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
                                {header}
                            </div>
                        )}
                    </div>
                    
                    <div className="flex items-center ms-6 gap-2">
                        <ThemeToggle className="mr-2" />

                        <div className="flex items-center">
                            <div className="w-8 h-8 mr-3 shrink-0 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-sm">
                                {user.name.charAt(0)}
                            </div>
                            <div className="flex flex-col text-left mr-4">
                                <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">{user.name}</span>
                                <span className="text-xs text-slate-400 -mt-0.5">{user.roles || 'Admin'}</span>
                            </div>
                        </div>
                        
                        <div className="h-6 border-l border-slate-200 mx-2"></div>
                        
                        <div className="relative group">
                            <Link 
                                href={route('logout')} 
                                method="post" 
                                as="button"
                                className="p-2 shrink-0 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </Link>
                            {/* Modern Tooltip */}
                            <div className="absolute right-0 top-full mt-2 px-3 py-1.5 bg-slate-800 text-white text-xs font-medium rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                                Keluar Aplikasi
                                <div className="absolute bottom-full right-3 w-0 h-0 border-x-[5px] border-x-transparent border-b-[5px] border-b-slate-800"></div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
                    <div className="w-full mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
