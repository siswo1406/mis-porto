import { useState } from 'react';

export default function SidebarDropdown({ title, icon, children, active = false, isFolded = false, onExpand }) {
    const [isOpen, setIsOpen] = useState(active);

    const handleClick = () => {
        if (isFolded && onExpand) {
            onExpand();
            setIsOpen(true);
        } else {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div className={`mb-1 ${isFolded ? 'group relative' : ''}`}>
            <button
                onClick={handleClick}
                className="w-full flex items-center justify-between py-3 px-4 text-sm font-medium rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white group-hover:bg-slate-800 group-hover:text-white transition-all duration-300"
            >
                <div className="flex items-center min-w-0">
                    {icon && (
                        <div className="shrink-0 flex items-center justify-center w-6 h-6">
                            {icon}
                        </div>
                    )}
                    <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${isFolded ? 'max-w-0 opacity-0 ml-0' : 'max-w-[180px] opacity-100 ml-3'}`}>
                        {title}
                    </span>
                </div>
                <div className={`shrink-0 overflow-hidden transition-all duration-300 ease-in-out ${isFolded ? 'max-w-0 opacity-0' : 'max-w-[24px] opacity-100'}`}>
                    <svg
                        className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>
            
            {/* Submenu items */}
            {isFolded ? (
                <div className="absolute left-full top-0 hidden group-hover:block z-50 w-[13rem] pl-2">
                    <div className="rounded-xl bg-slate-900 p-2 shadow-2xl border border-white/10">
                        <div className="mb-2 px-3 pt-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                            {title}
                        </div>
                        <div className="space-y-1">
                            {children}
                        </div>
                    </div>
                </div>
            ) : (
                <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                        <div className="mt-1 space-y-1 pl-11 pr-3">
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
