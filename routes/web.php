<?php

use App\Http\Controllers\Backend\User\EarningController;
use App\Http\Controllers\Backend\User\MyListingController;
use App\Http\Controllers\Backend\User\MyRentalController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    if (auth()->user()->is_admin === 'true') {
        return Inertia::render('Admin/Dashboard');
    }

    return Inertia::render('User/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// listing in user side

Route::controller(MyListingController::class)->prefix('user')->name('user.my-listings.')->group(function () {
    Route::get('/listings', 'index')->name('index');
    Route::get('/create', 'create')->name('create');
    Route::get('/details', 'details')->name('details');
    // Route::post('/', 'store')->name('store');
    // Route::get('/{listing}', 'show')->name('show');
    // Route::get('/{listing}/edit', 'edit')->name('edit');
    // Route::put('/{listing}', 'update')->name('update');
    // Route::delete('/{listing}', 'destroy')->name('destroy');
});

// my rentals

Route::controller(MyRentalController::class)->prefix('user/rentals')->name('user.my-rentals.')->group(function () {
    Route::get('/', 'index')->name('index');
    // Route::get('/create', 'create')->name('create');
    // Route::post('/', 'store')->name('store');
    // Route::get('/{rental}', 'show')->name('show');
    // Route::get('/{rental}/edit', 'edit')->name('edit');
    // Route::put('/{rental}', 'update')->name('update');
    // Route::delete('/{rental}', 'destroy')->name('destroy');
});
// earnings

Route::controller(EarningController::class)->prefix('user/earnings')->name('user.earnings.')->group(function () {
    Route::get('/', 'index')->name('index');
    // Route::get('/create', 'create')->name('create');
    // Route::post('/', 'store')->name('store');
    // Route::get('/{rental}', 'show')->name('show');
    // Route::get('/{rental}/edit', 'edit')->name('edit');
    // Route::put('/{rental}', 'update')->name('update');
    // Route::delete('/{rental}', 'destroy')->name('destroy');
});

require __DIR__.'/auth.php';
