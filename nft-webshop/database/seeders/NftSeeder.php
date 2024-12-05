<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Nft;

class NftSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      
        Nft::factory()->create([
            'nft_collection_id' => rand(1, 6),
            'imageUrl' => 'https://global-uploads.webflow.com/6241bcd9e666c1514401461d/63fe0e433b5b52d772ca0129_cat-city-upcoming-nft-drop-nftmintradar-ethereum-blockchain.png'
        ]);
        Nft::factory()->create([
            'nft_collection_id' => rand(1, 6),
            'imageUrl' => 'https://www.prlog.org/12907178-bo-hoodie-1.png'
        ]);
        Nft::factory()->create([
            'nft_collection_id' => rand(1, 6),
            'imageUrl' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVOLAiXqmxI56wSVjAs7r9PhZecjOFLu7cva_Dn-0JCtqcXm07Eu5emQEklz4w_vt4GlE&usqp=CAU'
        ]);
        Nft::factory()->create([
            'nft_collection_id' => rand(1, 6),
            'imageUrl' => 'https://www.prlog.org/12907178-nacho-cyberpunk.png'
        ]);
        Nft::factory()->create([
            'nft_collection_id' => rand(1, 6),
            'imageUrl' => 'https://legiit-service.s3.amazonaws.com/cd221bcabce7b6c848d2905e3d8f915c/966fae648396abdf17ac7bd161237ca6.jpg'
        ]);
        Nft::factory()->create([
            'nft_collection_id' => rand(1, 6),
            'imageUrl' => 'https://nftnow.com/wp-content/uploads/2022/05/Screen-Shot-2022-05-09-at-12.53.17-PM.png'
        ]);
    }
}
