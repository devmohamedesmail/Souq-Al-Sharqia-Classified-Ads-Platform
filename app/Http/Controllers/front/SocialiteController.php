<?php

namespace App\Http\Controllers\front;

use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class SocialiteController extends Controller
{
    /**
     * Google Redirect
     */
    public function google_redirect()
    {

        return Socialite::driver('google')->redirect();
    }

    /**
     * Google Callback
     */
    public function google_callback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();

        $user = User::where('email', $googleUser->email)->first();

        if ($user) {
            $user->update([
                'provider_id' => $googleUser->id,
                'provider_token' => $googleUser->token,
                'provider_name' => 'google',
                'provider_refresh_token' => $googleUser->refreshToken,
            ]);
        } else {
            $user = User::create([
                'name' => $googleUser->name,
                'email' => $googleUser->email,
                'provider_id' => $googleUser->id,
                'provider_token' => $googleUser->token,
                'provider_name' => 'google',
                'provider_refresh_token' => $googleUser->refreshToken,
            ]);
        }

        Auth::login($user);

        return redirect('/');
    }

    /**
     * Facebook Redirect
     */
    public function facebook_redirect()
    {
        return Socialite::driver('facebook')->redirect();
    }

    /**
     * Facebook Callback
     */
    public function facebook_callback()
    {

        $facebookUser = Socialite::driver('facebook')->user();

        $user = User::where('email', $facebookUser->email)->first();
        if ($user) {
            $user->update([
                'provider_id' => $facebookUser->id,
                'provider_token' => $facebookUser->token,
                'provider_name' => 'facebook',
                'provider_refresh_token' => $facebookUser->refreshToken,
            ]);
        } else {
            $user = User::create([
                'name' => $facebookUser->name,
                'email' => $facebookUser->email,
                'provider_id' => $facebookUser->id,
                'provider_name' => 'facebook',
                'provider_token' => $facebookUser->token,
                'provider_refresh_token' => $facebookUser->refreshToken,
            ]);
        }

        Auth::login($user);

        return redirect('/');
    }
}
