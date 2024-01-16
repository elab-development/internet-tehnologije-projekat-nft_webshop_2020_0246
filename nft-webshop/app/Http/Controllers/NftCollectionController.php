<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use App\Http\Resources\NftCollectionResource;
use App\Models\NftCollection;

class NftCollectionController extends Controller
{
    public function store(Request $request)
    {
        $user_id = Auth::user()->id;
        // Validacija za polja koja se unose preko requesta
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'price' => 'required',
            'crypto_currency' => 'required',
        ]);

        // Provera validacije
        if ($validator->fails()) {
            return response()->json(['Errors' => $validator->errors()], 400);
        }


        $nftCollection = new NftCollection();
        $nftCollection->name = $request->name;
        $nftCollection->description = $request->description;
        $nftCollection->price = $request->price;
        $nftCollection->crypto_currency = $request->crypto_currency;
        $nftCollection->user_prodaje_id = $user_id;
        $nftCollection->user_kupuje_id = null;

        $nftCollection->save();

        return response()->json(['Message' => 'Successfuly created new NFT collection!!!', 
            'NFT Collection' => new NftCollectionResource($nftCollection)]);

    }

    public function update(Request $request, $id)
    {

            $user_id = Auth::user()->id;

            // Validacija za polja koja se unose preko requesta
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'description' => 'required',
                'price' => 'required',
                'crypto_currency' => 'required',
            ]);

            // Provera validacije
            if ($validator->fails()) {
                return response()->json(['Errors' => $validator->errors()], 400);
            }

            $nftCollection = NftCollection::findOrFail($id);
            if($nftCollection->user_prodaje_id != $user_id){
                return response()->json(['Error' => 'Unauthorized: User ID does not match the creators id!'], 403);
            }

            $nftCollection->name = $request->name;
            $nftCollection->description = $request->description;
            $nftCollection->price = $request->price;
            $nftCollection->crypto_currency = $request->crypto_currency;

            $nftCollection->save();

            return response()->json(['Message' => 'NFT Collection successfuly edited!', 'nftCollection' => new NftCollectionResource($nftCollection)]);
    }

    public function updatePrice(Request $request, $id)
    {
            $user_id = Auth::user()->id;

            // Validacija za polja koja se unose preko requesta
            $validator = Validator::make($request->all(), [
                'price' => 'required',
            ]);

            // Provera validacije
            if ($validator->fails()) {
                return response()->json(['Errors' => $validator->errors()], 400);
            }

            $nftCollection = NftCollection::findOrFail($id);
            if($nftCollection->user_prodaje_id != $user_id){
                return response()->json(['Error' => 'Unauthorized: User ID does not match the creators id!'], 403);
            }

            $nftCollection->price = $request->price;

            $nftCollection->save();

            return response()->json(['Message' => 'The price of NFT Collection has successfuly been edited!', 'nftCollection' => new NftCollectionResource($nftCollection)]);
    }

    public function destroy($id)
    {
        $user_id = Auth::user()->id;

        $nftCollection = NftCollection::findOrFail($id);

        if($nftCollection->user_prodaje_id != $user_id){
            return response()->json(['Error' => 'Unauthorized: User ID does not match the creators id!'], 403);
        }

        $nftCollection->delete();

        return response()->json(['Message' => 'The NFT Collection has successfuly been deleted.']);
    }

    public function kupiNftKolekciju(Request $request, $id)
    {
            $user_id = Auth::user()->id;
            $nftCollection = NftCollection::findOrFail($id);

            $nftCollection->user_kupuje_id = $user_id;

            $nftCollection->save();

            return response()->json(['Message' => 'You have successfuly bought an NFT Collection!', 'nftCollection' => new NftCollectionResource($nftCollection)]);
    }

}
