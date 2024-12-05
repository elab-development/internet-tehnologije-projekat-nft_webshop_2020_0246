<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nft extends Model
{
    use HasFactory;

    protected $table = 'nfts';

    protected $fillable = [
        'name',
        'description', 
        'nft_collection_id',
        'imageUrl',
    ];

    public function nftCollection() {
        return $this->belongsTo(NftCollection::class);
    }
}
