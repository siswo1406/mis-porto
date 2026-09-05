<?php

namespace Database\Seeders;

use App\Models\TaxLaporanMasa;
use App\Models\TaxLaporanMasaPembetulan;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class TaxLaporanMasaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Truncate existing data to avoid duplicate runs
        TaxLaporanMasaPembetulan::truncate();
        TaxLaporanMasa::truncate();

        $companies = [
            'PT MUSTIKA JAYA LESTARI',
            'PT ANEKA INTAN LESTARI',
            'PT MITRA UNGGAS MAKMUR',
            'PT LAWU ABADI NUSA',
            'PT MURIA JAYA RAYA',
            'PT KEDU LINTAS BERBINTANG',
            'PT BAROKAH RESTU UTAMA',
            'PT BINTANG TERANG BERSINAR',
            'PT GILAR PERWIRA SATRIA',
            'PT KARYA SATWA MULIA',
            'PT LAJU SATWA WISESA',
            'PT MITRA MAHKOTA BUANA',
            'PT MITRA PETERNAKAN UNGGAS',
            'PT SAWUNG GEMA ABADI',
        ];

        $dataset = [
            // ==========================================
            // 2026 - RECENT PERIODS (JAN - AUG)
            // ==========================================
            // PT MUSTIKA JAYA LESTARI (HO)
            [
                'ap' => 'PT MUSTIKA JAYA LESTARI',
                'jenis_pajak' => 'PPh 21',
                'bulan' => '07',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-08-08',
                'tanggal_lapor' => '2026-08-14',
                'nop' => '01.345.890.1-012.000',
                'nominal' => 48750000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'SPT Masa PPh 21 Masa Juli 2026 Kantor Pusat - Gaji 142 Karyawan Tetap & Honor Tenaga Ahli Dokter Hewan.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT MUSTIKA JAYA LESTARI',
                'jenis_pajak' => 'PPN',
                'bulan' => '06',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-07-28',
                'tanggal_lapor' => '2026-07-30',
                'nop' => '01.345.890.1-012.000',
                'nominal' => 142600000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'SPT Masa PPN Kurang Bayar Masa Juni 2026. Penyerahan BKP Ayam Potong Olahan & Pakan Ternak.',
                'pembetulans' => [
                    [
                        'keterangan' => 'Pembetulan 1 - Pengkreditan Faktur Pajak Masukan Pengganti dari Vendor Supplier Mesin Boiler.',
                        'tanggal_bayar' => '2026-08-15',
                        'tanggal_lapor' => '2026-08-18',
                        'nop' => '01.345.890.1-012.000',
                        'nominal' => 135800000,
                        'nilai_sewa' => null,
                        'pajak_10_persen' => null,
                    ]
                ]
            ],
            [
                'ap' => 'PT MUSTIKA JAYA LESTARI',
                'jenis_pajak' => 'PPh Pasal 4 Ayat 2',
                'bulan' => '05',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-06-09',
                'tanggal_lapor' => '2026-06-16',
                'nop' => '01.345.890.1-012.000',
                'nominal' => 18500000,
                'nilai_sewa' => 185000000,
                'pajak_10_persen' => 18500000,
                'uraian' => 'PPh Final Pasal 4 Ayat (2) atas Sewa Gedung Kantor Pusat Menara Mustika Lt. 4 & 5 Periode Semester II 2026.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT MUSTIKA JAYA LESTARI',
                'jenis_pajak' => 'PPh 23',
                'bulan' => '07',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-08-09',
                'tanggal_lapor' => '2026-08-19',
                'nop' => '01.345.890.1-012.000',
                'nominal' => 16450000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 23 atas Jasa Konsultan IT, Maintenance Server Cloud ERP, dan Jasa Pengiriman Logistik Cold Storage.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT MUSTIKA JAYA LESTARI',
                'jenis_pajak' => 'PPh 25',
                'bulan' => '07',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-08-12',
                'tanggal_lapor' => '2026-08-15',
                'nop' => '01.345.890.1-012.000',
                'nominal' => 65000000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'Angsuran Bulanan PPh Pasal 25 Badan Masa Juli 2026 sesuai ketetapan SPT Tahunan Badan tahun pajak sebelumnya.',
                'pembetulans' => []
            ],

            // PT MITRA UNGGAS MAKMUR
            [
                'ap' => 'PT MITRA UNGGAS MAKMUR',
                'jenis_pajak' => 'PPh 21',
                'bulan' => '06',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-07-09',
                'tanggal_lapor' => '2026-07-15',
                'nop' => '02.456.789.2-501.000',
                'nominal' => 28400000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'Pemotongan PPh 21 Gaji Karyawan Farm Unit Kendal & Ungaran Masa Juni 2026.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT MITRA UNGGAS MAKMUR',
                'jenis_pajak' => 'PPh 22',
                'bulan' => '05',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-06-08',
                'tanggal_lapor' => '2026-06-18',
                'nop' => '02.456.789.2-501.000',
                'nominal' => 14200000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 22 Pembelian Jagung Pipil & Bahan Baku Konsentrat Pakan dari Pengumpul Hasil Pertanian.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT MITRA UNGGAS MAKMUR',
                'jenis_pajak' => 'PPN',
                'bulan' => '07',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-08-25',
                'tanggal_lapor' => '2026-08-29',
                'nop' => '02.456.789.2-501.000',
                'nominal' => 89500000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'SPT PPN Masa Juli 2026 atas transaksi penjualan karkas ayam beku & produk turunan.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT MITRA UNGGAS MAKMUR',
                'jenis_pajak' => 'PPh Pasal 4 Ayat 2',
                'bulan' => '04',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-05-10',
                'tanggal_lapor' => '2026-05-18',
                'nop' => '02.456.789.2-501.000',
                'nominal' => 12000000,
                'nilai_sewa' => 120000000,
                'pajak_10_persen' => 12000000,
                'uraian' => 'PPh Final Sewa Lahan Farm Kemitraan Ungaran Luas 2.5 Hektar untuk Kandang Close House.',
                'pembetulans' => []
            ],

            // PT ANEKA INTAN LESTARI
            [
                'ap' => 'PT ANEKA INTAN LESTARI',
                'jenis_pajak' => 'PPh 23',
                'bulan' => '06',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-07-10',
                'tanggal_lapor' => '2026-07-20',
                'nop' => '03.789.123.4-512.000',
                'nominal' => 9600000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 23 Jasa Sewa Kendaraan Armada Truk Angkut Pakan & Jasa Fumigasi Disinfeksi Kandang.',
                'pembetulans' => [
                    [
                        'keterangan' => 'Pembetulan 1 - Tambahan Bukti Potong Faktur Jasa Perbaikan Mesin Pengaduk Pakan (Mixer).',
                        'tanggal_bayar' => '2026-07-25',
                        'tanggal_lapor' => '2026-07-29',
                        'nop' => '03.789.123.4-512.000',
                        'nominal' => 11200000,
                        'nilai_sewa' => null,
                        'pajak_10_persen' => null,
                    ]
                ]
            ],
            [
                'ap' => 'PT ANEKA INTAN LESTARI',
                'jenis_pajak' => 'PPh 21',
                'bulan' => '07',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-08-09',
                'tanggal_lapor' => '2026-08-15',
                'nop' => '03.789.123.4-512.000',
                'nominal' => 21800000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 21 Pegawai Bulanan & Tenaga Kerja Harian Lepas Panen Broiler Periode Juli 2026.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT ANEKA INTAN LESTARI',
                'jenis_pajak' => 'PPN',
                'bulan' => '05',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-06-26',
                'tanggal_lapor' => '2026-06-30',
                'nop' => '03.789.123.4-512.000',
                'nominal' => 64300000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'Pelaporan SPT PPN Masa Mei 2026 atas transaksi penjualan DOC & pakan ternak area Solo Raya.',
                'pembetulans' => []
            ],

            // PT LAWU ABADI NUSA
            [
                'ap' => 'PT LAWU ABADI NUSA',
                'jenis_pajak' => 'PPh 21',
                'bulan' => '07',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-08-10',
                'tanggal_lapor' => '2026-08-18',
                'nop' => '04.112.334.5-528.000',
                'nominal' => 19300000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 21 Gaji Reguler Karyawan Unit Karanganyar & Sragen Bulan Juli 2026.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT LAWU ABADI NUSA',
                'jenis_pajak' => 'PPh Pasal 4 Ayat 2',
                'bulan' => '06',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-07-10',
                'tanggal_lapor' => '2026-07-15',
                'nop' => '04.112.334.5-528.000',
                'nominal' => 7500000,
                'nilai_sewa' => 75000000,
                'pajak_10_persen' => 7500000,
                'uraian' => 'Sewa Bangunan Gudang Transit Pakan & Sarana Produksi Ternak di Karanganyar.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT LAWU ABADI NUSA',
                'jenis_pajak' => 'PPh 25',
                'bulan' => '06',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-07-12',
                'tanggal_lapor' => '2026-07-15',
                'nop' => '04.112.334.5-528.000',
                'nominal' => 22000000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'Angsuran PPh 25 Badan Masa Juni 2026.',
                'pembetulans' => []
            ],

            // PT MURIA JAYA RAYA
            [
                'ap' => 'PT MURIA JAYA RAYA',
                'jenis_pajak' => 'PPh 21',
                'bulan' => '06',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-07-08',
                'tanggal_lapor' => '2026-07-16',
                'nop' => '05.223.445.6-506.000',
                'nominal' => 17800000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 21 Pegawai Tetap & Tenaga Harian Lepas Farm Kudus & Pati Masa Juni 2026.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT MURIA JAYA RAYA',
                'jenis_pajak' => 'PPN',
                'bulan' => '07',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-08-28',
                'tanggal_lapor' => '2026-08-30',
                'nop' => '05.223.445.6-506.000',
                'nominal' => 78200000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'SPT PPN Masa Juli 2026 Distribusi Pakan dan Hasil Panen Ayam Broiler Karesidenan Pati.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT MURIA JAYA RAYA',
                'jenis_pajak' => 'PPh 23',
                'bulan' => '05',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-06-09',
                'tanggal_lapor' => '2026-06-18',
                'nop' => '05.223.445.6-506.000',
                'nominal' => 8450000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 23 Jasa Ekspedisi Logistik Antar Unit & Jasa Kalibrasi Timbangan Digital.',
                'pembetulans' => []
            ],

            // PT KEDU LINTAS BERBINTANG
            [
                'ap' => 'PT KEDU LINTAS BERBINTANG',
                'jenis_pajak' => 'PPh 21',
                'bulan' => '07',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-08-08',
                'tanggal_lapor' => '2026-08-14',
                'nop' => '06.334.556.7-524.000',
                'nominal' => 24600000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 21 Karyawan Unit Magelang, Temanggung & Wonosobo Periode Juli 2026.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT KEDU LINTAS BERBINTANG',
                'jenis_pajak' => 'PPh Pasal 4 Ayat 2',
                'bulan' => '06',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-07-10',
                'tanggal_lapor' => '2026-07-20',
                'nop' => '06.334.556.7-524.000',
                'nominal' => 9000000,
                'nilai_sewa' => 90000000,
                'pajak_10_persen' => 9000000,
                'uraian' => 'Sewa Bangunan Kantor Cabang Magelang & Mess Karyawan Farm Periode 2026/2027.',
                'pembetulans' => [
                    [
                        'keterangan' => 'Pembetulan 1 - Penyesuaian nilai kontrak setelah adendum penambahan fasilitas lahan parkir.',
                        'tanggal_bayar' => '2026-07-28',
                        'tanggal_lapor' => '2026-07-31',
                        'nop' => '06.334.556.7-524.000',
                        'nominal' => 10500000,
                        'nilai_sewa' => 105000000,
                        'pajak_10_persen' => 10500000,
                    ]
                ]
            ],
            [
                'ap' => 'PT KEDU LINTAS BERBINTANG',
                'jenis_pajak' => 'PPN',
                'bulan' => '06',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-07-27',
                'tanggal_lapor' => '2026-07-30',
                'nop' => '06.334.556.7-524.000',
                'nominal' => 52300000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'SPT PPN Masa Juni 2026 Penyerahan Karkas Ayam Segar & Telur Tetas Kedu Raya.',
                'pembetulans' => []
            ],

            // PT BAROKAH RESTU UTAMA
            [
                'ap' => 'PT BAROKAH RESTU UTAMA',
                'jenis_pajak' => 'PPh 21',
                'bulan' => '07',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-08-10',
                'tanggal_lapor' => '2026-08-16',
                'nop' => '07.445.667.8-517.000',
                'nominal' => 16500000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 21 Karyawan Operasional & Farm Broiler Area Boyolali Masa Juli 2026.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT BAROKAH RESTU UTAMA',
                'jenis_pajak' => 'PPh 22',
                'bulan' => '06',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-07-09',
                'tanggal_lapor' => '2026-07-15',
                'nop' => '07.445.667.8-517.000',
                'nominal' => 11400000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 22 Pembelian Pakan Konsentrat & Dedak Padi Halus Peternak Kemitraan.',
                'pembetulans' => []
            ],

            // PT BINTANG TERANG BERSINAR
            [
                'ap' => 'PT BINTANG TERANG BERSINAR',
                'jenis_pajak' => 'PPN',
                'bulan' => '06',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-07-29',
                'tanggal_lapor' => '2026-07-31',
                'nop' => '08.556.778.9-531.000',
                'nominal' => 67800000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'SPT PPN Masa Juni 2026 atas Faktur Penjualan Ayam Hidup Livebird Regional Purwokerto.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT BINTANG TERANG BERSINAR',
                'jenis_pajak' => 'PPh 23',
                'bulan' => '07',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-08-10',
                'tanggal_lapor' => '2026-08-18',
                'nop' => '08.556.778.9-531.000',
                'nominal' => 7250000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 23 Pemotongan Jasa Service Generator Set (Genset) & Pompa Air Otomatis Kandang.',
                'pembetulans' => []
            ],

            // PT GILAR PERWIRA SATRIA
            [
                'ap' => 'PT GILAR PERWIRA SATRIA',
                'jenis_pajak' => 'PPh 21',
                'bulan' => '07',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-08-08',
                'tanggal_lapor' => '2026-08-14',
                'nop' => '09.667.889.0-532.000',
                'nominal' => 15200000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 21 Tenaga Kerja Farm Banjarnegara & Purbalingga Periode Juli 2026.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT GILAR PERWIRA SATRIA',
                'jenis_pajak' => 'PPh 25',
                'bulan' => '06',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-07-14',
                'tanggal_lapor' => '2026-07-15',
                'nop' => '09.667.889.0-532.000',
                'nominal' => 18500000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'Angsuran PPh 25 Badan Masa Pajak Juni 2026.',
                'pembetulans' => []
            ],

            // PT KARYA SATWA MULIA
            [
                'ap' => 'PT KARYA SATWA MULIA',
                'jenis_pajak' => 'PPh 21',
                'bulan' => '06',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-07-09',
                'tanggal_lapor' => '2026-07-15',
                'nop' => '10.778.990.1-508.000',
                'nominal' => 22400000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 21 Gaji Pegawai dan Bonus Panen Siklus 3 Area Salatiga.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT KARYA SATWA MULIA',
                'jenis_pajak' => 'PPN',
                'bulan' => '06',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-07-28',
                'tanggal_lapor' => '2026-07-31',
                'nop' => '10.778.990.1-508.000',
                'nominal' => 58900000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'SPT PPN Masa Juni 2026 atas Penjualan Pakan Unggas & Sarana Ternak.',
                'pembetulans' => []
            ],

            // PT LAJU SATWA WISESA
            [
                'ap' => 'PT LAJU SATWA WISESA',
                'jenis_pajak' => 'PPh 23',
                'bulan' => '07',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-08-10',
                'tanggal_lapor' => '2026-08-19',
                'nop' => '11.889.001.2-503.000',
                'nominal' => 10800000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 23 Jasa Angkutan Khusus DOC dan Jasa Penimbangan Livebird.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT LAJU SATWA WISESA',
                'jenis_pajak' => 'PPh Pasal 4 Ayat 2',
                'bulan' => '05',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-06-10',
                'tanggal_lapor' => '2026-06-15',
                'nop' => '11.889.001.2-503.000',
                'nominal' => 8500000,
                'nilai_sewa' => 85000000,
                'pajak_10_persen' => 8500000,
                'uraian' => 'Sewa Bangunan Gudang Penyimpanan Vaksin & Obat Hewan Terstandar Cold Chain di Semarang.',
                'pembetulans' => []
            ],

            // PT MITRA MAHKOTA BUANA
            [
                'ap' => 'PT MITRA MAHKOTA BUANA',
                'jenis_pajak' => 'PPh 21',
                'bulan' => '07',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-08-08',
                'tanggal_lapor' => '2026-08-15',
                'nop' => '12.990.112.3-511.000',
                'nominal' => 18900000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 21 Gaji Staf Operasional & Tenaga Lapangan Unit Brebes & Tegal Masa Juli 2026.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT MITRA MAHKOTA BUANA',
                'jenis_pajak' => 'PPN',
                'bulan' => '07',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-08-28',
                'tanggal_lapor' => '2026-08-31',
                'nop' => '12.990.112.3-511.000',
                'nominal' => 71500000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'SPT PPN Masa Juli 2026 atas transaksi kemitraan ayam broiler wilayah Pantura Barat.',
                'pembetulans' => []
            ],

            // PT MITRA PETERNAKAN UNGGAS
            [
                'ap' => 'PT MITRA PETERNAKAN UNGGAS',
                'jenis_pajak' => 'PPh 22',
                'bulan' => '06',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-07-08',
                'tanggal_lapor' => '2026-07-15',
                'nop' => '13.001.223.4-521.000',
                'nominal' => 13600000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 22 Pembelian Bahan Baku Kedelai Impor & Jagung Lokal untuk Pakan.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT MITRA PETERNAKAN UNGGAS',
                'jenis_pajak' => 'PPh 25',
                'bulan' => '07',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-08-12',
                'tanggal_lapor' => '2026-08-15',
                'nop' => '13.001.223.4-521.000',
                'nominal' => 31000000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'Angsuran Pajak PPh 25 Badan Masa Juli 2026.',
                'pembetulans' => []
            ],

            // PT SAWUNG GEMA ABADI
            [
                'ap' => 'PT SAWUNG GEMA ABADI',
                'jenis_pajak' => 'PPh 21',
                'bulan' => '07',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-08-10',
                'tanggal_lapor' => '2026-08-16',
                'nop' => '14.112.334.5-515.000',
                'nominal' => 20500000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 21 Karyawan Unit Farm & Rumah Potong Ayam (RPA) Sukoharjo Masa Juli 2026.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT SAWUNG GEMA ABADI',
                'jenis_pajak' => 'PPh 29',
                'bulan' => '04',
                'tahun' => 2026,
                'tanggal_bayar' => '2026-04-28',
                'tanggal_lapor' => '2026-04-30',
                'nop' => '14.112.334.5-515.000',
                'nominal' => 88500000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'Pelunasan Kurang Bayar PPh Pasal 29 Badan Tahun Pajak 2025 sesuai SPT Tahunan 1771.',
                'pembetulans' => []
            ],

            // ==========================================
            // 2025 - HISTORICAL PERIODS
            // ==========================================
            // PT MUSTIKA JAYA LESTARI (HO) - 2025
            [
                'ap' => 'PT MUSTIKA JAYA LESTARI',
                'jenis_pajak' => 'PPh 21',
                'bulan' => '12',
                'tahun' => 2025,
                'tanggal_bayar' => '2026-01-09',
                'tanggal_lapor' => '2026-01-18',
                'nop' => '01.345.890.1-012.000',
                'nominal' => 76400000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 21 Masa Desember (Termasuk Perhitungan Pajak Tahunan Form 1721-A1 & Bonus Tahunan Karyawan HO).',
                'pembetulans' => [
                    [
                        'keterangan' => 'Pembetulan 1 - Penyesuaian tarif TER dan pembulatan potongan bonus manajemen akhir tahun.',
                        'tanggal_bayar' => '2026-01-25',
                        'tanggal_lapor' => '2026-01-28',
                        'nop' => '01.345.890.1-012.000',
                        'nominal' => 79100000,
                        'nilai_sewa' => null,
                        'pajak_10_persen' => null,
                    ]
                ]
            ],
            [
                'ap' => 'PT MUSTIKA JAYA LESTARI',
                'jenis_pajak' => 'PPN',
                'bulan' => '12',
                'tahun' => 2025,
                'tanggal_bayar' => '2026-01-29',
                'tanggal_lapor' => '2026-01-31',
                'nop' => '01.345.890.1-012.000',
                'nominal' => 186500000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'SPT PPN Masa Desember 2025 Tutup Buku Tahunan PT Mustika Jaya Lestari.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT MUSTIKA JAYA LESTARI',
                'jenis_pajak' => 'PPh 29',
                'bulan' => '04',
                'tahun' => 2025,
                'tanggal_bayar' => '2025-04-29',
                'tanggal_lapor' => '2025-04-30',
                'nop' => '01.345.890.1-012.000',
                'nominal' => 215000000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 29 Kurang Bayar SPT Tahunan PPh Badan Tahun Pajak 2024.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT MUSTIKA JAYA LESTARI',
                'jenis_pajak' => 'PPh Pasal 4 Ayat 2',
                'bulan' => '11',
                'tahun' => 2025,
                'tanggal_bayar' => '2025-12-08',
                'tanggal_lapor' => '2025-12-15',
                'nop' => '01.345.890.1-012.000',
                'nominal' => 24000000,
                'nilai_sewa' => 240000000,
                'pajak_10_persen' => 24000000,
                'uraian' => 'PPh Final Jasa Konstruksi Pembangunan Gedung Pusat Logistik Pakan Mustika di Ungaran.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT MUSTIKA JAYA LESTARI',
                'jenis_pajak' => 'PPh 23',
                'bulan' => '10',
                'tahun' => 2025,
                'tanggal_bayar' => '2025-11-09',
                'tanggal_lapor' => '2025-11-18',
                'nop' => '01.345.890.1-012.000',
                'nominal' => 14800000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 23 Jasa Audit Laporan Keuangan Independen KAP & Konsultan Pajak.',
                'pembetulans' => []
            ],

            // PT MITRA UNGGAS MAKMUR - 2025
            [
                'ap' => 'PT MITRA UNGGAS MAKMUR',
                'jenis_pajak' => 'PPh 21',
                'bulan' => '12',
                'tahun' => 2025,
                'tanggal_bayar' => '2026-01-08',
                'tanggal_lapor' => '2026-01-17',
                'nop' => '02.456.789.2-501.000',
                'nominal' => 38200000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 21 Masa Desember 2025 (Perhitungan Pajak Akhir Tahun 1721-A1 Farm Karyawan).',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT MITRA UNGGAS MAKMUR',
                'jenis_pajak' => 'PPN',
                'bulan' => '11',
                'tahun' => 2025,
                'tanggal_bayar' => '2025-12-29',
                'tanggal_lapor' => '2025-12-31',
                'nop' => '02.456.789.2-501.000',
                'nominal' => 94200000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'SPT PPN Masa November 2025 Penjualan Daging Ayam Karkas & Livebird.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT MITRA UNGGAS MAKMUR',
                'jenis_pajak' => 'PPh 25',
                'bulan' => '09',
                'tahun' => 2025,
                'tanggal_bayar' => '2025-10-14',
                'tanggal_lapor' => '2025-10-15',
                'nop' => '02.456.789.2-501.000',
                'nominal' => 35000000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'Angsuran PPh 25 Badan Masa September 2025.',
                'pembetulans' => []
            ],

            // PT ANEKA INTAN LESTARI - 2025
            [
                'ap' => 'PT ANEKA INTAN LESTARI',
                'jenis_pajak' => 'PPh 21',
                'bulan' => '10',
                'tahun' => 2025,
                'tanggal_bayar' => '2025-11-08',
                'tanggal_lapor' => '2025-11-15',
                'nop' => '03.789.123.4-512.000',
                'nominal' => 19750000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 21 Pegawai Tetap & Tenaga Kerja Harian Lepas Bulan Oktober 2025.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT ANEKA INTAN LESTARI',
                'jenis_pajak' => 'PPh Pasal 4 Ayat 2',
                'bulan' => '08',
                'tahun' => 2025,
                'tanggal_bayar' => '2025-09-09',
                'tanggal_lapor' => '2025-09-17',
                'nop' => '03.789.123.4-512.000',
                'nominal' => 15000000,
                'nilai_sewa' => 150000000,
                'pajak_10_persen' => 15000000,
                'uraian' => 'PPh Final Sewa Lahan Farm Kemitraan Klaten untuk 2 Unit Kandang Close-House.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT ANEKA INTAN LESTARI',
                'jenis_pajak' => 'PPN',
                'bulan' => '09',
                'tahun' => 2025,
                'tanggal_bayar' => '2025-10-29',
                'tanggal_lapor' => '2025-10-31',
                'nop' => '03.789.123.4-512.000',
                'nominal' => 74800000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'SPT PPN Masa September 2025 atas Penjualan Pakan & OVK Peternakan.',
                'pembetulans' => [
                    [
                        'keterangan' => 'Pembetulan 1 - Nota Retur Pembatalan Faktur Pajak Penjualan Pakan Rusak Saat Pengiriman.',
                        'tanggal_bayar' => '2025-11-12',
                        'tanggal_lapor' => '2025-11-18',
                        'nop' => '03.789.123.4-512.000',
                        'nominal' => 71300000,
                        'nilai_sewa' => null,
                        'pajak_10_persen' => null,
                    ]
                ]
            ],

            // PT LAWU ABADI NUSA - 2025
            [
                'ap' => 'PT LAWU ABADI NUSA',
                'jenis_pajak' => 'PPN',
                'bulan' => '08',
                'tahun' => 2025,
                'tanggal_bayar' => '2025-09-28',
                'tanggal_lapor' => '2025-09-30',
                'nop' => '04.112.334.5-528.000',
                'nominal' => 61200000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'SPT PPN Masa Agustus 2025 Distribusi Ayam Potong Area Soloraya.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT LAWU ABADI NUSA',
                'jenis_pajak' => 'PPh 23',
                'bulan' => '07',
                'tahun' => 2025,
                'tanggal_bayar' => '2025-08-08',
                'tanggal_lapor' => '2025-08-15',
                'nop' => '04.112.334.5-528.000',
                'nominal' => 6800000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 23 Jasa Sewa Armada Dump Truk Pengangkut Sekam & Kotoran Ayam.',
                'pembetulans' => []
            ],

            // PT MURIA JAYA RAYA - 2025
            [
                'ap' => 'PT MURIA JAYA RAYA',
                'jenis_pajak' => 'PPh 22',
                'bulan' => '09',
                'tahun' => 2025,
                'tanggal_bayar' => '2025-10-09',
                'tanggal_lapor' => '2025-10-17',
                'nop' => '05.223.445.6-506.000',
                'nominal' => 12500000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 22 Pembelian Jagung dan Dedak dari Supplier Daerah Grobogan & Blora.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT MURIA JAYA RAYA',
                'jenis_pajak' => 'PPh 25',
                'bulan' => '08',
                'tahun' => 2025,
                'tanggal_bayar' => '2025-09-12',
                'tanggal_lapor' => '2025-09-15',
                'nop' => '05.223.445.6-506.000',
                'nominal' => 28000000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'Angsuran PPh 25 Badan Masa Agustus 2025 PT Muria Jaya Raya.',
                'pembetulans' => []
            ],

            // PT KEDU LINTAS BERBINTANG - 2025
            [
                'ap' => 'PT KEDU LINTAS BERBINTANG',
                'jenis_pajak' => 'PPh 21',
                'bulan' => '11',
                'tahun' => 2025,
                'tanggal_bayar' => '2025-12-09',
                'tanggal_lapor' => '2025-12-16',
                'nop' => '06.334.556.7-524.000',
                'nominal' => 23100000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 21 Pegawai Masa November 2025 Magelang & Temanggung.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT KEDU LINTAS BERBINTANG',
                'jenis_pajak' => 'PPh 23',
                'bulan' => '09',
                'tahun' => 2025,
                'tanggal_bayar' => '2025-10-08',
                'tanggal_lapor' => '2025-10-18',
                'nop' => '06.334.556.7-524.000',
                'nominal' => 7900000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 23 Jasa Perawatan Mesin Pemanas Kandang & Generator Listrik.',
                'pembetulans' => []
            ],

            // PT BAROKAH RESTU UTAMA - 2025
            [
                'ap' => 'PT BAROKAH RESTU UTAMA',
                'jenis_pajak' => 'PPh Pasal 4 Ayat 2',
                'bulan' => '07',
                'tahun' => 2025,
                'tanggal_bayar' => '2025-08-08',
                'tanggal_lapor' => '2025-08-15',
                'nop' => '07.445.667.8-517.000',
                'nominal' => 11000000,
                'nilai_sewa' => 110000000,
                'pajak_10_persen' => 11000000,
                'uraian' => 'PPh Final Sewa Fasilitas Gudang Pakan & Obat Boyolali.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT BAROKAH RESTU UTAMA',
                'jenis_pajak' => 'PPN',
                'bulan' => '10',
                'tahun' => 2025,
                'tanggal_bayar' => '2025-11-28',
                'tanggal_lapor' => '2025-11-30',
                'nop' => '07.445.667.8-517.000',
                'nominal' => 49500000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'SPT PPN Masa Oktober 2025 Penjualan Broiler Hidup ke Pedagang Pasar.',
                'pembetulans' => []
            ],

            // PT BINTANG TERANG BERSINAR - 2025
            [
                'ap' => 'PT BINTANG TERANG BERSINAR',
                'jenis_pajak' => 'PPh 21',
                'bulan' => '11',
                'tahun' => 2025,
                'tanggal_bayar' => '2025-12-08',
                'tanggal_lapor' => '2025-12-15',
                'nop' => '08.556.778.9-531.000',
                'nominal' => 14700000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 21 Karyawan Unit Banyumas Masa November 2025.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT BINTANG TERANG BERSINAR',
                'jenis_pajak' => 'PPh 25',
                'bulan' => '10',
                'tahun' => 2025,
                'tanggal_bayar' => '2025-11-12',
                'tanggal_lapor' => '2025-11-15',
                'nop' => '08.556.778.9-531.000',
                'nominal' => 19000000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'Angsuran Bulanan PPh 25 Badan Masa Oktober 2025.',
                'pembetulans' => []
            ],

            // PT GILAR PERWIRA SATRIA - 2025
            [
                'ap' => 'PT GILAR PERWIRA SATRIA',
                'jenis_pajak' => 'PPN',
                'bulan' => '08',
                'tahun' => 2025,
                'tanggal_bayar' => '2025-09-29',
                'tanggal_lapor' => '2025-09-30',
                'nop' => '09.667.889.0-532.000',
                'nominal' => 45600000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'SPT PPN Masa Agustus 2025 Hasil Panen Kemitraan Farm Banjarnegara.',
                'pembetulans' => []
            ],

            // PT KARYA SATWA MULIA - 2025
            [
                'ap' => 'PT KARYA SATWA MULIA',
                'jenis_pajak' => 'PPh 23',
                'bulan' => '08',
                'tahun' => 2025,
                'tanggal_bayar' => '2025-09-08',
                'tanggal_lapor' => '2025-09-18',
                'nop' => '10.778.990.1-508.000',
                'nominal' => 6400000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 23 Pemotongan Jasa Kebersihan dan Desinfeksi Lingkungan Kandang.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT KARYA SATWA MULIA',
                'jenis_pajak' => 'PPh 25',
                'bulan' => '11',
                'tahun' => 2025,
                'tanggal_bayar' => '2025-12-12',
                'tanggal_lapor' => '2025-12-15',
                'nop' => '10.778.990.1-508.000',
                'nominal' => 26000000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'Angsuran PPh 25 Badan Masa November 2025.',
                'pembetulans' => []
            ],

            // PT LAJU SATWA WISESA - 2025
            [
                'ap' => 'PT LAJU SATWA WISESA',
                'jenis_pajak' => 'PPh 21',
                'bulan' => '10',
                'tahun' => 2025,
                'tanggal_bayar' => '2025-11-09',
                'tanggal_lapor' => '2025-11-15',
                'nop' => '11.889.001.2-503.000',
                'nominal' => 21000000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 21 Karyawan Unit Logistik & Distribusi Semarang Masa Oktober 2025.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT LAJU SATWA WISESA',
                'jenis_pajak' => 'PPN',
                'bulan' => '09',
                'tahun' => 2025,
                'tanggal_bayar' => '2025-10-28',
                'tanggal_lapor' => '2025-10-31',
                'nop' => '11.889.001.2-503.000',
                'nominal' => 82000000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'SPT PPN Masa September 2025 Jasa Angkutan & Logistik Terpadu.',
                'pembetulans' => []
            ],

            // PT MITRA MAHKOTA BUANA - 2025
            [
                'ap' => 'PT MITRA MAHKOTA BUANA',
                'jenis_pajak' => 'PPh 22',
                'bulan' => '08',
                'tahun' => 2025,
                'tanggal_bayar' => '2025-09-08',
                'tanggal_lapor' => '2025-09-15',
                'nop' => '12.990.112.3-511.000',
                'nominal' => 15800000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 22 Pembelian Jagung Pakan Ternak Petani Tegal.',
                'pembetulans' => []
            ],

            // PT MITRA PETERNAKAN UNGGAS - 2025
            [
                'ap' => 'PT MITRA PETERNAKAN UNGGAS',
                'jenis_pajak' => 'PPh 21',
                'bulan' => '11',
                'tahun' => 2025,
                'tanggal_bayar' => '2025-12-08',
                'tanggal_lapor' => '2025-12-14',
                'nop' => '13.001.223.4-521.000',
                'nominal' => 25800000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'PPh 21 Gaji Staf dan Petugas Kemitraan Lapangan Wilayah Pekalongan & Batang.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT MITRA PETERNAKAN UNGGAS',
                'jenis_pajak' => 'PPN',
                'bulan' => '10',
                'tahun' => 2025,
                'tanggal_bayar' => '2025-11-28',
                'tanggal_lapor' => '2025-11-30',
                'nop' => '13.001.223.4-521.000',
                'nominal' => 63400000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'SPT PPN Masa Oktober 2025 atas Pengiriman DOC Broiler & Pakan Unggas.',
                'pembetulans' => []
            ],

            // PT SAWUNG GEMA ABADI - 2025
            [
                'ap' => 'PT SAWUNG GEMA ABADI',
                'jenis_pajak' => 'PPh Pasal 4 Ayat 2',
                'bulan' => '09',
                'tahun' => 2025,
                'tanggal_bayar' => '2025-10-10',
                'tanggal_lapor' => '2025-10-17',
                'nop' => '14.112.334.5-515.000',
                'nominal' => 14000000,
                'nilai_sewa' => 140000000,
                'pajak_10_persen' => 14000000,
                'uraian' => 'PPh Final Sewa Bangunan Cold Storage & Pemrosesan Daging Sukoharjo.',
                'pembetulans' => []
            ],
            [
                'ap' => 'PT SAWUNG GEMA ABADI',
                'jenis_pajak' => 'PPN',
                'bulan' => '11',
                'tahun' => 2025,
                'tanggal_bayar' => '2025-12-29',
                'tanggal_lapor' => '2025-12-31',
                'nop' => '14.112.334.5-515.000',
                'nominal' => 77300000,
                'nilai_sewa' => null,
                'pajak_10_persen' => null,
                'uraian' => 'SPT PPN Masa November 2025 Penjualan Ayam Olahan Frozen Segmen Horeka.',
                'pembetulans' => []
            ],
        ];

        foreach ($dataset as $row) {
            $pembetulans = $row['pembetulans'] ?? [];
            unset($row['pembetulans']);

            $laporan = TaxLaporanMasa::create($row);

            foreach ($pembetulans as $pem) {
                $laporan->pembetulans()->create($pem);
            }
        }
    }
}
