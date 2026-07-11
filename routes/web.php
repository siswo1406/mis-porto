<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

use App\Http\Controllers\Operation\DocController;

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('settings')->name('settings.')->group(function () {
        Route::get('/password-reset', [\App\Http\Controllers\Settings\PasswordResetController::class, 'index'])->name('password.reset');
        Route::post('/password-reset', [\App\Http\Controllers\Settings\PasswordResetController::class, 'reset'])->name('password.reset.submit');
    });

    // QA Module
    Route::prefix('qa')->name('qa.')->group(function () {
        Route::get('/', [App\Http\Controllers\Qa\QaController::class, 'index'])->name('portal');
        Route::get('/sop', [App\Http\Controllers\Qa\QaController::class, 'sop'])->name('sop.index');
        Route::post('/sop', [App\Http\Controllers\Qa\QaController::class, 'store'])->name('sop.store');
        Route::get('/sop/file/{type}/{id}', [App\Http\Controllers\Qa\QaController::class, 'file'])->name('sop.file');
    });

    Route::prefix('master')->name('master.')->group(function () {
        Route::get('/users', [\App\Http\Controllers\Master\UserController::class, 'index'])->name('users.index');
        Route::post('/users', [\App\Http\Controllers\Master\UserController::class, 'store'])->name('users.store');
        Route::put('/users/{user}', [\App\Http\Controllers\Master\UserController::class, 'update'])->name('users.update');
        Route::delete('/users/{user}', [\App\Http\Controllers\Master\UserController::class, 'destroy'])->name('users.destroy');
        Route::get('/users/{user}/generate', [\App\Http\Controllers\Master\UserController::class, 'generate'])->name('users.generate');
    });

    Route::prefix('operation')->name('operation.')->group(function () {
        Route::get('/doc', [DocController::class, 'index'])->name('doc.index');
    });
});

require __DIR__.'/auth.php';
