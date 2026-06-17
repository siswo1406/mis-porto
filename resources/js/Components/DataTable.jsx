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
