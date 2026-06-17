import { Link } from '@inertiajs/react';

export default function Pagination({ links, from, to, total }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className="px-6 py-4 border-t border-slate-100 dark:bg-slate-800 dark:border-slate-700 flex items-center justify-between">
            <span className="text-sm text-slate-500 dark:text-slate-200">
                Menampilkan <span className="font-semibold text-slate-800 dark:text-slate-200">{from || 0}</span> - <span className="font-semibold text-slate-800 dark:text-slate-200">{to || 0}</span> dari <span className="font-semibold text-slate-800 dark:text-slate-200">{total}</span> data
            </span>
            <div className="flex items-center gap-1">
                {links.map((link, idx) => (
                    <Link
                        key={idx}
                        href={link.url || '#'}
                        className={`px-3 py-1 text-sm rounded-md transition-colors ${link.active ? 'bg-blue-600 text-white font-medium' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </div>
    );
}
