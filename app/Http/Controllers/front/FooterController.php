<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FooterController extends Controller
{

    /**
     * Show About page
     * @return \Inertia\Response
     */
    public function about()
    {
        return Inertia::render('front/footerpages/About');
    }

    /**
     * Show Terms page
     * @return \Inertia\Response
     */
    public function terms()
    {
        return Inertia::render('front/footerpages/Terms');
    }

    /**
     * Show Privacy page
     * @return \Inertia\Response
     */
    public function privacy()
    {
        return Inertia::render('front/footerpages/Privacy');
    }

    /**
     * Show Contact page
     * @return \Inertia\Response
     */
    public function contact()
    {
        return Inertia::render('front/footerpages/Contact');
    }

    /**
     * Show Complaints page
     * @return \Inertia\Response
     */
    public function complaints()
    {
        return Inertia::render('front/footerpages/Complaints');
    }

    /**
     * Submit a complaint or suggestion
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function submitComplaint(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:255',
            'type' => 'required|string|in:complaint,suggestion,bug,feedback',
            'priority' => 'nullable|string|in:low,medium,high,urgent',
            'subject' => 'required|string|max:255',
            'description' => 'required|string',
            'ad_id' => 'nullable|string|max:255',
        ], [
            'name.required' => $request->header('Accept-Language') === 'ar' ? 'الاسم مطلوب' : 'Name is required',
            'email.required' => $request->header('Accept-Language') === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required',
            'email.email' => $request->header('Accept-Language') === 'ar' ? 'يرجى إدخال عنوان بريد إلكتروني صحيح' : 'Please enter a valid email address',
            'type.required' => $request->header('Accept-Language') === 'ar' ? 'نوع الرسالة مطلوب' : 'Message type is required',
            'subject.required' => $request->header('Accept-Language') === 'ar' ? 'الموضوع مطلوب' : 'Subject is required',
            'description.required' => $request->header('Accept-Language') === 'ar' ? 'التفاصيل مطلوبة' : 'Description is required',
        ]);

        // Here you can save to database or send email
        // For now, just redirect back with success message
        $successMessage = $request->header('Accept-Language') === 'ar'
            ? 'تم إرسال شكواكم/اقتراحكم بنجاح!'
            : 'Your complaint/suggestion has been submitted successfully!';

        return redirect()->back()->with('success', $successMessage);
    }

    /**
     * Show Boost Ad Info page
     * @return \Inertia\Response
     */
    public function boostAdInfo()
    {
        return Inertia::render('front/footerpages/BoostAdPage');
    }

    /**
     * Show Advertise With Us page
     * @return \Inertia\Response
     */
    public function advertiseWithUs()
    {
        return Inertia::render('front/footerpages/AdvertiseWithUs');
    }

    /**
     * Show Website Commission page
     * @return \Inertia\Response
     */
    public function websiteCommission()
    {
        return Inertia::render('front/footerpages/WebsiteCommission');
    }

}
