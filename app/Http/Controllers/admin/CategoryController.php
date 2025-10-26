<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Place;
use Cloudinary\Cloudinary;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    //
    public function categories_page()
    {

        try {
            $categories = Category::all();
            return Inertia::render('admin/categories/index', ['categories' => $categories]);
        } catch (\Throwable $th) {
            return Inertia::render('admin/404');
        }
    }

    public function category_store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title_en' => 'required|string|max:255',
                'title_ar' => 'required|string|max:255',
                'slug' => 'nullable|string|max:255|unique:categories,slug',
                'image' => 'nullable|image|max:2048',
                'description' => 'nullable|string',
                'is_active' => 'boolean',
                'sort_order' => 'integer',
                'parent_id' => 'nullable|exists:categories,id',
                'meta_title' => 'nullable|string|max:255',
                'meta_description' => 'nullable|string|max:255',
                'meta_keywords' => 'nullable|string|max:255',
                'meta_image' => 'nullable|string|max:255',
                'places' => 'required|array|min:1',
                'places.*' => 'exists:places,id',
            ]);

            // upload image to cloudinary
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

            // Remove 'places' from $validated before creating the category
            $places = $validated['places'] ?? [];
            unset($validated['places']);

            $category = Category::create($validated);

            // Attach places (many-to-many)
            if (!empty($places)) {
                $category->places()->sync($places);
            }

            return redirect()->back()->with('success', __('Category added successfully'));
        } catch (\Throwable $th) {
            return Inertia::render('admin/404');
        }
    }

    public function category_edit($id)
    {
        try {
            // $category = Category::findOrFail($id);
            $category = Category::with('places')->findOrFail($id);
            $places = Place::all();
            return inertia('admin/categories/edit', ['category' => $category, 'places' => $places]);
        } catch (\Throwable $th) {
            return Inertia::render('admin/404');
        }
    }

    public function category_edit_confirm(Request $request, $id)
    {

        try {
            $category = Category::findOrFail($id);

            $validated = $request->validate([
                'title_en' => 'required|string|max:255',
                'title_ar' => 'required|string|max:255',
                'slug' => 'nullable|string|max:255|unique:categories,slug,' . $category->id . ',id',
                'image' => 'nullable|image|max:2048',
                'description' => 'nullable|string',
                'is_active' => 'boolean',
                'sort_order' => 'integer',
                'parent_id' => 'nullable|exists:categories,id',
                'meta_title' => 'nullable|string|max:255',
                'meta_description' => 'nullable|string|max:255',
                'meta_keywords' => 'nullable|string|max:255',
                'meta_image' => 'nullable|string|max:255',
                'places' => 'required|array|min:1',
                'places.*' => 'exists:places,id',
            ]);

            // upload image to cloudinary
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
            } else {
                // لا تقم بتحديث حقل الصورة إن لم يتم رفع صورة جديدة
                unset($validated['image']);
            }

            // Remove 'places' from $validated before creating the category
            $places = $validated['places'] ?? [];
            unset($validated['places']);

            $category->update($validated);

            // Attach places (many-to-many)
            if (!empty($places)) {
                $category->places()->sync($places);
            }

            return redirect()->back()->with('success', __('Category updated successfully'));
        } catch (\Throwable $th) {
            return Inertia::render('admin/404');
        }

    }

    public function category_delete($id)
    {
        try {
            $category = Category::findOrFail($id);
            $category->delete();
            return redirect()->route('categories.page')->with('success', 'Category deleted successfully!');
        } catch (\Throwable $th) {
            return Inertia::render('admin/404');
        }
    }
}
