<?php

namespace App\Models;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    /** @use HasFactory<\Database\Factories\PlaceFactory> */
    use HasFactory;
     protected $fillable = [
        'name',
        'slug',
        'description',
        'address',
        'latitude',
        'longitude',
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }
}
