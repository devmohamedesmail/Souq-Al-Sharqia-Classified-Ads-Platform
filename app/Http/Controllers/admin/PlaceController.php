<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Place;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlaceController extends Controller
{
    //
    public function places_page()
    {
        try {
            return Inertia::render('admin/places/index');
        } catch (\Throwable $th) {
            return Inertia::render('admin/404');
        }
    }

    public function place_store(Request $request)
    {
        try {

            $validated = $request->validate([
                'name' => 'nullable|string|max:255',
                'slug' => 'required|string|max:255|unique:places,slug',
                'description' => 'nullable|string',
                'address' => 'nullable|string|max:255',
                'latitude' => 'nullable|string|max:255',
                'longitude' => 'nullable|string|max:255',
            ]);

            Place::create($validated);

            return redirect()->back()->with('success', __('Place added successfully'));
        } catch (\Throwable $th) {
            return Inertia::render('admin/404');
        }
    }

    // place_edit
    public function place_edit($slug, $id)
    {
        try {
            $place = Place::findOrFail($id);
            return Inertia::render('admin/places/edit', ['place' => $place]);
        } catch (\Throwable $th) {
            return Inertia::render('admin/404');
        }
    }

    public function place_edit_confirm(Request $request, $id)
    {
        try {
            $place = Place::findOrFail($id);
            $place->update($request->all());
            return redirect()->back()->with('success', __('Place updated successfully'));
        } catch (\Throwable $th) {
            return Inertia::render('admin/404');
        }
    }


    public function place_delete($id)
    {
        try {
            $place = Place::findOrFail($id);
            $place->delete();
            return redirect()->back()->with('success', __('Place deleted successfully'));
        } catch (\Throwable $th) {
           return Inertia::render('admin/404');
        }
    }



}
