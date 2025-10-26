<?php

namespace App\Http\Controllers\api;

use App\Models\Ad;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use Cloudinary\Cloudinary;

class AdsController extends Controller
{
    /**
     * Post New Add
     * @param mixed $request
     * @return mixed
     */

    /**
     * Post New Add
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function post_ad(Request $request)
    {
        try {


            $validated = $request->validate([
                'category_id' => 'required|exists:categories,id',
                'place_id' => 'nullable',
                'subcategory_id' => 'required|exists:subcategories,id',
                'name' => 'required|string|max:255',
                'email' => 'nullable|email|max:255',
                'phone' => 'required|string|max:20',
                'price' => 'nullable|numeric|min:0',
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'type' => 'nullable|string|max:50',
                'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'user_id' => 'nullable',
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



            // Store ad
            $ad = Ad::create([
                'user_id' => $validated['user_id'] ?? null,
                'place_id' => 2,
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
            return response()->json(
                [
                    'message' => 'Ad posted successfully',
                    'ad' => $ad
                ],
                201
            );
        } catch (\Throwable $th) {
            return response()->json(
                [
                    'message' => 'Failed to post ad',
                    'error' => $th->getMessage()
                ],
                500
            );
        }
    }


    /**
     * Get Ad Details
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function ad_details($id)
    {
        try {
            $ad = Ad::with(['category', 'subcategory', 'places'])->find($id);
            if (!$ad) {
                return response()->json(['message' => 'Ad not found'], 404);
            }
            $ad->increment('views');
            return response()->json($ad);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }


    /**
     * Update Ad
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function ad_update(Request $request, $id)
    {
        try {
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
            return response()->json(
                [
                    'message' => 'Ad updated successfully',
                    'ad' => $ad
                ],
                200
            );
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Failed to update ad', 'error' => $th->getMessage()], 500);
        }
    }



    /**
     * Delete Ad
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function ad_delete($id)
    {
        try {
            $ad = Ad::find($id);
            if (!$ad) {
                return response()->json(['message' => 'Ad not found'], 404);
            }
            $ad->places()->detach();
            $ad->delete();
            return response()->json(['message' => 'Ad deleted successfully'], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Failed to delete ad', 'error' => $th->getMessage()], 500);
        }
    }

    /**
     * Search Ads
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function ad_search(Request $request)
    {
        try {
            $query = $request->input('query');
            $ads = Ad::with(['category', 'subcategory', 'places'])
                ->where('title', 'like', "%{$query}%")
                ->orWhere('description', 'like', "%{$query}%")
                ->get();
            return response()->json($ads);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }



    /**
     * Get User Ads
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function user_ads($id)
    {
        try {
            $ads = Ad::with(['category', 'subcategory', 'places'])->where('user_id', $id)->get();
            return response()->json($ads);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }


    /**
     * Show Rejected Ads for User
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show_rejected_ad_for_user($id)
    {
        try {
            $ads = Ad::with(['category'])->where('user_id', $id)->where('status', 'rejected')->get();
            return response()->json($ads);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }



    /**
     * Show Accepted Ads for User
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show_accepted_ad_for_user($id)
    {
        try {
            $ads = Ad::with(['category'])->where('user_id', $id)->where('status', 'approved')->get();
            return response()->json($ads);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }


}
