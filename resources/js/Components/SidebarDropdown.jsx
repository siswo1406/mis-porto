import { useState } from 'react';

export default function SidebarDropdown({ title, icon, children, active = false }) {
    const [isOpen, setIsOpen] = useState(active);

    return (
        <div className="mb-1">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
                <div className="flex items-center">
                    {icon && <span className="mr-3">{icon}</span>}
                    {title}
                </div>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="mt-1 space-y-1 pl-10 pr-3">
                    {children}
                </div>
            )}
        </div>
    );
}
