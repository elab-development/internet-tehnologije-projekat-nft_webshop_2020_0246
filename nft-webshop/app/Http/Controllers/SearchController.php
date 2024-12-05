<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\NftCollectionResource;
use App\Models\NftCollection;

class SearchController extends Controller
{
    public function searchCryptoCurrency(Request $request)
    {
        $upit = NftCollection::query();


        if ($request->has('crypto_currency')) {
            $upit->where('crypto_currency', 'like', '%' . $request->input('crypto_currency') . '%');
        }

  
        $page = $request->input('page', 1);


        $perPage = 1;

        $Services = $upit->orderBy('crypto_currency')->paginate($perPage, ['*'], 'page', $page);

        if($Services->isEmpty()){
            return response()->json(['Message' => 'There are no NFT collections where price is evaluated in that currency.'], 404);
        }
        return response()->json(['Current page' => $Services->currentPage(), 'Last page' => $Services->lastPage(),
         'NFT Collections that have been found: ' => NftCollectionResource::collection($Services)], 200);
    }
}
