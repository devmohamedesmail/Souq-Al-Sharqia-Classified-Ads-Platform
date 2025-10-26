<?php

namespace App\Models;

use App\Models\Place;
use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Ad extends Model
{
    /** @use HasFactory<\Database\Factories\AdFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'subcategory_id',
        'name',
        'email',
        'phone',
        'price',
        'title',
        'description',
        'type',
        'images',
        'featured',
        'published',
    ];


     protected $casts = [
        'images' => 'array',
    ];


    public function places()
    {
        return $this->belongsToMany(Place::class, 'ad_place');
    }


    public function category()
{
    return $this->belongsTo(Category::class, 'category_id');
}

    public function subcategory(){
        return $this->belongsTo(Subcategory::class,'category_id');
    }

}
