import { Link } from '@inertiajs/react';

export default function SidebarLink({ href, children, active = false, isFolded = false, icon = null }) {
    return (
        <Link
            href={href}
            className={`group relative flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                active 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
        >
            {icon && (
                <div className="shrink-0 flex items-center justify-center w-6 h-6">
                    {icon}
                </div>
            )}
            <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${isFolded ? 'max-w-0 opacity-0 ml-0' : 'max-w-[220px] opacity-100 ml-3'}`}>
                {children}
            </span>

            {/* Tooltip for Folded State */}
            {isFolded && (
                <div className="absolute left-full top-0 hidden group-hover:block z-50 w-[13rem] pl-2">
                    <div className="rounded-xl bg-white dark:bg-slate-900 p-2 shadow-2xl border border-slate-200 dark:border-white/10">
                        <div className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white transition-all duration-200">
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </Link>
    );
}
