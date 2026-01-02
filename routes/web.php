<?php

use App\Http\Controllers\Backend\Admin\CategoryController;
use App\Http\Controllers\Backend\DashboardController;
use App\Http\Controllers\Backend\User\EarningController;
use App\Http\Controllers\Backend\User\MessageController;
use App\Http\Controllers\Backend\User\MyListingController;
use App\Http\Controllers\Backend\User\MyRentalController;
use App\Http\Controllers\Backend\User\ReviewController;
use App\Http\Controllers\Backend\User\SettingController;
use App\Http\Controllers\Frontend\BookingController;
use App\Http\Controllers\Frontend\BrowseToolsController;
use App\Http\Controllers\Frontend\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard')->middleware(['auth', 'verified']);

// frontend route
Route::controller(BrowseToolsController::class)->group(function () {
    Route::get('/browse-tools', 'browseTools')->name('browse-tools');
    Route::get('/browse-tools/details/{slug}', 'browseToolsDetails')->name('browse-tools.details');
});

// category
Route::middleware(['auth'])->group(function () {
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
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

    // privacy policy
    Route::get('/commission-policy', 'commission')->name('policy.commission');
    Route::get('/legal-notice', 'legalNotice')->name('policy.legal');
    Route::get('/privacy-policy', 'privacy')->name('policy.privacy');
    // Use 'terms' or 'terms-and-conditions' for the URL
    Route::get('/terms-conditions', 'terms')->name('policy.terms');
});

Route::fallback(function () {
    return Inertia::render('Errors/404');
});

require __DIR__.'/auth.php';
