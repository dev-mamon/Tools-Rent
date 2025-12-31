<?php

use App\Http\Controllers\Backend\User\EarningController;
use App\Http\Controllers\Backend\User\MessageController;
use App\Http\Controllers\Backend\User\MyListingController;
use App\Http\Controllers\Backend\User\MyRentalController;
use App\Http\Controllers\Backend\User\ReviewController;
use App\Http\Controllers\Backend\User\SettingController;
use App\Http\Controllers\Frontend\BookingController;
use App\Http\Controllers\Frontend\BrowseToolsController;
use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/dashboard', function () {

    if (auth()->user()->is_admin === 'true') {
        return Inertia::render('Admin/Dashboard');
    }

    return Inertia::render('User/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

// frontend route
Route::controller(BrowseToolsController::class)->group(function () {
    Route::get('/browse-tools', 'browseTools')->name('browse-tools');
    Route::get('/browse-tools/details/{slug}', 'browseToolsDetails')->name('browse-tools.details');
});

// Booking Routes
Route::middleware(['auth'])->group(function () {
    Route::get('/tools/{tool}/checkout', [BookingController::class, 'checkout'])->name('bookings.checkout');
    Route::post('/tools/{tool}/bookings', [BookingController::class, 'store'])->name('bookings.store');
    Route::get('/bookings/{booking}', [BookingController::class, 'show'])->name('bookings.show');
});
// listing in user side

Route::controller(MyListingController::class)->prefix('user/listings')->name('user.my-listings.')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('/create', 'create')->name('create');
    Route::get('/details', 'details')->name('details');
    Route::post('/', 'store')->name('store');
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
    Route::post('/store', 'store')->name('store');
    Route::post('/mark-read', 'markRead')->name('mark-read');
    Route::post('/typing', 'typing')->name('typing');
    Route::post('/status', 'setStatus')->name('set-status');
    Route::get('/more', 'getMoreMessages')->name('more');
    Route::delete('/{message}', 'deleteMessage')->name('delete');
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
    Route::get('/edit-profile', 'editProfile')->name('edit-profile');
    Route::get('/edit-password', 'editPassword')->name('edit-password');

    Route::post('/update-profile', 'updateProfile')->name('update-profile');
    Route::post('/update-password', 'updatePassword')->name('update-password');
});

require __DIR__.'/auth.php';
