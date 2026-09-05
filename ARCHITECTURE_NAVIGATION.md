# Standar Arsitektur Navigasi & Layering Menu MIS

Dokumen ini mendefinisikan standar **Information Architecture (IA)**, hierarki layer navigasi, konvensi routing, dan pola antarmuka pengguna (UI/UX) pada aplikasi **MIS (Management Information System)**.

---

## 1. Hierarki Layer Navigasi

Sistem navigasi MIS distandarisasi ke dalam **5 tingkat hierarki (Layer 0 s.d. Layer 4)**:

```mermaid
flowchart TD
    L0["Layer 0: Root / Home (Beranda Dashboard)"] --> L1["Layer 1: Departemen / Domain Group (Sidebar Dropdown)"]
    L1 --> L2["Layer 2: Portal Hub / Modul Utama (Sidebar Link)"]
    L2 --> L3["Layer 3: Feature / Working Page (Tabel & Form Kerja)"]
    L3 --> L4["Layer 4: Contextual Actions & Modals (Dialog / Drawer)"]
```

### Rincian Definisi Layer

| Layer | Nama Layer | Elemen di Aplikasi | Karakteristik & Fungsi | Contoh Real di MIS |
| :--- | :--- | :--- | :--- | :--- |
| **Layer 0** | **Root / Home** | Main MIS Dashboard | Halaman beranda utama tempat ringkasan eksekutif, widget global, dan navigasi awal. | `Beranda` (`/dashboard`) |
| **Layer 1** | **Departemen / Group** | Dropdown Group di Sidebar | Pengelompokan logis berdasarkan divisi operasional / fungsi bisnis perusahaan. | Group **TAF**, **Operasional**, **SDM**, **Corp Com**, **Master** |
| **Layer 2** | **Portal Hub / Modul** | **Link yang diklik di Sidebar** | Halaman hub katalog yang menampilkan kartu-kartu sub-modul dan metrik ringkas per domain. | **Tax** (`/tax`), **Quality Assurance** (`/qa`), **DOC**, **Pengguna** |
| **Layer 3** | **Feature / Working Page** | Kartu / Menu di dalam Portal Hub | Halaman kerja operasional utama (Data Table, Filter, Pagination, Export/Import). | **Laporan Masa** (`/tax/laporan-masa`), **SOP QA**, **STP** |
| **Layer 4** | **Sub-Action / Modals** | Dialog Modal / Drawer Form | Aksi kontekstual mendalam per baris data atau entri baru tanpa meninggalkan halaman. | **Modal Pembetulan**, **Modal Uraian**, **Form Add/Edit** |

> **Catatan Direct Bypass (Layer 2 ke 3):**  
> Jika suatu modul master/operasional tidak memiliki halaman portal katalog (misalnya *Master Pengguna* atau *DOC*), link di sidebar langsung mengarahkan user ke **Layer 3 (Working Page)**.

---

## 2. Pemetaan Modul & Domain Eksisting

```text
├── Layer 0: Beranda (/dashboard)
│
├── Layer 1: Operasional
│   ├── Layer 2: Produksi
│   ├── Layer 3: DOC (/operation/doc) [Bypass Layer 2]
│   ├── Layer 2: Pakan & OVK
│   └── Layer 2: Penjualan
│
├── Layer 1: SDM (Sumber Daya Manusia)
│   ├── Layer 2: Personalia
│   ├── Layer 2: Pelatihan & Pengembangan
│   └── Layer 2: Audit Internal
│
├── Layer 1: TAF (Tax, Accounting, Finance)
│   ├── Layer 2: Accounting
│   ├── Layer 2: Finance
│   └── Layer 2: Tax (/tax) -> Portal Hub
│       ├── Layer 3: Laporan Masa (/tax/laporan-masa)
│       │   ├── Layer 4: Modal Tambah / Edit Laporan
│       │   ├── Layer 4: Modal Riwayat Pembetulan SPT
│       │   └── Layer 4: Modal Catatan Uraian
│       ├── Layer 3: Surat Tagihan Pajak (STP)
│       ├── Layer 3: Laporan PPh Unifikasi
│       ├── Layer 3: Rekap Pajak per AP
│       └── Layer 3: Rekap Gabungan Pajak
│
├── Layer 1: Corp Com & QA
│   ├── Layer 2: Monitoring & Reporting
│   └── Layer 2: Quality Assurance (/qa) -> Portal Hub
│       ├── Layer 3: Standar Operasional Prosedur (SOP)
│       ├── Layer 3: Surat Edaran
│       └── Layer 3: Log Dokumen (Menu Logdoc)
│
├── Layer 1: Data Master
│   └── Layer 3: Pengguna (/master/users) [Bypass Layer 2]
│
└── Layer 1: Pengaturan Sistem
    ├── Layer 3: Ubah Profil (/profile)
    └── Layer 3: Reset Kata Sandi (/settings/password)
```

---

## 3. Konvensi Breadcrumb & Routing

Setiap halaman di **Layer 3** wajib menyertakan komponen `<PageHeader />` dengan breadcrumb yang mencerminkan hierarki layer:

```jsx
<PageHeader
    title="Laporan Masa Pajak"
    breadcrumbs={[
        { label: 'Portal Tax', href: route('tax.portal') }, // Layer 2
        { label: 'Laporan Masa', href: null },              // Layer 3 (Active)
    ]}
/>
```

### Pola Penamaan Route URL:
- **Layer 2 (Portal):** `/{domain}` *(contoh: `/tax`, `/qa`)*
- **Layer 3 (Feature):** `/{domain}/{sub-fitur}` *(contoh: `/tax/laporan-masa`, `/qa/sop`)*
- **Layer 3 Direct:** `/{domain}/{master}` *(contoh: `/master/users`)*

---

## 4. Panduan Penambahan Modul Baru (Developer Guide)

1. **Tentukan Layering:**
   - Jika modul memiliki > 2 sub-fitur dengan domain terkait, buat **Portal Hub (Layer 2)** terlebih dahulu.
   - Jika modul tunggal berdiri sendiri (misal: Master Table), langsung arahkan sebagai **Direct Feature (Layer 3)**.
2. **Daftarkan ke Sidebar:**
   - Masukkan `SidebarLink` di dalam `SidebarDropdown` departemen yang relevan di `resources/js/Layouts/AuthenticatedLayout.jsx`.
3. **Standarisasi Tampilan Layer 3:**
   - Wajib menggunakan komponen bersama: `DataTable`, `Pagination`, `PageActions`, `Tabs`, dan filter standar AP/Tahun.
   - Aksi detail baris (seperti riwayat revisi atau catatan) ditangani via `DialogModal` di **Layer 4**.
