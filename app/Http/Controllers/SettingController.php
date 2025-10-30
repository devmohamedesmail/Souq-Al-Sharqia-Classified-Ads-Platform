<?php
namespace App\Http\Controllers;

use App\Models\InvoiceType;
use App\Models\Note;
use App\Models\Service;
use App\Models\Setting;
use Cloudinary\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class SettingController extends Controller
{
    // settings_page
    public function settings_page()
    {
        try {
            $settings = Setting::first();
            return Inertia::render('settings/index', ['settings' => $settings]);
        } catch (\Throwable $th) {
            return Inertia::render('404', ['error' => $th->getMessage()]);
        }
    }

    // settings_update
   public function settings_update(Request $request)
{
    try {
        $settings = Setting::firstOrNew();

        $settings->fill([
            'website_name'       => $request->input('website_name'),
            'description'        => $request->input('description'),
            'keywords'           => $request->input('keywords'),
            'phone'              => $request->input('phone'),
            'email'              => $request->input('email'),
            'address'            => $request->input('address'),
            'currency_en'        => $request->input('currency_en'),
            'currency_ar'        => $request->input('currency_ar'),
            'meta_description'   => $request->input('meta_description'),
            'meta_keywords'      => $request->input('meta_keywords'),
            'meta_author'        => $request->input('meta_author'),
            'maintenance_mode'   => $request->boolean('maintenance_mode'),
            'about_us'           => $request->input('about_us'),
            'copyright'          => $request->input('copyright'),
        ]);

        if ($request->hasFile('logo')) {
            $cloudinary = new Cloudinary([
                'cloud' => [
                    'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                    'api_key'    => env('CLOUDINARY_API_KEY'),
                    'api_secret' => env('CLOUDINARY_API_SECRET'),
                ],
            ]);

            $uploaded = $cloudinary->uploadApi()->upload(
                $request->file('logo')->getRealPath(),
                ['folder' => 'settings']
            );

            $settings->logo = $uploaded['secure_url'];
        }

        $settings->save();

        return redirect()->back();
    } catch (\Throwable $th) {
        return Inertia::render('admin/404');
    }
}

}
