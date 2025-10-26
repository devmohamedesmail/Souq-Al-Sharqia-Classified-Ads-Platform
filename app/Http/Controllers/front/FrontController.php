<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Ad;
use App\Models\Category;
use App\Models\Order;
use App\Models\Place;
use App\Models\Subcategory;
use Illuminate\Http\Request;
use Inertia\Inertia;


class FrontController extends Controller
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
     * Show front page
     * @return \Inertia\Response
     */
    public function index()
    {

        try {
            $places = Place::all();
            $categories = Category::with('subcategories')->get();
            $lastAds = Ad::orderBy('created_at', 'desc')->take(10)->where('status', 'approved')->get();
            return Inertia::render('front/Home/index', [
                'places' => $places,
                'categories' => $categories,
                'lastAds' => $lastAds
            ]);
        } catch (\Throwable $th) {
            return Inertia::render('front/Error404');
        }
    }

    // place_categories
    /**
     * Show categories for a place
     * @param string $slug
     * @param int $id
     * @return \Inertia\Response
     */
    public function place_categories($slug, $id)
    {

        try {
            $place = Place::with(['categories.subcategories'])->findOrFail($id);
            // Only categories related to this place, with their subcategories
            $categories = $place->categories;

            return Inertia::render('front/place_categories/index', [
                'place' => $place,
                'categories' => $categories,
            ]);
        } catch (\Throwable $th) {
            return Inertia::render('front/Error404');
        }
    }

    // post ad
    /**
     * Show post new ad page
     * @return \Inertia\Response
     */
    public function post_new_ads()
    {
        try {
            $places = Place::all();
            $categories = Category::with('subcategories')->get();
            $subcategories = Subcategory::all();
            return Inertia::render('front/post_ad/index', [
                'places' => $places,
                'categories' => $categories,
                'subcategories' => $subcategories,
            ]);
        } catch (\Throwable $th) {
            return Inertia::render('front/Error404');
        }
    }

  

   

    // show_ad_details
    /**
     * Show ad details and increment views
     * @param string $slug
     * @param int $id
     * @return \Inertia\Response
     */
    public function show_ad_details($slug, $id)
    {
        try {
            $ad = Ad::with(['places', 'subcategory'])->findOrFail($id);
            $ad->increment('views');
            return Inertia::render('front/AdDetails/index', ['ad' => $ad]);
        } catch (\Throwable $th) {
            return Inertia::render('front/Error404');
        }
    }

    

    /**
     * Show all ads
     * @return \Inertia\Response
     */
    public function show_all_ads()
    {
        try {
            $ads = Ad::with(['places', 'category', 'subcategory'])->where('status', 'approved')->get();
            $categories = Category::with('subcategories')->get();
            return Inertia::render('front/allAds/index', ['ads' => $ads, 'categories' => $categories]);
        } catch (\Throwable $th) {
            return Inertia::render('front/Error404');
        }
    }

    /**
     * Filter ads by place, category, subcategory
     * @param string|null $place_slug
     * @param string|null $category_slug
     * @param string|null $subcategory_slug
     * @return \Inertia\Response
     */
    public function filter($place_slug = null, $category_slug = null, $subcategory_slug = null)
    {
        try {
            $place = Place::where('slug', $place_slug)->first();
            $subcategory = Subcategory::where('slug', $subcategory_slug)->first();
            $category = Category::with('subcategories')->where('slug', $category_slug)->first();

            // Build ads query
            $adsQuery = Ad::query();
            if ($category) {
                $adsQuery->where('category_id', $category->id);
            }

            if ($subcategory) {
                $adsQuery->where('subcategory_id', $subcategory->id);
            }

            if ($place) {
                $adsQuery->whereHas('places', function ($q) use ($place) {
                    $q->where('places.id', $place->id);
                });
                // Or if you have place_id column: $adsQuery->where('place_id', $place->id);
            }
            $ads = $adsQuery->with(['category', 'subcategory', 'places'])->latest()->where('status', 'approved')->paginate(20);

            return Inertia::render('front/filterAds/index', [
                'place' => $place,
                'category' => $category,
                'subcategory' => $subcategory,
                'ads' => $ads,
            ]);
        } catch (\Throwable $th) {
            return Inertia::render('front/Error404');
        }
    }

    // show_favourite_page
    /**
     * Show favourite page
     * @return \Inertia\Response
     */
    public function show_favourite_page()
    {

        try {
            return Inertia::render('front/fav/index');
        } catch (\Throwable $th) {
            return Inertia::render('front/Error404');
        }
    }

    /**
     * Search ads
     * @param Request $request
     * @return \Inertia\Response
     */
    public function search(Request $request)
    {
        try {
            $query = $request->input('q');
            $ads = Ad::query()
                ->where('title', 'like', "%{$query}%")
                ->orWhere('description', 'like', "%{$query}%")
                ->where('status', 'approved')
                ->with(['category', 'subcategory', 'places'])
                ->latest()
                ->paginate(20)
                ->withQueryString();

            return Inertia::render('front/SearchResults/index', [
                'ads' => $ads,
                'query' => $query,
            ]);
        } catch (\Throwable $th) {
            return Inertia::render('front/Error404');
        }
    }

    /**
     * Show boost ad page
     * @return \Inertia\Response
     */
    public function BoostAd()
    {

        try {
            return Inertia::render('front/BoostAd/index');
        } catch (\Throwable $th) {
            return Inertia::render('front/Error404');
        }
    }

    /**
     * Store boost ad order
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Inertia\Response
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'phone' => 'required|string|max:255',
                'link' => 'required|string|max:255',
                'email' => 'nullable|email|max:255',
                'subject' => 'nullable|string|max:255',
            ], [
                'name.required' => $request->header('Accept-Language') === 'ar' ? 'الاسم مطلوب' : 'Name is required',
                'phone.required' => $request->header('Accept-Language') === 'ar' ? 'رقم الهاتف مطلوب' : 'Phone number is required',
                'link.required' => $request->header('Accept-Language') === 'ar' ? 'رابط الإعلان مطلوب' : 'Ad link is required',
                'email.email' => $request->header('Accept-Language') === 'ar' ? 'يرجى إدخال عنوان بريد إلكتروني صحيح' : 'Please enter a valid email address',
            ]);

            Order::create($validated);

            $successMessage = $request->header('Accept-Language') === 'ar'
                ? 'تم إرسال طلب تمييز الإعلان بنجاح!'
                : 'Your boost ad request has been submitted successfully!';

            return redirect()->back()->with('success', $successMessage);
        } catch (\Throwable $th) {
            return Inertia::render('front/Error404');
        }
    }

    // 404 Error Page
    /**
     * Show 404 error page
     * @return \Inertia\Response
     */
    public function notFound()
    {
        return Inertia::render('front/Error404');
    }

    // -----------------------------------------------------
}
