import React from 'react';
import Modal from '@/Components/Modal';

export default function ViewSopModal({ isOpen, onClose, sop }) {
    if (!sop) return null;

    const mainFileUrl = route('qa.sop.file', { type: 'main', id: sop.id });

    return (
        <Modal show={isOpen} onClose={onClose} maxWidth="5xl">
            <div className="flex flex-col h-[85vh] bg-slate-50 dark:bg-slate-900 rounded-lg overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm z-10 shrink-0">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{sop.nama}</h2>
                        <p className="text-sm font-mono text-slate-500 dark:text-slate-400 mt-0.5">No SOP: {sop.no_sop}</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors focus:outline-none"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex flex-col flex-1 overflow-y-auto bg-slate-100 dark:bg-slate-950">
                    
                    {/* Top Section: Main SOP Viewer */}
                    <div className="h-[65vh] shrink-0 bg-slate-100 dark:bg-slate-950 flex flex-col relative shadow-sm">
                        <iframe 
                            src={mainFileUrl} 
                            className="w-full flex-1 border-0 bg-white"
                            title="Dokumen Utama"
                        ></iframe>
                    </div>

                    {/* Divider Visual */}
                    <div className="flex items-center justify-center h-8 bg-slate-200/50 dark:bg-slate-900/50 border-y border-slate-300 dark:border-slate-800 shrink-0">
                        <div className="w-16 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                    </div>

                    {/* Bottom Section: Attachments Table */}
                    <div className="p-8 bg-white dark:bg-slate-900 flex-1 border-t border-slate-200 dark:border-slate-800">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                            Daftar Lampiran Pendukung
                        </h3>

                        <div className="border border-slate-200 dark:border-slate-700/60 rounded-xl overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700/60">
                                    <tr>
                                        <th className="px-6 py-3 w-16 text-center">No</th>
                                        <th className="px-6 py-3">Nama Dokumen</th>
                                        <th className="px-6 py-3 text-center w-32">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {sop.attachments && sop.attachments.length > 0 ? (
                                        sop.attachments.map((att, idx) => {
                                            const attFileUrl = att.file ? route('qa.sop.file', { type: 'attachment', id: att.id }) : null;
                                            
                                            return (
                                                <tr key={att.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                    <td className="px-6 py-4 text-center text-slate-500 dark:text-slate-400 font-mono">
                                                        {idx + 1}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {att.link ? (
                                                            <a 
                                                                href={att.link} 
                                                                target="_blank" 
                                                                rel="noreferrer"
                                                                className="font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1.5"
                                                            >
                                                                {att.nama || att.file || `Lampiran ${idx + 1}`}
                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                                            </a>
                                                        ) : (
                                                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                                                                {att.nama || att.file || `Lampiran ${idx + 1}`}
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        {attFileUrl ? (
                                                            <a 
                                                                href={attFileUrl} 
                                                                target="_blank" 
                                                                rel="noreferrer"
                                                                className="inline-flex items-center justify-center p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
                                                                title="Unduh Dokumen"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                                            </a>
                                                        ) : (
                                                            <span className="text-slate-300 dark:text-slate-600" title="File tidak tersedia">-</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                                                Tidak ada lampiran pendukung
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
