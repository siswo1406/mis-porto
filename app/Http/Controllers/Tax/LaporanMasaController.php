<?php

namespace App\Http\Controllers\Tax;

use App\Http\Controllers\Controller;
use App\Models\TaxLaporanMasa;
use App\Models\TaxLaporanMasaPembetulan;
use App\Models\Region;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class LaporanMasaController extends Controller
{
    public function index(Request $request)
    {
        $query = TaxLaporanMasa::with('pembetulans');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('ap', 'like', "%{$search}%")
                  ->orWhere('jenis_pajak', 'like', "%{$search}%")
                  ->orWhere('nop', 'like', "%{$search}%")
                  ->orWhere('uraian', 'like', "%{$search}%");
            });
        }

        if ($request->filled('jenis_pajak') && $request->jenis_pajak !== 'Semua') {
            $query->where('jenis_pajak', $request->jenis_pajak);
        }

        if ($request->filled('ap') && $request->ap !== 'Semua') {
            $query->where('ap', $request->ap);
        }

        if ($request->filled('tahun') && $request->tahun !== 'Semua') {
            $query->where('tahun', $request->tahun);
        }

        $laporan_masas = $query->orderBy('tahun', 'desc')
                               ->orderBy('bulan', 'desc')
                               ->paginate($request->per_page ?? 10)
                               ->withQueryString();

        $regions = Region::orderBy('namaregion', 'asc')->get(['koderegion', 'namaregion']);
        
        $available_years = TaxLaporanMasa::select('tahun')
            ->distinct()
            ->orderBy('tahun', 'desc')
            ->pluck('tahun')
            ->toArray();

        if (empty($available_years)) {
            $available_years = [(int) date('Y'), (int) date('Y') - 1];
        }

        $tax_types = [
            'PPh 21',
            'PPh 22',
            'PPh 23',
            'PPh 25',
            'PPh Pasal 4 Ayat 2',
            'PPN',
            'PPh 29',
        ];

        return Inertia::render('Tax/LaporanMasa/Index', [
            'laporan_masas' => $laporan_masas,
            'regions' => $regions,
            'available_years' => $available_years,
            'tax_types' => $tax_types,
            'filters' => $request->only(['search', 'per_page', 'jenis_pajak', 'ap', 'tahun'])
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'jenis_pajak' => 'required|string',
            'ap' => 'required|string',
            'bulan' => 'required|string|max:2',
            'tahun' => 'required|integer',
            'tanggal_bayar' => 'nullable|date',
            'tanggal_lapor' => 'nullable|date',
            'nop' => 'nullable|string',
            'nominal' => 'nullable|numeric',
            'nilai_sewa' => 'nullable|numeric',
            'pajak_10_persen' => 'nullable|numeric',
            'uraian' => 'nullable|string',
            'bukti_bayar' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ]);

        if ($request->hasFile('bukti_bayar')) {
            $path = $request->file('bukti_bayar')->store('tax/laporan-masa', 'public');
            $validated['bukti_bayar'] = $path;
        }

        TaxLaporanMasa::create($validated);

        return redirect()->back()->with('success', 'Laporan Masa berhasil ditambahkan.');
    }

    public function update(Request $request, TaxLaporanMasa $laporan_masa)
    {
        $validated = $request->validate([
            'jenis_pajak' => 'required|string',
            'ap' => 'required|string',
            'bulan' => 'required|string|max:2',
            'tahun' => 'required|integer',
            'tanggal_bayar' => 'nullable|date',
            'tanggal_lapor' => 'nullable|date',
            'nop' => 'nullable|string',
            'nominal' => 'nullable|numeric',
            'nilai_sewa' => 'nullable|numeric',
            'pajak_10_persen' => 'nullable|numeric',
            'uraian' => 'nullable|string',
            'bukti_bayar' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ]);

        if ($request->hasFile('bukti_bayar')) {
            if ($laporan_masa->bukti_bayar) {
                Storage::disk('public')->delete($laporan_masa->bukti_bayar);
            }
            $path = $request->file('bukti_bayar')->store('tax/laporan-masa', 'public');
            $validated['bukti_bayar'] = $path;
        }

        $laporan_masa->update($validated);

        return redirect()->back()->with('success', 'Laporan Masa berhasil diperbarui.');
    }

    public function destroy(TaxLaporanMasa $laporan_masa)
    {
        if ($laporan_masa->bukti_bayar) {
            Storage::disk('public')->delete($laporan_masa->bukti_bayar);
        }

        foreach ($laporan_masa->pembetulans as $pembetulan) {
            if ($pembetulan->bukti_bayar) {
                Storage::disk('public')->delete($pembetulan->bukti_bayar);
            }
        }

        $laporan_masa->delete();
        return redirect()->back()->with('success', 'Laporan Masa berhasil dihapus.');
    }

    public function updateUraian(Request $request, TaxLaporanMasa $laporan_masa)
    {
        $validated = $request->validate([
            'uraian' => 'nullable|string',
        ]);

        $laporan_masa->update($validated);

        return redirect()->back()->with('success', 'Uraian berhasil disimpan.');
    }

    public function storePembetulan(Request $request, TaxLaporanMasa $laporan_masa)
    {
        $validated = $request->validate([
            'keterangan' => 'required|string',
            'tanggal_bayar' => 'nullable|date',
            'tanggal_lapor' => 'nullable|date',
            'nop' => 'nullable|string',
            'nominal' => 'nullable|numeric',
            'nilai_sewa' => 'nullable|numeric',
            'pajak_10_persen' => 'nullable|numeric',
            'bukti_bayar' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ]);

        if ($request->hasFile('bukti_bayar')) {
            $path = $request->file('bukti_bayar')->store('tax/pembetulan', 'public');
            $validated['bukti_bayar'] = $path;
        }

        $laporan_masa->pembetulans()->create($validated);

        return redirect()->back()->with('success', 'Pembetulan berhasil ditambahkan.');
    }

    public function updatePembetulan(Request $request, TaxLaporanMasaPembetulan $pembetulan)
    {
        $validated = $request->validate([
            'keterangan' => 'required|string',
            'tanggal_bayar' => 'nullable|date',
            'tanggal_lapor' => 'nullable|date',
            'nop' => 'nullable|string',
            'nominal' => 'nullable|numeric',
            'nilai_sewa' => 'nullable|numeric',
            'pajak_10_persen' => 'nullable|numeric',
            'bukti_bayar' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ]);

        if ($request->hasFile('bukti_bayar')) {
            if ($pembetulan->bukti_bayar) {
                Storage::disk('public')->delete($pembetulan->bukti_bayar);
            }
            $path = $request->file('bukti_bayar')->store('tax/pembetulan', 'public');
            $validated['bukti_bayar'] = $path;
        }

        $pembetulan->update($validated);

        return redirect()->back()->with('success', 'Pembetulan berhasil diperbarui.');
    }

    public function destroyPembetulan(TaxLaporanMasaPembetulan $pembetulan)
    {
        if ($pembetulan->bukti_bayar) {
            Storage::disk('public')->delete($pembetulan->bukti_bayar);
        }

        $pembetulan->delete();

        return redirect()->back()->with('success', 'Pembetulan berhasil dihapus.');
    }
}
