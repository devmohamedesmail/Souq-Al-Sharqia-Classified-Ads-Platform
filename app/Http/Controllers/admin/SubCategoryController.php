<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Subcategory;
use Cloudinary\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class SubCategoryController extends Controller
{
    //
    public function subcategories_page()
    {
        try {

            $categories = Category::all();
            $subcategories = Subcategory::all();
            return Inertia::render(
                'admin/subcategory/index',
                ['categories' => $categories, 'subcategories' => $subcategories]
            );
        } catch (\Throwable $th) {
            return Inertia::render('admin/404');
        }
    }

    // subcategories.store
    public function subcategories_store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title_en' => 'required|string|max:255',
                'title_ar' => 'required|string|max:255',
                'slug' => 'nullable|string|max:255|unique:subcategories,slug',
                'image' => 'nullable|image|max:2048',
                'description' => 'nullable|string',
                'meta_description' => 'nullable|string',
                'meta_keywords' => 'nullable|string',
                'meta_image' => 'nullable|string',
                'meta_robots' => 'nullable|string',
                'categories' => 'required|array|min:1',
                'categories.*' => 'exists:categories,id',
            ]);

            if ($request->hasFile('image')) {
                $cloudinary = new Cloudinary([
                    'cloud' => [
                        'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                        'api_key' => env('CLOUDINARY_API_KEY'),
                        'api_secret' => env('CLOUDINARY_API_SECRET'),
                    ],
                ]);

                $uploaded = $cloudinary->uploadApi()->upload($request->file('image')->getRealPath(), [
                    'folder' => 'categories',
                ]);

                // حفظ الرابط النهائي في الحقل `image`
                $validated['image'] = $uploaded['secure_url'];
            }

            if (empty($validated['slug'])) {
                $validated['slug'] = Str::slug($validated['title_ar']);
            }

            $subCategory = Subcategory::create([
                'title_en' => $validated['title_en'],
                'title_ar' => $validated['title_ar'],
                'slug' => $validated['slug'],
                'image' => $validated['image'] ?? null,
                'description' => $validated['description'],
                'meta_description' => $validated['meta_description'],
                'meta_keywords' => $validated['meta_keywords'],
                'meta_image' => $validated['meta_image'],
                'meta_robots' => $validated['meta_robots'],
            ]);

            // ربط التصنيفات
            $subCategory->categories()->sync($validated['categories']);

            return redirect()->back()->with('success', __('Subcategory added successfully'));

        } catch (\Throwable $th) {
            return Inertia::render('admin/404');
        }
    }


    // subcategory_edit
    public function subcategory_edit($slug, $id)
    {
        try {

            $subCategory = Subcategory::with('categories')->findOrFail($id);
            $categories = Category::all();
            return Inertia::render(
                'admin/subcategory/edit',
                ['subCategory' => $subCategory, 'categories' => $categories]
            );
        } catch (\Throwable $th) {
            return Inertia::render('admin/404');
        }
    }


    // subcategory_update_confirm
    public function subcategory_update_confirm(Request $request, $id)
    {
        try {
            $subCategory = Subcategory::findOrFail($id);
            $validated = $request->validate([
                'title_en' => 'required|string|max:255',
                'title_ar' => 'required|string|max:255',
                'slug' => 'nullable|string|max:255|unique:subcategories,slug,' . $id,
                'image' => 'nullable|image|max:2048',
                'description' => 'nullable|string',
                'meta_description' => 'nullable|string',
                'meta_keywords' => 'nullable|string',
                'meta_image' => 'nullable|string',
                'meta_robots' => 'nullable|string',
                'categories' => 'required|array|min:1',
                'categories.*' => 'exists:categories,id',
            ]);

            // Handle image upload if provided
            if ($request->hasFile('image')) {
                $cloudinary = new Cloudinary([
                    'cloud' => [
                        'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                        'api_key' => env('CLOUDINARY_API_KEY'),
                        'api_secret' => env('CLOUDINARY_API_SECRET'),
                    ],
                ]);

                $uploaded = $cloudinary->uploadApi()->upload($request->file('image')->getRealPath(), [
                    'folder' => 'categories',
                ]);

                $validated['image'] = $uploaded['secure_url'];
            }

            // Generate slug if not provided
            if (empty($validated['slug'])) {
                $validated['slug'] = Str::slug($validated['title_ar']);
            }

            // Update subcategory
            $subCategory->update([
                'title_en' => $validated['title_en'],
                'title_ar' => $validated['title_ar'],
                'slug' => $validated['slug'],
                'image' => $validated['image'] ?? $subCategory->image,
                'description' => $validated['description'],
                'meta_description' => $validated['meta_description'],
                'meta_keywords' => $validated['meta_keywords'],
                'meta_image' => $validated['meta_image'],
                'meta_robots' => $validated['meta_robots'],
            ]);

            // Update category relationships
            $subCategory->categories()->sync($validated['categories']);

            return redirect()->back()->with('success', __('Subcategory updated successfully'));
        } catch (\Throwable $th) {
            return Inertia::render('admin/404');
        }

    }





    // --------------------------------------------------------------------------

}
