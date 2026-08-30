import React from 'react';

export default function Tabs({ tabs, activeTab, onChange, className = '' }) {
    return (
        <div className={`flex items-center space-x-1 p-1 bg-slate-100 dark:bg-slate-800/50 rounded-xl w-fit ${className}`}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                
                return (
                    <button
                        key={tab.id}
                        onClick={() => onChange(tab.id)}
                        className={`
                            relative flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ease-out focus:outline-none
                            ${isActive 
                                ? 'text-blue-700 dark:text-blue-400 bg-white dark:bg-slate-700 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10' 
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                            }
                        `}
                    >
                        {tab.icon && (
                            <span className={`transition-colors duration-300 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}>
                                {tab.icon}
                            </span>
                        )}
                        <span>{tab.label}</span>
                        
                        {tab.badge !== undefined && (
                            <span className={`
                                flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full ml-1
                                ${isActive 
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' 
                                    : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                                }
                            `}>
                                {tab.badge}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
