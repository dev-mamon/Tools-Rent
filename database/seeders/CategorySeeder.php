<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Electronics',
            'Fashion',
            'Health & Beauty',
            'Home & Lifestyle',
            'Groceries',
            'Sports & Outdoors',
            'Automotive',
            'Books & Stationery',
            'Jewelry & Watches',
            'Toys & Games',
            'Pet Supplies',
            'Furniture',
            'Tools & Hardware',
            'Garden & Patio',
            'Musical Instruments',
            'Office Products',
            'Art & Crafts',
            'Baby Products',
            'Computers & Accessories',
            'Software & Services',
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['slug' => Str::slug($category)], // Slug diye check korbe jate duplicate na hoy
                [
                    'name' => $category,
                    'image' => null,
                    'status' => 'active',
                ]
            );
        }
    }
}
