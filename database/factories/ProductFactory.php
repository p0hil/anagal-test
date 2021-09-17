<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => 'Product ' . $this->faker->unique()->randomNumber(2),
            'description' => "Some product description",
            'price' => $this->faker->randomFloat(2, 10, 100)
        ];
    }
}
