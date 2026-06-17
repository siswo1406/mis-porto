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

    Route::prefix('master')->name('master.')->group(function () {
        Route::get('/users', [\App\Http\Controllers\Master\UserController::class, 'index'])->name('users.index');
        Route::post('/users', [\App\Http\Controllers\Master\UserController::class, 'store'])->name('users.store');
    });

    Route::prefix('operation')->name('operation.')->group(function () {
        Route::get('/doc', [DocController::class, 'index'])->name('doc.index');
    });
});

require __DIR__.'/auth.php';
