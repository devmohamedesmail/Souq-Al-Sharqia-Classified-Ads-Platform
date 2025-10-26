<?php

namespace App\Http\Controllers\api;

use App\Models\Ad;
use App\Models\Place;
use App\Models\Setting;
use App\Models\Category;
use Cloudinary\Cloudinary;
use App\Models\Subcategory;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ApiController extends Controller
{
    /**
     * Show all categories with subcategories and ads
     * @return \Illuminate\Http\JsonResponse
     */
    public function show_categories()
    {
        try {
            // $categories = Category::with('subcategories.ads')->get();
            $categories = Category::with([
                'subcategories.ads' => function ($query) {
                    $query->where('status', 'approved');
                }
            ])->get();
            return response()->json($categories);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }

    /**
     * Show subcategories for a category
     * @param int $category_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show_subcategories($category_id)
    {
        try {
            // $category = Category::with('subcategories.ads')->find($category_id);
            $category = Category::with([
                'subcategories.ads' => function ($query) {
                    $query->where('status', 'approved');
                }
            ])->find($category_id);
            if (!$category) {
                return response()->json(['message' => 'Category not found'], 404);
            }
            return response()->json($category->subcategories);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }





    /**
     * Show ads for a subcategory
     * @param int $subcategory_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show_subcategories_ads($subcategory_id)
    {
        try {
            $subcategory = Subcategory::with([
                'ads' => function ($query) {
                    $query->where('status', 'approved');
                }
            ])->find($subcategory_id);
            if (!$subcategory) {
                return response()->json(['message' => 'Subcategory not found'], 404);
            }
            return response()->json($subcategory->ads);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }


    /**
     * Show all places
     * @return \Illuminate\Http\JsonResponse
     */
    public function show_places()
    {
        try {
            $places = Place::all();
            return response()->json($places);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }


    /**
     * Show categories for a place
     * @param int $place_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show_place_categories($place_id)
    {
        try {
            $place = Place::with('categories')->find($place_id);
            if (!$place) {
                return response()->json(['message' => 'Place not found'], 404);
            }
            return response()->json($place->categories);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }



    /**
     * Show ads for all categories and subcategories in a place
     * @param int $place_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show_places_ads($place_id)
    {
        try {
            // $place = Place::with('categories.subcategories.ads')->find($place_id);
            $place = Place::with([
                'categories.subcategories.ads' => function ($query) {
                    $query->where('status', 'approved');
                }
            ])->find($place_id);
            if (!$place) {
                return response()->json(['message' => 'Place not found'], 404);
            }
            $ads = $place->categories
                ->flatMap(function ($category) {
                    return $category->subcategories->flatMap->ads;
                })
                ->values();
            // return response()->json($place->categories->flatMap->subcategories->flatMap->ads);
            return response()->json($ads);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }


    /**
     * Show settings
     * @return \Illuminate\Http\JsonResponse
     */
    public function show_settings(){
        try {
            $settings =  Setting::first();
            return response()->json([
                'data' => $settings,
                'message' => 'Settings retrieved successfully'

            ], 200);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }


}
