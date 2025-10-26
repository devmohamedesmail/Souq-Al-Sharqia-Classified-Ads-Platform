<?php

namespace App\Http\Controllers\front;

use App\Models\Ad;
use Inertia\Inertia;
use App\Models\Category;
use Cloudinary\Cloudinary;
use App\Models\Subcategory;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserAdsController extends Controller
{


     /**
     * Check if the current request is in Arabic
     */
    /**
     * Check if the current request is in Arabic
     * @param Request $request
     * @return bool
     */
    private function isArabic(Request $request): bool
    {
        return $request->header('Accept-Language') === 'ar' ||
            $request->input('lang') === 'ar' ||
            session('locale') === 'ar';
    }



     /**
     * Store new ad
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store_new_ad(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'nullable|email|max:255',
                'phone' => 'required|string|max:255',
                'price' => 'nullable|string|max:255',
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'type' => 'nullable|string|max:255',
                'images.*' => 'nullable|image|max:4096',
                'places' => 'required|array|min:1',
                'places.*' => 'exists:places,id',
                'category_id' => 'required|exists:categories,id',
                'subcategory_id' => 'required|exists:subcategories,id',
            ], [
                'phone.required' => $this->isArabic($request) ? 'رقم الهاتف مطلوب' : 'Phone number is required',
                'title.required' => $this->isArabic($request) ? 'عنوان الإعلان مطلوب' : 'Ad title is required',
                'places.required' => $this->isArabic($request) ? 'يجب اختيار مكان واحد على الأقل' : 'At least one place must be selected',
                'places.min' => $this->isArabic($request) ? 'يجب اختيار مكان واحد على الأقل' : 'At least one place must be selected',
                'category_id.required' => $this->isArabic($request) ? 'الفئة مطلوبة' : 'Category is required',
                'subcategory_id.required' => $this->isArabic($request) ? 'الفئة الفرعية مطلوبة' : 'Subcategory is required',
                'name.required' => $this->isArabic($request) ? 'الاسم مطلوب' : 'Name is required',
                'email.email' => $this->isArabic($request) ? 'يرجى إدخال عنوان بريد إلكتروني صحيح' : 'Please enter a valid email address',
                'images.*.image' => $this->isArabic($request) ? 'يجب أن يكون الملف صورة' : 'The file must be an image',
                'images.*.max' => $this->isArabic($request) ? 'حجم الصورة يجب أن يكون أقل من 4 ميجا بايت' : 'Image size must be less than 4MB',
            ]);

            // Upload images to Cloudinary
            $uploadedImages = [];
            if ($request->hasFile('images')) {
                $cloudinary = new Cloudinary([
                    'cloud' => [
                        'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                        'api_key' => env('CLOUDINARY_API_KEY'),
                        'api_secret' => env('CLOUDINARY_API_SECRET'),
                    ],
                ]);

                foreach ($request->file('images') as $image) {
                    $uploaded = $cloudinary->uploadApi()->upload($image->getRealPath(), [
                        'folder' => 'ads',
                    ]);
                    $uploadedImages[] = $uploaded['secure_url'];
                }
            }

            // Determine user_id
            $userId = auth()->check() ? auth()->id() : null;

            // Store ad
            $ad = Ad::create([
                'user_id' => $userId,
                'category_id' => $validated['category_id'],
                'subcategory_id' => $validated['subcategory_id'],
                'name' => $validated['name'],
                'email' => $validated['email'] ?? null,
                'phone' => $validated['phone'],
                'price' => $validated['price'] ?? null,
                'title' => $validated['title'],
                'slug' => Str::slug($validated['title']),
                'description' => $validated['description'] ?? null,
                'type' => $validated['type'] ?? null,
                'images' => $uploadedImages ?: null,
                'featured' => false,
                'published' => false,
            ]);

            // Attach places (many-to-many)
            if (!empty($validated['places'])) {
                $ad->places()->sync($validated['places']);
            }

            $successMessage = $request->header('Accept-Language') === 'ar'
                ? 'تم نشر الإعلان بنجاح!'
                : 'Ad posted successfully!';

            return redirect()->back()->with('success', $successMessage);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            $errorMessage = $request->header('Accept-Language') === 'ar'
                ? 'حدث خطأ أثناء نشر الإعلان. يرجى المحاولة مرة أخرى.'
                : 'An error occurred while posting the ad. Please try again.';

            return redirect()->back()->with('error', $errorMessage);
        }
    }
    // -------------------------------------------------------------------------------------------------------------

     /**
     * Show account page with user ads
     * @return \Inertia\Response
     */
    public function account_page()
    {
        try {
            
            $user = auth()->user();
            $userAds = $user
                ? $user->ads()->with(['places', 'category', 'subcategory'])->latest()->get()
                : collect();

                
            return Inertia::render(
                'front/account/index',
                [
                    'userAds' => $userAds,
                ]
            );
         
        } catch (\Throwable $th) {
            return Inertia::render('front/Error404');
        }
    }


       /**
     * Show edit ad page
     * @param string $slug
     * @param int $id
     * @return \Inertia\Response
     */
    public function edit_ad($slug, $id)
    {
        try {
            $ad = Ad::with(['places', 'category'])->findOrFail($id);
            $categories = Category::with('subcategories')->get();
            $subcategories = Subcategory::all();
            return Inertia::render('front/account/edit', ['ad' => $ad, 'categories' => $categories, 'subcategories' => $subcategories]);
        } catch (\Throwable $th) {
            return Inertia::render('front/Error404');
        }
    }

      /**
     * Confirm edit ad
     * @param Request $request
     * @param string $slug
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse|\Inertia\Response
     */
    public function edit_ad_confirm(Request $request, $slug, $id)
    {
        try {
            // Filter out string URLs from images before validation
            $input = $request->all();
            if (isset($input['images']) && is_array($input['images'])) {
                $input['images'] = array_filter($input['images'], function ($img) {
                    return $img instanceof \Illuminate\Http\UploadedFile;
                });
            }

            $validated = validator($input, [
                'name' => 'required|string|max:255',
                'email' => 'nullable|email|max:255',
                'phone' => 'nullable|string|max:255',
                'price' => 'nullable|string|max:255',
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'type' => 'nullable|string|max:255',
                'images.*' => 'nullable|image|max:4096',
                'places' => 'nullable|array',
                'places.*' => 'exists:places,id',
                'category_id' => 'nullable|exists:categories,id',
                'subcategory_id' => 'nullable|exists:subcategories,id',
            ])->validate();

            $ad = Ad::findOrFail($id);

            // Upload new images to Cloudinary
            $uploadedImages = [];
            if ($request->hasFile('images')) {
                $cloudinary = new Cloudinary([
                    'cloud' => [
                        'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                        'api_key' => env('CLOUDINARY_API_KEY'),
                        'api_secret' => env('CLOUDINARY_API_SECRET'),
                    ],
                ]);

                foreach ($request->file('images') as $image) {
                    $uploaded = $cloudinary->uploadApi()->upload($image->getRealPath(), [
                        'folder' => 'ads',
                    ]);
                    $uploadedImages[] = $uploaded['secure_url'];
                }
            }

            // Keep old images (string URLs) and merge with new uploads
            $oldImages = [];
            // if ($ad->images) {
            //     $oldImages = is_array($ad->images) ? $ad->images : json_decode($ad->images, true);
            // }
            if ($ad->images) {
                $oldImages = is_array($ad->images)
                    ? $ad->images
                    : json_decode((string) $ad->images, true);
            }
            // Only keep string URLs from the request (not files)
            $existingImages = [];
            if ($request->has('images')) {
                foreach ($request->input('images', []) as $img) {
                    if (is_string($img)) {
                        $existingImages[] = $img;
                    }
                }
            } else {
                $existingImages = $oldImages;
            }

            $allImages = array_merge($existingImages ?? [], $uploadedImages);

            // Update ad
            $ad->update([
                'category_id' => $validated['category_id'] ?? null,
                'subcategory_id' => $validated['subcategory_id'] ?? null,
                'name' => $validated['name'],
                'email' => $validated['email'] ?? null,
                'phone' => $validated['phone'] ?? null,
                'price' => $validated['price'] ?? null,
                'title' => $validated['title'],
                'slug' => Str::slug($validated['title']),
                'description' => $validated['description'] ?? null,
                'type' => $validated['type'] ?? null,
                'images' => $allImages ?: null,
            ]);

            // Sync places (many-to-many)
            if (!empty($validated['places'])) {
                $ad->places()->sync($validated['places']);
            } else {
                $ad->places()->detach();
            }

            return redirect()->back()->with('success', 'Ad updated successfully!');
        } catch (\Throwable $th) {
            return Inertia::render('front/Error404');
        }
    }




    /**
     * Delete ad
     * @param Request $request
     * @param string $slug
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse|\Inertia\Response
     */
    public function delete_ad(Request $request, $slug, $id)
    {
        try {
            $ad = Ad::find($id);
            $ad->delete();
            return redirect()->back();
        } catch (\Throwable $th) {
            return Inertia::render('front/Error404');
        }
    }
    
}
