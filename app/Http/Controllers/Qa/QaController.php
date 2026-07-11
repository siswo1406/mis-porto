<?php

namespace App\Http\Controllers\Qa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\QaSop;
use App\Models\QaUpdate;

class QaController extends Controller
{
    public function index()
    {
        $updates = QaUpdate::orderBy('tanggal', 'desc')->take(10)->get();
        return Inertia::render('QA/Portal', [
            'updates' => $updates
        ]);
    }

    public function sop(Request $request)
    {
        $query = QaSop::with('attachments');

        // Filter berdasarkan pencarian
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                  ->orWhere('no_sop', 'like', "%{$search}%");
            });
        }

        $sops = $query->orderBy('no_sop', 'asc')
                      ->paginate($request->per_page ?? 10)
                      ->withQueryString();
        
        return Inertia::render('QA/SopIndex', [
            'sops' => $sops,
            'filters' => $request->only(['search', 'per_page'])
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'no_sop' => 'required|string|unique:qa_sops,no_sop',
            'nama' => 'required|string',
            'tanggal' => 'required|date',
            'file' => 'required|file|mimes:pdf|max:10240',
            'attachments' => 'nullable|array',
            'attachments.*.nama' => 'required_with:attachments|string',
            'attachments.*.file' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx,jpg,jpeg,png|max:10240',
            'attachments.*.link' => 'nullable|url',
        ], [
            'file.mimes' => 'Dokumen Utama harus berupa file PDF.',
            'no_sop.unique' => 'Nomor SOP ini sudah terdaftar.',
            'attachments.*.file.mimes' => 'Format file lampiran tidak didukung.',
            'attachments.*.nama.required_with' => 'Nama lampiran harus diisi.'
        ]);

        \DB::beginTransaction();

        try {
            // Upload main SOP file
            $file = $request->file('file');
            $fileName = time() . '_' . preg_replace('/[^A-Za-z0-9.\-]/', '_', $file->getClientOriginalName());
            $file->storeAs('sops', $fileName, 'public');

            $sop = QaSop::create([
                'no_sop' => $request->no_sop,
                'nama' => $request->nama,
                'tanggal' => $request->tanggal,
                'file' => $fileName,
            ]);

            // Handle attachments
            if ($request->has('attachments') && is_array($request->attachments)) {
                foreach ($request->attachments as $att) {
                    if (empty($att['file']) && empty($att['link'])) {
                        continue;
                    }

                    $attFileName = null;
                    if (isset($att['file']) && $att['file'] instanceof \Illuminate\Http\UploadedFile) {
                        $attFile = $att['file'];
                        $attFileName = time() . '_att_' . preg_replace('/[^A-Za-z0-9.\-]/', '_', $attFile->getClientOriginalName());
                        $attFile->storeAs('sops', $attFileName, 'public');
                    }

                    \App\Models\QaSopAttachment::create([
                        'item_id' => $sop->id,
                        'item_type' => 'App\Models\QaSop',
                        'no_sop' => $sop->no_sop,
                        'nama' => $att['nama'] ?? 'Lampiran',
                        'jenis' => 'SOP',
                        'file' => $attFileName,
                        'link' => $att['link'] ?? null,
                        'tanggal' => $sop->tanggal,
                    ]);
                }
            }

            \DB::commit();
            return redirect()->back()->with('success', 'SOP berhasil ditambahkan.');
        } catch (\Exception $e) {
            \DB::rollBack();
            return redirect()->back()->with('error', 'Terjadi kesalahan saat menyimpan SOP: ' . $e->getMessage());
        }
    }

    public function file($type, $id)
    {
        // $type: 'main' atau 'attachment'
        // $id: id tabel qasop atau qasopattachment
        
        // CATATAN: Di tahap migrasi ini, file fisik belum ada di folder storage lokal mis-porto.
        // Kita gunakan abort 404 bawaan Laravel agar tampilan errornya estetik (mirip 403 default).
        
        abort(404);
    }
}
