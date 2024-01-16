<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NftCollectionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'name' => $this->resource->name,
            'description' => $this->resource->description,
            'price' => $this->resource->price,
            'crypto_currency' => $this->resource->crypto_currency,
            'user_prodaje_id' => $this->resource->user_prodaje_id,
            'user_kupuje_id' => $this->resource->user_kupuje_id,
        ];
    }
}
