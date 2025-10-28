<?php


use App\Http\Controllers\front\SocialiteController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\admin\AdController;
use App\Http\Controllers\admin\OrderController;
use App\Http\Controllers\admin\PlaceController;
use App\Http\Controllers\front\FrontController;
use App\Http\Controllers\front\FooterController;
use App\Http\Controllers\front\UserAdsController;
use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\SubCategoryController;
use App\Http\Controllers\admin\UserManagementController;

// Route::get('/', function () {
//     // return Inertia::render('auth/login');
//     return Inertia::render('front/Home/index');
// })->name('home');



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        if (auth()->user()->role == 'admin') {
            return Inertia::render('dashboard');
        } else {
            return Inertia::render('auth/login');
        }
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';



Route::controller(SettingController::class)->group(function () {
    Route::get('/settings/page', 'settings_page')->name('settings.page')->middleware('auth');
    Route::post('/settings/update', 'settings_update')->name('settings.update')->middleware('auth');
});

Route::controller(PlaceController::class)->group(function () {
    Route::get('/places/page', 'places_page')->name('places.page')->middleware('auth');
    Route::post('/place/store', 'place_store')->name('place.store')->middleware('auth');
    Route::get('/place/edit/{slug}/{id}', 'place_edit')->name('place.edit')->middleware('auth');
    Route::post('/place/edit/confirm/{id}', 'place_edit_confirm')->name('place.update.confirm')->middleware('auth');
    Route::get('/place/delete/{slug}', 'place_delete')->name('place.delete')->middleware('auth');

});


Route::controller(CategoryController::class)->group(function () {
    Route::get('/categories/page', 'categories_page')->name('categories.page')->middleware('auth');
    Route::post('/category/store', 'category_store')->name('category.store')->middleware('auth');
    Route::get('/category/{category}/edit', 'category_edit')->name('category.edit')->middleware('auth');
    Route::post('/category/{category}/edit-confirm', 'category_edit_confirm')->name('category.edit.confirm')->middleware('auth');
    Route::get('/category/{category}/delete', 'category_delete')->name('category.delete')->middleware('auth');
});


Route::controller(SubCategoryController::class)->group(function () {
    Route::get('/subcategories/page', 'subcategories_page')->name('subcategories.page')->middleware('auth');
    Route::post('/subcategories/store', 'subcategories_store')->name('subcategories.store')->middleware('auth');
    Route::get('/subcategory/edit/{slug}/{id}', 'subcategory_edit')->name('subcategories.edit')->middleware('auth');
    Route::post('/subcategory/edit/confirm/{id}', 'subcategory_update_confirm')->name('subcategories.update.confirm')->middleware('auth');
});



Route::controller(AdController::class)->group(function(){
    Route::get('/ads/page' , 'ads_page')->name("ads.page")->middleware("auth");
    Route::get('/ads/details/page/{id}' , 'ad_details_page')->name("ad.details.page")->middleware("auth");
    Route::get('/delete/ad/{id}' , 'delete_ad')->name("delete.ad")->middleware("auth");
    Route::get('/boost/ad/{id}' , 'boost_ad')->name("boost.ad")->middleware("auth");
    Route::get('/ads/publish/ad/{id}' , 'publish_ad')->name("publish.ad")->middleware("auth");
    Route::post('/reject/ad/{id}' , 'reject_ad')->name("reject.ad")->middleware("auth");
});


Route::controller(UserManagementController::class)->group(function () {
    Route::get('/users', 'index')->name('users.index')->middleware('auth');
    Route::get('/users/create', 'create')->name('users.create')->middleware('auth');
    Route::post('/users', 'store')->name('users.store')->middleware('auth');
    Route::get('/users/{user}', 'show')->name('users.show')->middleware('auth');
    Route::get('/users/{user}/edit', 'edit')->name('users.edit')->middleware('auth');
    Route::put('/users/{user}', 'update')->name('users.update')->middleware('auth');
    Route::get('/delete/user/{id}', 'destroy')->name('users.destroy')->middleware('auth');
});



Route::controller(OrderController::class)->group(function(){
    Route::get('/orders/page','orders_page')->name('orders.page')->middleware('auth');
    Route::get('/order/read/{id}','order_read')->name('order.read')->middleware('auth');
});







// user routes 
Route::controller(FrontController::class)->group(function () {
    Route::get('/', 'index')->name('home');
    Route::get('/place/categories/{slug}/{id}', 'place_categories')->name('place.categories');
    Route::get('/all/ads', 'all_ads')->name('all.ads');
    // Route::get('/filter/category/{category?}/{category_id?}/{subcategory_id?}/{place_id?}',  'filter')->name('filter');
    Route::get('/ads/place/{place_slug?}/category/{category_slug?}/subcategory/{subcategory_slug?}', 'filter')->name('filter');
    Route::get('/show/all/ads', 'show_all_ads')->name('show.all.ads');
    Route::get('/search', 'search')->name('search');
    Route::get('/boost/ads', 'BoostAd')->name('Boost.ad');
    Route::post('/boost-ad', 'store')->name('boost-ad.store');
    // post ad
    Route::get('/post/new/ads', 'post_new_ads')->name('post.new.ads');
    
    Route::get('/show/ad/details/{slug}/{id}', 'show_ad_details')->name('show.ad.details');
    Route::get('/show/favourites/page', 'show_favourite_page')->name('show.favourites.page');
    // 404 Error Page
    Route::get('/404', 'notFound')->name('404');

  
});

Route::controller(UserAdsController::class)->group(function(){
    Route::post('/post/new/ads', 'store_new_ad')->name('store.new.ads');
    Route::get('/account/page/', 'account_page')->name('account.page')->middleware('auth');
    Route::get('/edit/ad/{slug}/{id}', 'edit_ad')->name('edit.ad')->middleware('auth');
    Route::post('/edit/ad/confirm/{slug}/{id}', 'edit_ad_confirm')->name('edit.ad.confirm')->middleware('auth');
    Route::get('/delete/ad/{slug}/{id}', 'delete_ad')->name('delete.ad')->middleware('auth');
});









Route::controller(FooterController::class)->group(function () {
    Route::get('/about', 'about')->name('about');
    Route::get('/terms', 'terms')->name('terms');
    Route::get('/privacy', 'privacy')->name('privacy');
    Route::get('/contact', 'contact')->name('contact');
    Route::get('/complaints', 'complaints')->name('complaints');
    Route::post('/complaints', 'submitComplaint')->name('complaints.submit');
    Route::get('/boost-ad-info', 'boostAdInfo')->name('boost-ad-info');
    Route::get('/advertise-with-us', 'advertiseWithUs')->name('advertise-with-us');
    Route::get('/website-commission', 'websiteCommission')->name('website-commission');
});






// -----------------------------------------------------
 
Route::get('/auth/redirect', function () {
    return Socialite::driver('github')->redirect();
});
 
Route::get('/auth/callback', function () {
    $user = Socialite::driver('github')->user();
 
    // $user->token
});



Route::controller(SocialiteController::class)->group(function(){
    Route::get('/auth/google/redirect' , 'google_redirect')->name('auth.google.redirect');
    Route::get('/auth/google/callback' , 'google_callback')->name('auth.google.callback');

    Route::get('/auth/facebook/redirect' , 'facebook_redirect')->name('auth.facebook.redirect');
    Route::get('/auth/facebook/callback' , 'facebook_callback')->name('auth.facebook.callback');
});