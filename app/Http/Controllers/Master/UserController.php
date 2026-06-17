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
        $query = User::latest();

        if ($request->has('search') && $request->search != '') {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('nik', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $users = $query->paginate(10)->withQueryString();
        
        $regions = \App\Models\Region::select('koderegion', 'namaregion')->get();
        $units = \App\Models\Unit::select('kodeunit', 'namaunit', 'region')->where('aktif', 'Y')->get();
        $jabatans = \App\Models\Jabatan::select('nama')->orderBy('nama', 'asc')->get();
        
        return Inertia::render('Master/Users/Index', [
            'users' => $users,
            'regions' => $regions,
            'units' => $units,
            'jabatans' => $jabatans,
            'filters' => [
                'search' => $request->search
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
}
