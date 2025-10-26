<?php

namespace App\Providers;
use App\Models\Note;
use Inertia\Inertia;
use App\Models\Place;
use App\Models\Invoice;
use App\Models\Service;
use App\Models\Setting;
use App\Models\InvoiceType;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share('app_settings', function () {
            return Setting::first();
        });

        // places
        Inertia::share('places', function () {
            return Place::all();
        });

        Inertia::share([
        'auth' => fn () => [
            'user' => Auth::user(),
        ],
    ]);

    

    }
}
