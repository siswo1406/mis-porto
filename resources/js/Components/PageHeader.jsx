import React from 'react';
import { Link } from '@inertiajs/react';

export default function PageHeader({ title, subtitle, icon, breadcrumbs }) {
    return (
        <div className="flex flex-col gap-3">
            {/* Breadcrumbs */}
            {breadcrumbs && breadcrumbs.length > 0 && (
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2">
                        <li className="inline-flex items-center">
                            <Link href={route('dashboard')} className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                                </svg>
                                Beranda
                            </Link>
                        </li>
                        {breadcrumbs.map((item, idx) => (
                            <li key={idx} aria-current={idx === breadcrumbs.length - 1 ? 'page' : undefined}>
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                    {item.url ? (
                                        <Link href={item.url} className="ml-1 text-sm font-medium text-slate-500 hover:text-blue-600 md:ml-2 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <span className="ml-1 text-sm font-medium text-slate-800 dark:text-slate-200 md:ml-2">
                                            {item.label}
                                        </span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ol>
                </nav>
            )}
            
            {/* Title Block */}
            <div className="flex items-center gap-3">
                {icon && (
                    <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-sm">
                        {icon}
                    </div>
                )}
                <div>
                    <h2 className="font-bold text-2xl text-slate-800 dark:text-slate-100 leading-tight">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
