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
            $settings = Setting::first();
            if (!$settings) {
                $settings = new Setting();
                $settings->website_name = $request->website_name;
                $settings->description = $request->description;
                $settings->keywords = $request->keywords;
                $settings->phone = $request->phone;
                $settings->email = $request->email;

                // $logo = $request->logo;
                // if ($logo) {
                //     $image_name = Str::uuid() . '.' . $logo->getClientOriginalExtension();
                //     $logo->move(public_path('uploads'), $image_name);
                //     $settings->logo = $image_name;
                // }

                // upload image to cloudinary
                if ($request->hasFile('logo')) {
                    $cloudinary = new Cloudinary([
                        'cloud' => [
                            'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                            'api_key' => env('CLOUDINARY_API_KEY'),
                            'api_secret' => env('CLOUDINARY_API_SECRET'),
                        ],
                    ]);

                    $uploaded = $cloudinary->uploadApi()->upload($request->file('logo')->getRealPath(), [
                        'folder' => 'categories',
                    ]);

                    // حفظ الرابط النهائي في الحقل `image`
                    $settings->logo = $uploaded['secure_url'];
                }

                $settings->save();
                return redirect()->back();
            } else {
                $settings->website_name = $request->website_name;
                $settings->description = $request->description;
                $settings->keywords = $request->keywords;
                $settings->phone = $request->phone;
                $settings->email = $request->email;

                  if ($request->hasFile('logo')) {
                    $cloudinary = new Cloudinary([
                        'cloud' => [
                            'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                            'api_key' => env('CLOUDINARY_API_KEY'),
                            'api_secret' => env('CLOUDINARY_API_SECRET'),
                        ],
                    ]);

                    $uploaded = $cloudinary->uploadApi()->upload($request->file('logo')->getRealPath(), [
                        'folder' => 'categories',
                    ]);

                    // حفظ الرابط النهائي في الحقل `image`
                    $settings->logo = $uploaded['secure_url'];
                }

                $settings->save();
                return redirect()->back();
            }
        } catch (\Throwable $th) {
            return Inertia::render('404', ['error' => $th->getMessage()]);
        }
    }

    // service_store

    // terms_conditions_page
    public function terms_conditions_page()
    {
        try {
            return Inertia::render('terms/index');
        } catch (\Throwable $th) {
            return Inertia::render('404', ['error' => $th->getMessage()]);
        }
    }

    
    

   
}
