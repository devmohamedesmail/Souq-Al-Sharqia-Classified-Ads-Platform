<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class UserManagementController extends Controller
{
    /**
     * Display a listing of users
     */
    public function index()
    {


        try {

            // Check if user is admin
            if (!auth()->check() || auth()->user()->role !== 'admin') {
                abort(403, 'Unauthorized access');
            }

            $users = User::orderBy('created_at', 'desc')->get();
            return Inertia::render('admin/users/index', [
                'users' => $users
            ]);
        } catch (\Throwable $th) {
            return Inertia::render('admin/404');
        }

    }

    /**
     * Show the form for creating a new user
     */
    public function create()
    {
        try {
            // Check if user is admin
            if (!auth()->check() || auth()->user()->role !== 'admin') {
                abort(403, 'Unauthorized access');
            }

            return Inertia::render('admin/users/create');

        } catch (\Throwable $th) {
            return Inertia::render('admin/404');
        }
    }

    /**
     * Store a newly created user in storage
     */
    public function store(StoreUserRequest $request)
    {
        try {
            // Check if user is admin
            if (!auth()->check() || auth()->user()->role !== 'admin') {
                abort(403, 'Unauthorized access');
            }

            $validated = $request->validated();

            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'phone' => $validated['phone'] ?? null,
            ]);

            return redirect()->route('users.index')->with('success', __('messages.user_created_successfully'));
        } catch (\Throwable $th) {
            return Inertia::render('admin/404');
        }
    }

    /**
     * Show the form for editing the specified user
     */
    public function edit(User $user)
    {

        try {
            // Check if user is admin
            if (!auth()->check() || auth()->user()->role !== 'admin') {
                abort(403, 'Unauthorized access');
            }

            return Inertia::render('admin/users/edit', [
                'user' => $user
            ]);

        } catch (\Throwable $th) {
            return Inertia::render('admin/404');
        }
    }

    /**
     * Update the specified user in storage
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        try {
            // Check if user is admin
            if (!auth()->check() || auth()->user()->role !== 'admin') {
                abort(403, 'Unauthorized access');
            }

            $validated = $request->validated();

            $updateData = [
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'] ?? null,
            ];

            // Only update password if provided
            if (!empty($validated['password'])) {
                $updateData['password'] = Hash::make($validated['password']);
            }

            $user->update($updateData);
            return redirect()->route('users.index')->with('success', __('messages.user_updated_successfully'));

        } catch (\Throwable $th) {
            return Inertia::render('admin/404');
        }
    }

    /**
     * Remove the specified user from storage
     */
    public function destroy($id)
    {
        try {

             // Check if user is admin
            if (!auth()->check() || auth()->user()->role !== 'admin') {
                abort(403, 'Unauthorized access');
            }


            $user = User::findOrFail($id);
            $user->delete();
            return redirect()->back();

            
        } catch (\Throwable $th) {
            return Inertia::render('admin/404');
        }
    }

    /**
     * Show user details
     */
    public function show(User $user)
    {
        try {
            // Check if user is admin
            if (!auth()->check() || auth()->user()->role !== 'admin') {
                abort(403, 'Unauthorized access');
            }

            return Inertia::render('admin/users/show', [
                'user' => $user
            ]);
        } catch (\Throwable $th) {
            return Inertia::render('admin/404');
        }
    }
}
