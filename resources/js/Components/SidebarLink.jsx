import { Link } from '@inertiajs/react';

export default function SidebarLink({ href, children, active = false, isFolded = false, icon = null }) {
    return (
        <Link
            href={href}
            title={isFolded ? (typeof children === 'string' ? children : '') : ''}
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                active 
                    ? 'bg-blue-600/10 text-blue-400' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
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
        </Link>
    );
}
