<?php

namespace App\Models;

use App\Models\Ad;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Subcategory extends Model
{
    /** @use HasFactory<\Database\Factories\SubcategoryFactory> */
    use HasFactory;

    protected $fillable = [
        'title_en',
        'title_ar',
        'slug',
        'image',
        'description',
        'meta_description',
        'meta_keywords',
        'meta_image',
        'meta_robots',
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function ads(){
        return $this->hasMany(Ad::class);
    }
}
