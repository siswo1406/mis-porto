import React from 'react';
import Modal from '@/Components/Modal';

export default function DialogModal({
    isOpen,
    onClose,
    maxWidth = 'full',
    title,
    description,
    icon,
    iconBgClass = 'bg-blue-100 dark:bg-blue-900/50',
    iconTextClass = 'text-blue-600 dark:text-blue-400',
    children,
    footer,
    onSubmit,
    scrollableContent = true,
}) {
    const ContentWrapper = onSubmit ? 'form' : 'div';
    
    return (
        <Modal show={isOpen} onClose={onClose} maxWidth={maxWidth}>
            <div className="bg-white dark:bg-slate-900 overflow-hidden shadow-xl sm:rounded-lg flex flex-col h-[85vh]">
                {/* Header */}
                <div className="bg-white dark:bg-slate-900 px-6 py-4 border-b border-slate-100 dark:border-slate-800 transition-colors shrink-0">
                    <div className="sm:flex sm:items-start">
                        {icon && (
                            <div className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 ${iconBgClass}`}>
                                <div className={`h-6 w-6 ${iconTextClass}`}>
                                    {icon}
                                </div>
                            </div>
                        )}
                        <div className={`mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left ${!icon ? 'sm:ml-0 w-full' : ''}`}>
                            <h3 className="text-xl font-bold leading-6 text-slate-800 dark:text-slate-100">
                                {title}
                            </h3>
                            {description && (
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Body & Footer wrapped in Form if onSubmit is provided */}
                <ContentWrapper 
                    onSubmit={onSubmit} 
                    className="flex flex-col flex-1 overflow-hidden"
                >
                    <div className={`bg-slate-50 dark:bg-slate-900/50 flex-1 p-6 ${scrollableContent ? 'overflow-y-auto' : ''}`}>
                        {children}
                    </div>

                    {footer && (
                        <div className="bg-white dark:bg-slate-900 px-6 py-4 flex items-center justify-end gap-3 rounded-b-lg border-t border-slate-100 dark:border-slate-800 transition-colors shrink-0">
                            {footer}
                        </div>
                    )}
                </ContentWrapper>
            </div>
        </Modal>
    );
}
