<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;


class AuthController extends Controller
{
    //

    /**
     * Register a new user
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        try {
            $token = JWTAuth::fromUser($user);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }

        return response()->json([
            'token' => $token,
            'user' => $user,
        ], 201);
    }

    /**
     * Login user and return JWT token
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        try {
            $credentials = $request->only('email', 'password');

            try {
                if (!$token = JWTAuth::attempt($credentials)) {
                    return response()->json(['error' => 'Invalid credentials'], 401);
                }
            } catch (JWTException $e) {
                return response()->json(['error' => 'Could not create token'], 500);
            }

            $user = auth()->user();

            return response()->json([
                'status' => 200,
                'token' => $token,
                // 'expires_in' => auth('api')->factory()->getTTL() * 60,
                'expires_in' => JWTAuth::factory()->getTTL() * 60,
                'user' => $user,
            ]);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Something went wrong, please try again'], 500);
        }
    }

    /**
     * Logout user and invalidate token
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
        } catch (JWTException $e) {
            return response()->json(['error' => 'Failed to logout, please try again'], 500);
        }

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Get authenticated user profile
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUser()
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }
            return response()->json($user);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Failed to fetch user profile'], 500);
        }
    }

    /**
     * Update authenticated user profile
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateUser(Request $request)
    {
        try {
            $user = Auth::user();
            $user->update($request->only(['name', 'email']));
            return response()->json($user);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Failed to update user'], 500);
        }
    }





    // delete user
    public function delete($id)
    {
        try {
            $user = User::find($id);
            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }
            $user->delete();
            return response()->json(['message' => 'User deleted successfully']);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Failed to delete user'], 500);
        }
    }









}
