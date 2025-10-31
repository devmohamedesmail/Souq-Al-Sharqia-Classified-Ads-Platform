<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'website_name_en',
        'website_name_ar',
        'description_en',
        'description_ar',
        'keywords',
        'phone',
        'email',
        'address',
        'logo',
        'currency_en',
        'currency_ar',
        'meta_description',
        'meta_keywords',
        'meta_author',
        'maintenance_mode',
        'about_us',
        'copyright',
    ];

    protected $casts = [
        'maintenance_mode' => 'boolean',
    ];
}
