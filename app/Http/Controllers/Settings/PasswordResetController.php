<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;

class PasswordResetController extends Controller
{
    public function index()
    {
        $user = Auth::user();

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
        
        $accounts = [
            [
                'app_key' => 'mis',
                'name' => 'MIS Portal',
                'link' => 'https://mis.ptmjl.co.id',
                'username' => $user->nik,
            ],
            [
                'app_key' => 'erp',
                'name' => 'ERP Agrinis',
                'link' => 'https://erp.agrinis.com',
                'username' => $user->nik,
            ],
            [
                'app_key' => 'zimbra',
                'name' => 'Email Zimbra',
                'link' => 'https://mail.ptmjl.co.id',
                'username' => $firstName . '.' . strtolower(str_replace(' ', '', $user->unit ?? $user->region ?? 'pusat')) . '@ptmjl.co.id',
            ],
            [
                'app_key' => 'nextcloud',
                'name' => 'Nextcloud Storage',
                'link' => 'https://cloud.ptmjl.co.id',
                'username' => $user->nik,
            ],
            [
                'app_key' => 'appdoc',
                'name' => 'AppDoc',
                'link' => 'https://doc.ptmjl.co.id',
                'username' => $user->nik,
            ],
            [
                'app_key' => 'bpm',
                'name' => 'BPM System',
                'link' => 'https://bpm.ptmjl.co.id',
                'username' => $user->nik,
            ],
            [
                'app_key' => 'bangkok',
                'name' => 'Server Bangkok',
                'link' => 'https://bangkok.ptmjl.co.id',
                'username' => $user->nik,
            ],
        ];

        $filteredAccounts = array_values(array_filter($accounts, function($acc) use ($allowedApps) {
            return $allowedApps[$acc['app_key']] ?? false;
        }));

        return Inertia::render('Settings/ResetPassword', [
            'accounts' => $filteredAccounts
        ]);
    }

    public function reset(Request $request)
    {
        $request->validate([
            'target_app' => 'required|string',
            'username'   => 'required|string',
            'new_password' => [
                'required',
                'string',
                'min:8',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/'
            ],
        ], [
            'new_password.required' => 'Password tidak boleh kosong.',
            'new_password.min'      => 'Password minimal harus 8 karakter.',
            'new_password.regex'    => 'Password harus mengandung kombinasi Huruf Besar, Huruf Kecil, Angka, dan Karakter Khusus (!@#$%^&*).',
        ]);

        $user = Auth::user();
        $targetApp = strtoupper($request->target_app);
        $newPassword = $request->new_password;
        
        // Gunakan NIK bawaan khusus untuk aplikasi MIS sebagai jaminan karena MIS tied to the session
        // Untuk aplikasi lain (ERP, ZIMBRA), gunakan username input manual dari form
        $username = ($targetApp == 'MIS') ? $user->nik : $request->username;

        if ($targetApp == 'ERP') {
            $regionsToReset = [$user->region];
            
            if ($user->region == 'MJL' || in_array($user->roles, ['admin', 'pusat'])) {
                $allRegions = DB::table('regions')->pluck('koderegion')->toArray();
                $regionsToReset = array_unique(array_merge($allRegions, ['MJL']));
            }

            $successCount = 0;
            $failCount = 0;
            $errorDetails = [];
            $baseUrl = 'https://publicapi.agrinis.com';

            foreach ($regionsToReset as $targetRegion) {
                if (empty($targetRegion)) continue;
                $apiUrl = "{$baseUrl}/index.php/X7mtDYbC6Jr9ZRrn/Ap_apis/update_password_user/{$targetRegion}";

                try {
                    $response = Http::withHeaders([
                        'x-api-key'    => 'devmustikaapaccess',
                        'Content-Type' => 'application/json',
                        'Accept'       => 'application/json'
                    ])->timeout(10)->put($apiUrl, [
                        'user_name'    => $username,
                        'new_password' => $newPassword
                    ]);

                    $responseBody = $response->json();

                    if ($response->successful() && isset($responseBody['meta']['code']) && $responseBody['meta']['code'] == 200) {
                        $successCount++;
                    } else {
                        $failCount++;
                        $errorDetails[] = $targetRegion . ": " . ($responseBody['meta']['message'] ?? 'API Error');
                    }
                } catch (\Exception $e) {
                    $failCount++;
                    $errorDetails[] = $targetRegion . ": Connection Failed";
                }
            }

            if ($successCount > 0) {
                $msg = "Password ERP berhasil diperbarui.";
                if (count($regionsToReset) > 1) {
                    $msg = "Password ERP (Multi-Region) berhasil diperbarui. Sukses: {$successCount}, Gagal: {$failCount}.";
                }
                return redirect()->back()->with('success', $msg);
            } else {
                $detailedError = !empty($errorDetails) ? " Detail: " . implode(', ', array_slice($errorDetails, 0, 3)) : "";
                return redirect()->back()->with('error', 'Gagal update API ERP di semua region target.' . $detailedError);
            }
        } elseif ($targetApp == 'ZIMBRA') {
            try {
                $zimbraUrl = 'https://mail.ptmjl.co.id:7071/service/admin/soap/';
                $zimbraUser = 'mis-admin@ptmjl.co.id';
                $zimbraPass = 'Mustika#2017!';

                $authPayload = [
                    'Body' => [
                        'AuthRequest' => [
                            '_jsns' => 'urn:zimbraAdmin',
                            'name' => $zimbraUser,
                            'password' => $zimbraPass,
                        ],
                    ],
                ];

                $authResponse = Http::withOptions(['verify' => false])->post($zimbraUrl, $authPayload);
                $authJson = $authResponse->json();

                if (!isset($authJson['Body']['AuthResponse']['authToken'][0]['_content'])) {
                    throw new \Exception("Zimbra Auth Failed");
                }

                $authToken = $authJson['Body']['AuthResponse']['authToken'][0]['_content'];
                $emailsToReset = [];

                $mainEmail = $username;
                
                $emailsToReset[] = $mainEmail;

                if ($user->region == 'MJL' || in_array($user->roles, ['admin', 'pusat'])) {
                    $allRegions = DB::table('regions')->pluck('koderegion')->toArray();
                    // Jika username adalah email format nama (misal budi.s@ptmjl.co.id), kita extract dan gabungkan dengan region
                    // Karena struktur zimbra adalah: region.nik@ptmjl.co.id untuk user cabang.
                    // Namun karena input manual ini bisa apa saja, kita hanya fokus mereset akun yang DI-INPUTKAN
                    // Jika dia admin pusat dan mengetik email tertentu, maka kita reset email spesifik itu saja
                    // Kecuali jika emailnya mengandung NIK, kita reset ke semua region.
                    // Untuk amannya, karena ini akun manual, kita hanya mereset username YANG DIINPUTKAN.
                }
                
                $emailsToReset = array_unique($emailsToReset);
                $successCount = 0;
                $resetResults = [];

                foreach ($emailsToReset as $email) {
                    $getPayload = [
                        'Header' => ['context' => ['_jsns' => 'urn:zimbra', 'authToken' => $authToken]],
                        'Body' => ['GetAccountRequest' => ['_jsns' => 'urn:zimbraAdmin', 'account' => ['_content' => $email, 'by' => 'name']]]
                    ];
                    $getResponse = Http::withOptions(['verify' => false])->post($zimbraUrl, $getPayload);
                    $getJson = $getResponse->json();

                    if (!isset($getJson['Body']['GetAccountResponse']['account'][0]['id'])) {
                        continue;
                    }

                    $accountId = $getJson['Body']['GetAccountResponse']['account'][0]['id'];

                    $modifyPayload = [
                        'Header' => ['context' => ['_jsns' => 'urn:zimbra', 'authToken' => $authToken]],
                        'Body' => [
                            'ModifyAccountRequest' => [
                                '_jsns' => 'urn:zimbraAdmin',
                                'id' => $accountId,
                                'a' => [
                                    ['n' => 'userPassword', '_content' => $newPassword],
                                    ['n' => 'zimbraAccountStatus', '_content' => 'active'],
                                    ['n' => 'zimbraPasswordMustChange', '_content' => 'FALSE']
                                ]
                            ]
                        ]
                    ];

                    $modifyResponse = Http::withOptions(['verify' => false])->post($zimbraUrl, $modifyPayload);
                    $modifyJson = $modifyResponse->json();

                    if (!isset($modifyJson['Body']['Fault'])) {
                        $successCount++;
                        $resetResults[] = $email;
                    }
                }

                if ($successCount > 0) {
                    $msg = "Password Zimbra berhasil diperbarui.";
                    if (count($emailsToReset) > 1) {
                        $msg = "Password Zimbra (Multi-Account) diperbarui. Berhasil: {$successCount} akun.";
                    }
                    return redirect()->back()->with('success', $msg);
                } else {
                    return redirect()->back()->with('error', 'Tidak ada akun Zimbra yang ditemukan atau berhasil diupdate.');
                }
            } catch (\Exception $e) {
                return redirect()->back()->with('error', 'Gagal update Zimbra: API Error.');
            }
        } elseif ($targetApp == 'MIS') {
            $user->password = Hash::make($newPassword);
            $user->save();
            return redirect()->back()->with('success', 'Password Akun MIS berhasil diperbarui.');
        }

        return redirect()->back()->with('error', 'Aplikasi ini belum didukung untuk reset otomatis.');
    }
}
