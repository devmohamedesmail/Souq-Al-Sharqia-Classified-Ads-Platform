<?php

use App\Http\Controllers\api\AdsController;
use App\Http\Controllers\api\ApiController;
use App\Http\Controllers\api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');




Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
    Route::get('/user', 'getUser');
    Route::put('/user', 'updateUser');
    Route::post('/logout', 'logout');
    Route::get('/delete/{id}', 'delete');
});


Route::controller(ApiController::class)->group(function () {
    Route::get('/categories', 'show_categories')->name('api.categories');
    Route::get('/subcategories/{category_id}', 'show_subcategories')->name('api.subcategories');
    Route::get('/subcategories/ads/{subcategory_id}', 'show_subcategories_ads')->name('api.subcategories.ads');
    Route::get('/places', 'show_places')->name('api.places');
    Route::get('/places/categories/{place_id}', 'show_place_categories')->name('api.show_place_categories');
    Route::get('/places/ads/{place_id}', 'show_places_ads')->name('api.places.ads');
    Route::get('/settings', 'show_settings')->name('api.settings');
});


Route::controller(AdsController::class)->group(function () {
    Route::post('/post/ad', 'post_ad')->name('api.post.ad');
    Route::get('/ad/details/{id}', 'ad_details')->name('api.ad.details');
    Route::post('/ad/update/{id}', 'ad_update')->name('api.ad.update');
    Route::delete('/ad/delete/{id}', 'ad_delete')->name('api.ad.delete');
    Route::post('/ad/search', 'ad_search')->name('api.ad.search');
    Route::get('/user/ads/{id}', 'user_ads')->name('api.user.ads');
    Route::get('/show/user/rejected/ads/{id}' , 'show_rejected_ad_for_user')->name('rejected.ads');
    Route::get('/show/user/accepted/ads/{id}' , 'show_accepted_ad_for_user')->name('accepted.ads');
});