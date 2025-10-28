<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Ad;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdController extends Controller
{
    //ads_page
    public function ads_page()
    {
        try {
            $ads = Ad::all();
            return Inertia::render("admin/ads/index", ["ads" => $ads]);
        } catch (\Throwable $th) {
            return Inertia::render('admin/404');
        }
    }


    /**
     * Summary of ad_details_page
     * @param mixed $id
     * @return \Inertia\Response
     */

    public function ad_details_page($id)
    {
        try {
            $ad = Ad::findOrFail($id);
            return Inertia::render('admin/ads/details', ["ad" => $ad]);

        } catch (\Throwable $th) {
            return Inertia::render('admin/404');
        }
    }


    /**
     * Summary of delete_ad
     * @param mixed $id
     * @return \Illuminate\Http\RedirectResponse|\Inertia\Response
     */
    public function delete_ad($id)
    {
        try {
            $ad = Ad::findOrFail($id);
            $ad->delete();
            return redirect()->back();
        } catch (\Throwable $th) {
            return Inertia::render('admin/404');
        }
    }




    public function boost_ad($id)
    {
        try {
            $ad = Ad::findOrFail($id);
            $ad->featured = !$ad->featured; 
            $ad->save();
            return redirect()->back();
        } catch (\Throwable $th) {
            return Inertia::render('admin/404');
        }
    }


    /**
     * Summary of publish_ad
     * @param mixed $id
     * @return \Illuminate\Http\RedirectResponse|\Inertia\Response
     */
    public function publish_ad($id){
        try {
            $ad = Ad::findOrFail($id);
            $ad->status = 'approved'; 
            $ad->save();
            return redirect()->back();
        } catch (\Throwable $th) {
            return Inertia::render('admin/404');
        }
    }

    /**
     * Summary of reject_ad
     * @param mixed $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse|\Inertia\Response
     */
    public function reject_ad($id, Request $request){
        try {
            $request->validate([
                'reason' => 'required|string|max:255'
            ]);

            $ad = Ad::findOrFail($id);
            $ad->status = 'rejected'; 
            $ad->reason = $request->reason;
            $ad->save();
            
            return redirect()->back()->with('success', 'Ad rejected successfully');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Error rejecting ad: ' . $th->getMessage());
        }
    }


}
