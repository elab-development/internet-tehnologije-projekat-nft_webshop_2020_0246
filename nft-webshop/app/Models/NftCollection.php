<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NftCollection extends Model
{
    use HasFactory;

    protected $table = 'nft_collections';

    protected $fillable = [
        'name',
        'description', 
        'price',
        'crypto_currency',
        'user_prodaje_id',
        'user_kupuje_id',
    ];

    public function userKojiKupuje() {
        return $this->belongsTo(User::class, 'user_kupuje_id');
    }

    public function userKojiProdaje() {
        return $this->belongsTo(User::class, 'user_prodaje_id');
    }

    public function nfts() {
        return $this->hasMany(Nft::class);
    }
}
