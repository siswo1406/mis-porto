import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import SidebarLink from '@/Components/SidebarLink';
import SidebarDropdown from '@/Components/SidebarDropdown';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false); // For mobile overlay
    const [isFolded, setIsFolded] = useState(true); // For desktop folded state

    const handleExpandSidebar = () => {
        setIsFolded(false);
    };

    return (
        <div className="min-h-screen flex bg-slate-50 font-sans">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 bg-slate-900 shadow-2xl transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col ${sidebarOpen ? 'translate-x-0 w-80' : '-translate-x-full'} ${isFolded ? 'lg:w-[88px]' : 'lg:w-80'}`}>
                
                {/* Logo Area */}
                <Link href={route('dashboard')} className="flex items-center h-20 px-6 bg-slate-950/50 border-b border-white/5 shrink-0 transition-all duration-300 hover:bg-slate-950">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                        </svg>
                    </div>
                    <span className={`overflow-hidden whitespace-nowrap font-bold text-xl text-white tracking-tight transition-all duration-300 ease-in-out ${isFolded ? 'max-w-0 opacity-0 ml-0' : 'max-w-[200px] opacity-100 ml-3'}`}>
                        MIS Portal
                    </span>
                </Link>

                {/* Navigation Menu */}
                <div className={`flex-1 py-6 px-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20 ${isFolded ? 'overflow-visible' : 'overflow-y-auto overflow-x-hidden'}`}>
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
                            Dashboard
                        </SidebarLink>

                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isFolded ? 'max-h-0 opacity-0 mt-0' : 'max-h-[40px] opacity-100 mt-4'}`}>
                            <p className="px-4 pb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Modul</p>
                        </div>
                        {isFolded && <div className="h-4"></div>}

                        <SidebarDropdown 
                            title="Operation" 
                            isFolded={isFolded}
                            onExpand={handleExpandSidebar}
                            active={route().current('operation.*')}
                            icon={<svg className="w-6 h-6 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                        >
                            <SidebarLink href="#" isFolded={false}>Produksi</SidebarLink>
                            <SidebarLink href={route('operation.doc.index')} active={route().current('operation.doc.index')} isFolded={false}>DOC</SidebarLink>
                            <SidebarLink href="#" isFolded={false}>Pakan & OVK</SidebarLink>
                            <SidebarLink href="#" isFolded={false}>Penjualan</SidebarLink>
                        </SidebarDropdown>

                        <SidebarDropdown 
                            title="Human Capital" 
                            isFolded={isFolded}
                            onExpand={handleExpandSidebar}
                            icon={<svg className="w-6 h-6 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                        >
                            <SidebarLink href="#" isFolded={false}>Human Resources</SidebarLink>
                            <SidebarLink href="#" isFolded={false}>Learning And Development</SidebarLink>
                            <SidebarLink href="#" isFolded={false}>Internal Audit</SidebarLink>
                        </SidebarDropdown>

                        <SidebarDropdown 
                            title="TAF" 
                            isFolded={isFolded}
                            onExpand={handleExpandSidebar}
                            icon={<svg className="w-6 h-6 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        >
                            <SidebarLink href="#" isFolded={false}>Accounting</SidebarLink>
                            <SidebarLink href="#" isFolded={false}>Finance</SidebarLink>
                            <SidebarLink href="#" isFolded={false}>Tax</SidebarLink>
                        </SidebarDropdown>

                        <SidebarDropdown 
                            title="Corp Com" 
                            isFolded={isFolded}
                            onExpand={handleExpandSidebar}
                            icon={<svg className="w-6 h-6 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
                        >
                            <SidebarLink href="#" isFolded={false}>Monitoring & Reporting</SidebarLink>
                            <SidebarLink href="#" isFolded={false}>Quality Assurance</SidebarLink>
                            <SidebarLink href="#" isFolded={false}>SRM</SidebarLink>
                            <SidebarLink href="#" isFolded={false}>MIS</SidebarLink>
                        </SidebarDropdown>
                        
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isFolded ? 'max-h-0 opacity-0 mt-0' : 'max-h-[40px] opacity-100 mt-4'}`}>
                            <p className="px-4 pb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">System</p>
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
                            Settings
                        </SidebarLink>
                    </nav>
                </div>

                {/* Fold Toggle Button */}
                <div className="px-3 py-2 shrink-0 border-t border-white/5 bg-slate-950/20">
                    <button 
                        onClick={() => setIsFolded(!isFolded)}
                        className={`w-full flex items-center p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-300 ${isFolded ? 'justify-center' : 'justify-end'}`}
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
                            Collapse
                        </span>
                    </button>
                </div>

                {/* User Profile Area */}
                <div className="bg-slate-950 p-4 border-t border-white/5 shrink-0 flex items-center h-16">
                    <div className="flex items-center w-full">
                        <div className="w-10 h-10 shrink-0 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold shadow-inner">
                            {user.name.charAt(0)}
                        </div>
                        <div className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${isFolded ? 'max-w-0 opacity-0 ml-0' : 'max-w-[180px] opacity-100 ml-3'}`}>
                            <p className="text-sm font-medium text-white truncate" title={user.name}>{user.name}</p>
                            <p className="text-xs text-slate-400 truncate">{user.nik}</p>
                        </div>
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isFolded ? 'max-w-0 opacity-0 ml-0' : 'max-w-[40px] opacity-100 ml-auto'}`}>
                            <Link 
                                href={route('logout')} 
                                method="post" 
                                as="button"
                                className="p-2 shrink-0 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors block"
                                title="Log out"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header Navbar */}
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-sm">
                    <div className="flex items-center">
                        <button 
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 -ml-2 mr-4 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        {header && (
                            <div className="text-xl font-bold text-slate-800 tracking-tight leading-tight">
                                {header}
                            </div>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                            Online
                        </span>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
