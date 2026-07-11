import React from 'react';

export default function DataTable({ children, pagination }) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-200">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-600 dark:text-slate-300">
                    {children}
                </table>
            </div>

            {/* Render Pagination if passed */}
            {pagination}
        </div>
    );
}

DataTable.Thead = function({ children, className = '' }) {
    return (
        <thead className={`text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700/60 transition-colors ${className}`}>
            <tr>{children}</tr>
        </thead>
    );
};

DataTable.Th = function({ children, className = '', sortable = false, ...props }) {
    return (
        <th scope="col" className={`px-6 py-4 font-semibold tracking-wider text-left align-middle ${sortable ? 'group cursor-pointer hover:text-slate-700 dark:hover:text-slate-200 transition-colors' : ''} ${className}`} {...props}>
            {children}
        </th>
    );
};

DataTable.Tbody = function({ children, className = '' }) {
    return (
        <tbody className={`divide-y divide-slate-100 dark:divide-slate-800 transition-colors ${className}`}>
            {children}
        </tbody>
    );
};

DataTable.Tr = function({ children, className = '', ...props }) {
    return (
        <tr className={`hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors duration-200 group ${className}`} {...props}>
            {children}
        </tr>
    );
};

DataTable.Td = function({ children, className = '', ...props }) {
    return (
        <td className={`px-6 py-4 whitespace-nowrap ${className}`} {...props}>
            {children}
        </td>
    );
};

DataTable.Empty = function({ colSpan, message = "Data belum tersedia", icon }) {
    return (
        <tr>
            <td colSpan={colSpan} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                {icon || (
                    <svg className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                )}
                {message}
            </td>
        </tr>
    );
};
