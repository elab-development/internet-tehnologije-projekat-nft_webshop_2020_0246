<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\NftCollection;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Nft>
 */
class NftFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $colorNames = [
            'Red', 'Orange', 'Yellow', 'Green', 'Blue',
            'Purple', 'Pink', 'Brown', 'Gray', 'Black',
            'White', 'Teal', 'Cyan', 'Magenta', 'Lime',
        ];

        $animals = [
            'Tiger', 'Gorilla', 'Panter', 'Lion', 'Frog',
            'Elephant', 'Bee', 'Butterfly', 'Whale', 'Fish',
            'Hipo',
        ];

        return [
            'name' => $this->faker->randomElement($colorNames).' '.$this->faker->randomElement($animals), 
            'description' => $this->faker->sentence(),
            'nft_collection_id' => NftCollection::factory(),
        ];
    }
}
