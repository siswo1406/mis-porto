import React from 'react';

export default function PageActions({ 
    searchPlaceholder = "Cari...", 
    searchQuery = "",
    onSearchChange,
    actionLabel, 
    onAction, 
    actionIcon,
    children 
}) {
    return (
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-end gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Search Bar */}
                <div className="relative w-full sm:w-64">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    <input 
                        type="search" 
                        {...(onSearchChange 
                            ? { value: searchQuery, onChange: (e) => onSearchChange(e.target.value) } 
                            : { defaultValue: searchQuery }
                        )}
                        className="block w-full p-2 pl-10 text-sm text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-colors duration-200" 
                        placeholder={searchPlaceholder} 
                    />
                </div>
                
                {/* Custom Actions (Filters, etc) */}
                {children}

                {/* Primary Action Button */}
                {actionLabel && (
                    <button 
                        onClick={onAction}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap"
                    >
                        {actionIcon || (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                        )}
                        {actionLabel}
                    </button>
                )}
            </div>
        </div>
    );
}
