<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class StoreToolRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'category' => 'required|string',
            'description' => 'required|string',
            'price_per_day' => 'required|numeric|min:1',
            'quantity' => 'required|integer|min:1',
            'availability_from' => 'required',
            'availability_to' => 'required',
            'location' => 'required|string',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
            'images' => 'required|array|min:1|max:10',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:20048',
        ];
    }

    public function messages(): array
    {
        return [
            'images.required' => 'At least one image is required.',
            'images.max' => 'You cannot upload more than 10 photos.',
            'availability_to.after' => 'End date must be after the start date.',
        ];
    }
}
