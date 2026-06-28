<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();

        $sortField = $request->input('sort_field', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');

        $allowedSorts = ['name', 'nik', 'email', 'nowa', 'region', 'unit', 'jabatan', 'roles'];
        if (in_array($sortField, $allowedSorts)) {
            $query->orderBy($sortField, $sortDirection === 'asc' ? 'asc' : 'desc');
        } else {
            $query->latest();
        }

        if ($request->has('search') && $request->search != '') {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('nik', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $perPage = $request->input('per_page', 10);
        $users = $query->paginate($perPage)->withQueryString();
        
        $regions = \App\Models\Region::select('koderegion', 'namaregion')->get();
        $units = \App\Models\Unit::select('kodeunit', 'namaunit', 'region')->where('aktif', 'Y')->get();
        $jabatans = \App\Models\Jabatan::select('nama')->orderBy('nama', 'asc')->get();
        
        return Inertia::render('Master/Users/Index', [
            'users' => $users,
            'regions' => $regions,
            'units' => $units,
            'jabatans' => $jabatans,
            'filters' => [
                'search' => $request->search,
                'sort_field' => $sortField,
                'sort_direction' => $sortDirection,
                'per_page' => $perPage,
            ]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'nik' => 'required|string|max:255|unique:users',
            'email' => 'nullable|string|email|max:255|unique:users',
            'roles' => 'nullable|string',
            'region' => 'nullable|string',
            'unit' => 'nullable|string',
            'jabatan' => 'nullable|string',
        ]);

        $defaultPassword = 'Mustika@' . date('Y');
        $password = empty($request->password) 
            ? \Illuminate\Support\Facades\Hash::make($defaultPassword) 
            : \Illuminate\Support\Facades\Hash::make($request->password);

        User::create([
            'name' => strtoupper($request->name),
            'nik' => $request->nik,
            'email' => $request->email,
            'region' => $request->region,
            'unit' => $request->unit,
            'multiunit' => $request->multiunit ? json_encode($request->multiunit) : null,
            'jabatan' => $request->jabatan,
            'roles' => $request->roles,
            'nowa' => $request->nowa,
            'password' => $password,
        ]);

        return redirect()->back()->with('success', 'User berhasil ditambahkan');
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'nik' => 'required|string|max:255|unique:users,nik,' . $user->id,
            'email' => 'nullable|string|email|max:255|unique:users,email,' . $user->id,
            'roles' => 'nullable|string',
            'region' => 'nullable|string',
            'unit' => 'nullable|string',
            'jabatan' => 'nullable|string',
        ]);

        $updateData = [
            'name' => strtoupper($request->name),
            'nik' => $request->nik,
            'email' => $request->email,
            'region' => $request->region,
            'unit' => $request->unit,
            'multiunit' => $request->multiunit ? json_encode($request->multiunit) : null,
            'jabatan' => $request->jabatan,
            'roles' => $request->roles,
            'nowa' => $request->nowa,
        ];

        if (!empty($request->password)) {
            $updateData['password'] = \Illuminate\Support\Facades\Hash::make($request->password);
        }

        $user->update($updateData);

        return redirect()->back()->with('success', 'User berhasil diperbarui');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->back()->with('success', 'User berhasil dihapus');
    }

    public function generate(User $user)
    {
        $allowedApps = [
            'bangkok' => false, 'appdoc' => false, 'erp' => false, 
            'nextcloud' => false, 'mis' => true, 'zimbra' => false, 'bpm' => true
        ];

        $jabatanConfig = [
            'KEPALA PRODUKSI' => ['apps' => ['erp', 'mis', 'zimbra']],
            'KEPALA UNIT'     => ['apps' => ['erp', 'mis', 'zimbra']],
            'KEPALA CABANG'   => ['apps' => ['erp', 'mis', 'zimbra']],
            'SALES'           => ['apps' => ['erp', 'mis', 'zimbra']],
            'SALES SUPPORT'   => ['apps' => ['mis']],
            'ASISTEN DIREKTUR'=> ['apps' => ['erp', 'appdoc', 'mis', 'nextcloud', 'zimbra']],
            'STAFF REGION'    => ['apps' => ['erp', 'appdoc', 'mis', 'nextcloud', 'zimbra']],
            'ADMIN PRODUKSI'  => ['apps' => ['erp', 'appdoc', 'mis', 'nextcloud', 'zimbra']],
            'ADMIN LOGISTIK'  => ['apps' => ['erp', 'appdoc', 'mis', 'nextcloud', 'zimbra']],
            'ADMIN KEUANGAN'  => ['apps' => ['erp', 'appdoc', 'mis', 'nextcloud', 'zimbra']],
            'ADMIN FINANCE'   => ['apps' => ['erp', 'appdoc', 'mis', 'nextcloud', 'zimbra']],
            'STAFF FINANCE'   => ['apps' => ['erp', 'appdoc', 'mis', 'nextcloud', 'zimbra']],
            'SUPERVISOR FINANCE' => ['apps' => ['erp', 'appdoc', 'mis', 'nextcloud', 'zimbra']],
            'KEPALA KEUANGAN' => ['apps' => ['erp', 'appdoc', 'mis', 'nextcloud', 'zimbra']],
            'STAFF IT'        => ['apps' => ['erp', 'appdoc', 'mis', 'nextcloud', 'zimbra', 'bangkok']],
            'TECHNICAL SUPPORT'     => ['apps' => ['mis']],
            'GENERAL SUPPORT'       => ['apps' => ['mis']],
            'ELECTRICAL TECHNICIAN' => ['apps' => ['mis']],
            'FARM SUPPORT'          => ['apps' => ['mis']],
        ];

        if (in_array($user->roles, ['admin', 'pusat'])) {
            $allowedApps = array_fill_keys(array_keys($allowedApps), true);
        } elseif ($user->roles === 'region') {
            $allowedApps['erp'] = true;
            $allowedApps['zimbra'] = true;
        } else {
            $jabatan = strtoupper($user->jabatan ?? '');
            if (isset($jabatanConfig[$jabatan])) {
                foreach ($jabatanConfig[$jabatan]['apps'] as $app) {
                    $allowedApps[$app] = true;
                }
            }
        }

        $firstName = strtolower(explode(' ', $user->name)[0]);
        $defaultPassword = 'Mustika@' . date('Y');
        
        $accounts = [
            [
                'app_key' => 'mis',
                'name' => 'MIS Portal',
                'link' => 'https://mis.ptmjl.co.id',
                'username' => $user->nik,
                'password' => $defaultPassword,
                'note' => '(Default)',
            ],
            [
                'app_key' => 'erp',
                'name' => 'ERP Agrinis',
                'link' => 'https://erp.agrinis.com',
                'username' => $user->nik,
                'password' => $defaultPassword,
                'note' => '(Default)',
            ],
            [
                'app_key' => 'zimbra',
                'name' => 'Email Zimbra',
                'link' => 'https://mail.ptmjl.co.id',
                'username' => $firstName . '.' . strtolower(str_replace(' ', '', $user->unit ?? $user->region ?? 'pusat')) . '@ptmjl.co.id',
                'password' => $defaultPassword,
                'note' => '(Harus ganti saat login)',
            ],
            [
                'app_key' => 'nextcloud',
                'name' => 'Nextcloud Storage',
                'link' => 'https://cloud.ptmjl.co.id',
                'username' => $user->nik,
                'password' => $defaultPassword,
                'note' => '',
            ],
            [
                'app_key' => 'appdoc',
                'name' => 'AppDoc',
                'link' => 'https://doc.ptmjl.co.id',
                'username' => $user->nik,
                'password' => $defaultPassword,
                'note' => '',
            ],
            [
                'app_key' => 'bpm',
                'name' => 'BPM System',
                'link' => 'https://bpm.ptmjl.co.id',
                'username' => $user->nik,
                'password' => $defaultPassword,
                'note' => '',
            ],
            [
                'app_key' => 'bangkok',
                'name' => 'Server Bangkok',
                'link' => 'https://bangkok.ptmjl.co.id',
                'username' => $user->nik,
                'password' => $defaultPassword,
                'note' => '',
            ],
        ];

        $filteredAccounts = array_values(array_filter($accounts, function($acc) use ($allowedApps) {
            return $allowedApps[$acc['app_key']] ?? false;
        }));

        return Inertia::render('Master/Users/Generate', [
            'target_user' => $user,
            'accounts' => $filteredAccounts
        ]);
    }
}
