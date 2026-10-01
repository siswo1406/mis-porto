<?php

namespace App\Http\Controllers\Tax;

use App\Http\Controllers\Controller;
use App\Models\TaxLaporanMasa;
use App\Models\TaxLaporanMasaPembetulan;
use App\Models\TaxStp;
use App\Models\Region;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class LaporanMasaController extends Controller
{
    public function index(Request $request)
    {
        $activeTab = $request->input('tab', 'laporan_masa');

        // All AP entities
        $regions = Region::orderBy('namaregion', 'asc')->get(['koderegion', 'namaregion']);
        $companyList = array_merge(
            ['PT MUSTIKA JAYA LESTARI'],
            $regions->pluck('namaregion')->toArray()
        );

        // Available years from both tables
        $yearsMasa = TaxLaporanMasa::select('tahun')->distinct()->pluck('tahun')->toArray();
        $yearsStp = TaxStp::select('tahun')->distinct()->pluck('tahun')->toArray();
        $available_years = array_values(array_unique(array_merge($yearsMasa, $yearsStp)));
        rsort($available_years);

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

        // 1. DATA FOR TAB: LAPORAN MASA
        $laporan_masas = null;
        if ($activeTab === 'laporan_masa') {
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
        }

        // 2. DATA FOR TAB: STP
        $stps = null;
        if ($activeTab === 'stp') {
            $queryStp = TaxStp::query();

            if ($request->filled('search')) {
                $search = $request->search;
                $queryStp->where(function ($q) use ($search) {
                    $q->where('ap', 'like', "%{$search}%")
                      ->orWhere('jenis_pajak', 'like', "%{$search}%")
                      ->orWhere('nomor_stp', 'like', "%{$search}%")
                      ->orWhere('uraian', 'like', "%{$search}%");
                });
            }

            if ($request->filled('jenis_pajak') && $request->jenis_pajak !== 'Semua') {
                $queryStp->where('jenis_pajak', $request->jenis_pajak);
            }

            if ($request->filled('ap') && $request->ap !== 'Semua') {
                $queryStp->where('ap', $request->ap);
            }

            if ($request->filled('tahun') && $request->tahun !== 'Semua') {
                $queryStp->where('tahun', $request->tahun);
            }

            $stps = $queryStp->orderBy('tahun', 'desc')
                             ->orderBy('bulan', 'desc')
                             ->paginate($request->per_page ?? 10)
                             ->withQueryString();
        }

        // 3. DATA FOR TAB: REKAP PER AP
        $rekapApData = null;
        $selectedAp = $request->input('rekap_ap_target', 'PT MUSTIKA JAYA LESTARI');
        $selectedRekapYear = (int) $request->input('rekap_tahun', $available_years[0] ?? date('Y'));
        $selectedRekapSub = $request->input('rekap_sub', 'laporan_masa'); // 'laporan_masa' or 'stp'

        if ($activeTab === 'rekap_ap') {
            $monthLabels = [
                '01' => 'Januari', '02' => 'Februari', '03' => 'Maret', '04' => 'April',
                '05' => 'Mei', '06' => 'Juni', '07' => 'Juli', '08' => 'Agustus',
                '09' => 'September', '10' => 'Oktober', '11' => 'November', '12' => 'Desember'
            ];

            $rawRecords = $selectedRekapSub === 'stp'
                ? TaxStp::where('ap', $selectedAp)->where('tahun', $selectedRekapYear)->get()
                : TaxLaporanMasa::where('ap', $selectedAp)->where('tahun', $selectedRekapYear)->get();

            $rows = [];
            $columnTotals = [
                'pph_21' => 0,
                'pph_22' => 0,
                'pph_23' => 0,
                'pph_25' => 0,
                'pph_ps_4_2' => 0,
                'pph_29' => 0,
                'ppn' => 0,
                'total' => 0,
            ];

            foreach ($monthLabels as $mKey => $mName) {
                $mRecords = $rawRecords->where('bulan', $mKey);

                $getTaxNominal = function ($taxType) use ($mRecords, $selectedRekapSub) {
                    $item = $mRecords->firstWhere('jenis_pajak', $taxType);
                    if (!$item) return 0;
                    if ($selectedRekapSub === 'laporan_masa' && ($taxType === 'PPh Pasal 4 Ayat 2' || $taxType === 'PPh 4 (2)')) {
                        return (float) ($item->pajak_10_persen ?? $item->nominal ?? 0);
                    }
                    return (float) ($item->nominal ?? 0);
                };

                $p21 = $getTaxNominal('PPh 21');
                $p22 = $getTaxNominal('PPh 22');
                $p23 = $getTaxNominal('PPh 23');
                $p25 = $getTaxNominal('PPh 25');
                $p42 = $getTaxNominal('PPh Pasal 4 Ayat 2');
                $p29 = $getTaxNominal('PPh 29');
                $ppn = $getTaxNominal('PPN');
                $rowTotal = $p21 + $p22 + $p23 + $p25 + $p42 + $p29 + $ppn;

                $columnTotals['pph_21'] += $p21;
                $columnTotals['pph_22'] += $p22;
                $columnTotals['pph_23'] += $p23;
                $columnTotals['pph_25'] += $p25;
                $columnTotals['pph_ps_4_2'] += $p42;
                $columnTotals['pph_29'] += $p29;
                $columnTotals['ppn'] += $ppn;
                $columnTotals['total'] += $rowTotal;

                $rows[] = [
                    'bulan_code' => $mKey,
                    'bulan_name' => $mName,
                    'pph_21' => $p21,
                    'pph_22' => $p22,
                    'pph_23' => $p23,
                    'pph_25' => $p25,
                    'pph_ps_4_2' => $p42,
                    'pph_29' => $p29,
                    'ppn' => $ppn,
                    'total' => $rowTotal,
                ];
            }

            $rekapApData = [
                'ap' => $selectedAp,
                'tahun' => $selectedRekapYear,
                'sub' => $selectedRekapSub,
                'rows' => $rows,
                'totals' => $columnTotals,
            ];
        }

        // 4. DATA FOR TAB: REKAP GABUNGAN
        $rekapGabunganData = null;
        $selectedGabunganYear = (int) $request->input('gabungan_tahun', $available_years[0] ?? date('Y'));
        $selectedGabunganTax = $request->input('gabungan_pajak', 'PPh 21');
        $selectedGabunganType = $request->input('gabungan_tipe', 'laporan_masa'); // 'laporan_masa' or 'stp'

        if ($activeTab === 'rekap_gabungan') {
            $monthLabels = [
                '01' => 'Januari', '02' => 'Februari', '03' => 'Maret', '04' => 'April',
                '05' => 'Mei', '06' => 'Juni', '07' => 'Juli', '08' => 'Agustus',
                '09' => 'September', '10' => 'Oktober', '11' => 'November', '12' => 'Desember'
            ];

            $rawRecords = $selectedGabunganType === 'stp'
                ? TaxStp::where('jenis_pajak', $selectedGabunganTax)->where('tahun', $selectedGabunganYear)->get()
                : TaxLaporanMasa::where('jenis_pajak', $selectedGabunganTax)->where('tahun', $selectedGabunganYear)->get();

            $rows = [];
            $apTotals = [];
            foreach ($companyList as $comp) {
                $apTotals[$comp] = 0;
            }
            $grandTotalAll = 0;

            foreach ($monthLabels as $mKey => $mName) {
                $mRecords = $rawRecords->where('bulan', $mKey);
                $rowAps = [];
                $rowTotalMonth = 0;

                foreach ($companyList as $comp) {
                    $item = $mRecords->firstWhere('ap', $comp);
                    $val = 0;
                    if ($item) {
                        if ($selectedGabunganType === 'laporan_masa' && ($selectedGabunganTax === 'PPh Pasal 4 Ayat 2' || $selectedGabunganTax === 'PPh 4 (2)')) {
                            $val = (float) ($item->pajak_10_persen ?? $item->nominal ?? 0);
                        } else {
                            $val = (float) ($item->nominal ?? 0);
                        }
                    }
                    $rowAps[$comp] = $val;
                    $apTotals[$comp] += $val;
                    $rowTotalMonth += $val;
                }

                $grandTotalAll += $rowTotalMonth;

                $rows[] = [
                    'bulan_code' => $mKey,
                    'bulan_name' => $mName,
                    'aps' => $rowAps,
                    'total' => $rowTotalMonth,
                ];
            }

            $rekapGabunganData = [
                'tahun' => $selectedGabunganYear,
                'jenis_pajak' => $selectedGabunganTax,
                'tipe' => $selectedGabunganType,
                'companies' => $companyList,
                'rows' => $rows,
                'ap_totals' => $apTotals,
                'grand_total' => $grandTotalAll,
            ];
        }

        return Inertia::render('Tax/LaporanMasa/Index', [
            'active_tab' => $activeTab,
            'laporan_masas' => $laporan_masas,
            'stps' => $stps,
            'rekap_ap_data' => $rekapApData,
            'rekap_gabungan_data' => $rekapGabunganData,
            'company_list' => $companyList,
            'regions' => $regions,
            'available_years' => $available_years,
            'tax_types' => $tax_types,
            'filters' => $request->only([
                'tab', 'search', 'per_page', 'jenis_pajak', 'ap', 'tahun',
                'rekap_ap_target', 'rekap_tahun', 'rekap_sub',
                'gabungan_tahun', 'gabungan_pajak', 'gabungan_tipe'
            ])
        ]);
    }

    // ==========================================
    // LAPORAN MASA CRUD
    // ==========================================
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

    // ==========================================
    // STP (SURAT TAGIHAN PAJAK) CRUD
    // ==========================================
    public function storeStp(Request $request)
    {
        $validated = $request->validate([
            'ap' => 'required|string',
            'jenis_pajak' => 'required|string',
            'bulan' => 'required|string|max:2',
            'tahun' => 'required|integer',
            'nomor_stp' => 'nullable|string',
            'tanggal_bayar' => 'nullable|date',
            'tanggal_stp' => 'nullable|date',
            'nominal' => 'required|numeric',
            'uraian' => 'nullable|string',
            'bukti_bayar' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ]);

        if ($request->hasFile('bukti_bayar')) {
            $path = $request->file('bukti_bayar')->store('tax/stp', 'public');
            $validated['bukti_bayar'] = $path;
        }

        TaxStp::create($validated);

        return redirect()->back()->with('success', 'Surat Tagihan Pajak (STP) berhasil ditambahkan.');
    }

    public function updateStp(Request $request, TaxStp $stp)
    {
        $validated = $request->validate([
            'ap' => 'required|string',
            'jenis_pajak' => 'required|string',
            'bulan' => 'required|string|max:2',
            'tahun' => 'required|integer',
            'nomor_stp' => 'nullable|string',
            'tanggal_bayar' => 'nullable|date',
            'tanggal_stp' => 'nullable|date',
            'nominal' => 'required|numeric',
            'uraian' => 'nullable|string',
            'bukti_bayar' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ]);

        if ($request->hasFile('bukti_bayar')) {
            if ($stp->bukti_bayar) {
                Storage::disk('public')->delete($stp->bukti_bayar);
            }
            $path = $request->file('bukti_bayar')->store('tax/stp', 'public');
            $validated['bukti_bayar'] = $path;
        }

        $stp->update($validated);

        return redirect()->back()->with('success', 'Surat Tagihan Pajak (STP) berhasil diperbarui.');
    }

    public function destroyStp(TaxStp $stp)
    {
        if ($stp->bukti_bayar) {
            Storage::disk('public')->delete($stp->bukti_bayar);
        }

        $stp->delete();

        return redirect()->back()->with('success', 'Surat Tagihan Pajak (STP) berhasil dihapus.');
    }

    public function updateUraianStp(Request $request, TaxStp $stp)
    {
        $validated = $request->validate([
            'uraian' => 'nullable|string',
        ]);

        $stp->update($validated);

        return redirect()->back()->with('success', 'Catatan uraian STP berhasil disimpan.');
    }
}
