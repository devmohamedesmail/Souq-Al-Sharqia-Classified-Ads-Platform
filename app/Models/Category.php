<?php

namespace App\Models;

use App\Models\Ad;
use App\Models\Place;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;

    protected $fillable = [
        'title_en',
        'title_ar',
        'slug',
        'image',
        'description',
        'is_active',
        'sort_order',
        'parent_id',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'meta_image',
        'meta_robots',
        'meta_canonical',
        'meta_author',
        'meta_open_graph_title',
        'meta_open_graph_description',
    ];

    public function places()
    {
        return $this->belongsToMany(Place::class);
    }

    public function subcategories()
    {
        return $this->belongsToMany(Subcategory::class);
    }
       

    public function ads()
    {
        return $this->hasMany(Ad::class);
    }
}
