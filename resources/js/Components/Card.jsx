import React from 'react';

export default function Card({ children, className = '', hoverEffect = false, ...props }) {
    const hoverClasses = hoverEffect ? 'hover:shadow-md transition-shadow duration-300' : 'transition-colors duration-200';
    
    return (
        <div 
            className={`bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden ${hoverClasses} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

Card.Header = function CardHeader({ children, className = '', hasBorder = true, ...props }) {
    const borderClass = hasBorder ? 'border-b border-slate-100 dark:border-slate-800/50' : '';
    return (
        <div className={`p-5 flex items-center gap-4 ${borderClass} ${className}`} {...props}>
            {children}
        </div>
    );
};

Card.Body = function CardBody({ children, className = '', noPadding = false, ...props }) {
    const paddingClass = noPadding ? '' : 'p-6';
    return (
        <div className={`${paddingClass} ${className}`} {...props}>
            {children}
        </div>
    );
};
