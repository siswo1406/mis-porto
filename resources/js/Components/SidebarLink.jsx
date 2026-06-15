import { Link } from '@inertiajs/react';

export default function SidebarLink({ href, children, active = false }) {
    return (
        <Link
            href={href}
            className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                active 
                    ? 'bg-blue-600/10 text-blue-400' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
        >
            {children}
        </Link>
    );
}
