<?php

namespace App\Http\Controllers\Qa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\QaSuratEdaran;
use Inertia\Inertia;

class SuratResmiController extends Controller
{
    public function index(Request $request)
    {
        $query = QaSuratEdaran::query();

        // Filter berdasarkan pencarian
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                  ->orWhere('no_surat', 'like', "%{$search}%")
                  ->orWhere('keyword', 'like', "%{$search}%");
            });
        }

        // Filter berdasarkan tab (Kategori Surat)
        $tab = $request->input('tab', 'semua');
        if ($tab === 'edaran') {
            $query->where(function($q) {
                $q->where('no_surat', 'like', '%SEd%')
                  ->orWhere('no_surat', 'like', '%Sed%');
            });
        } elseif ($tab === 'pemberitahuan') {
            $query->where('no_surat', 'like', '%SPem%');
        } elseif ($tab === 'lainnya') {
            $query->where('no_surat', 'not like', '%SEd%')
                  ->where('no_surat', 'not like', '%Sed%')
                  ->where('no_surat', 'not like', '%SPem%');
        }

        $surat_edarans = $query->orderBy('tanggal_surat_masuk', 'desc')
                               ->paginate($request->per_page ?? 10)
                               ->withQueryString();

        return Inertia::render('QA/SuratResmiIndex', [
            'surat_edarans' => $surat_edarans,
            'filters' => $request->only(['search', 'per_page', 'tab'])
        ]);
    }
}
