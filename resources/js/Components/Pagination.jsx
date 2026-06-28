import { Link } from '@inertiajs/react';

export default function Pagination({ links, from, to, total, perPage, setPerPage }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
            <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                {setPerPage ? (
                    <div className="flex items-center gap-2">
                        <span>Menampilkan</span>
                        <div className="flex items-center bg-white dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700/60 shadow-sm">
                            <select 
                                value={perPage} 
                                onChange={(e) => setPerPage(e.target.value)}
                                className="py-1 pl-2 pr-7 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-transparent border-none rounded-md focus:ring-0 cursor-pointer transition-colors"
                            >
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                        <span>data per halaman</span>
                        <span className="text-slate-400 dark:text-slate-500 ml-1">
                            (baris <span className="font-semibold text-slate-700 dark:text-slate-300">{from || 0}</span> - <span className="font-semibold text-slate-700 dark:text-slate-300">{to || 0}</span> dari <span className="font-semibold text-slate-700 dark:text-slate-300">{total}</span>)
                        </span>
                    </div>
                ) : (
                    <span>
                        Menampilkan <span className="font-semibold text-slate-800 dark:text-slate-200">{from || 0}</span> - <span className="font-semibold text-slate-800 dark:text-slate-200">{to || 0}</span> dari <span className="font-semibold text-slate-800 dark:text-slate-200">{total}</span> data
                    </span>
                )}
            </div>
            
            <div className="flex items-center gap-1">
                {links.map((link, idx) => (
                    <Link
                        key={idx}
                        href={link.url || '#'}
                        className={`px-3 py-1 text-sm rounded-md transition-colors ${link.active ? 'bg-blue-600 text-white font-medium shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </div>
    );
}
