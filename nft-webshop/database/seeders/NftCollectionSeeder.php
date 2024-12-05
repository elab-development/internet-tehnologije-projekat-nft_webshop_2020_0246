<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\NftCollection;

class NftCollectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {


        for ($i = 1; $i <= 3; $i++) {
            NftCollection::factory()->create([
                'user_prodaje_id' => rand(1, 3),
                'user_kupuje_id' => rand(4, 6),
            ]);
        }

        for ($i = 1; $i <= 3; $i++) {
            NftCollection::factory()->create([
                'user_prodaje_id' => rand(1, 3),
                'user_kupuje_id' => rand(4, 6),
                'crypto_currency' => 'Ethereum'
            ]);
        }
    }
}
