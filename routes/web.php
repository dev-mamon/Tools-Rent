<?php

use App\Http\Controllers\Backend\User\EarningController;
use App\Http\Controllers\Backend\User\MessageController;
use App\Http\Controllers\Backend\User\MyListingController;
use App\Http\Controllers\Backend\User\MyRentalController;
use App\Http\Controllers\Backend\User\ReviewController;
use App\Http\Controllers\Backend\User\SettingController;
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
// earnings

Route::controller(MessageController::class)->prefix('user/message')->name('user.message.')->group(function () {
    Route::get('/', 'index')->name('index');
    // Route::get('/create', 'create')->name('create');
    // Route::post('/', 'store')->name('store');
    // Route::get('/{rental}', 'show')->name('show');
    // Route::get('/{rental}/edit', 'edit')->name('edit');
    // Route::put('/{rental}', 'update')->name('update');
    // Route::delete('/{rental}', 'destroy')->name('destroy');
});
Route::controller(ReviewController::class)->prefix('user/review')->name('user.review.')->group(function () {
    Route::get('/', 'index')->name('index');
    // Route::get('/create', 'create')->name('create');
    // Route::post('/', 'store')->name('store');
    // Route::get('/{rental}', 'show')->name('show');
    // Route::get('/{rental}/edit', 'edit')->name('edit');
    // Route::put('/{rental}', 'update')->name('update');
    // Route::delete('/{rental}', 'destroy')->name('destroy');
});
Route::controller(SettingController::class)->prefix('user/setting')->name('user.setting.')->group(function () {
    Route::get('/', 'index')->name('index');

    // এডিট পেজ ভিউ করার রাউট (GET)
    Route::get('/edit-profile', 'editProfile')->name('edit-profile');
    Route::get('/edit-password', 'editPassword')->name('edit-password');

    // // ডাটা আপডেট করার রাউট (POST)
    // Route::post('/update-profile', 'updateProfile')->name('update-profile');
    // Route::post('/update-password', 'updatePassword')->name('update-password');
});

require __DIR__.'/auth.php';
