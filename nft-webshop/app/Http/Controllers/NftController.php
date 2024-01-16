<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use App\Http\Resources\NftResource;
use App\Models\Nft;
use App\Models\NftCollection;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class NftController extends Controller
{
    public function store(Request $request)
    {

        $user_id = Auth::user()->id;

        // Validacija za polja koja se unose preko requesta
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'nft_collection_id' => 'required|exists:nft_collections,id',
        ]);

        // Provera validacije
        if ($validator->fails()) {
            return response()->json(['Errors' => $validator->errors()], 400);
        }

        $nft_collection_user_id = NftCollection::where('id', $request->nft_collection_id)->value('user_prodaje_id');

        if($user_id != $nft_collection_user_id){
            return response()->json(['error' => 'Unauthorized: Current user didnt create that nft collection!!!'], 403);
        }

        $imageName = Str::random(32).".".$request->image->getClientOriginalExtension();

        $nft = new Nft();
        $nft->name = $request->name;
        $nft->description = $request->description;
        $nft->imageUrl = $imageName;
        $nft->nft_collection_id = $request->nft_collection_id;

        $nft->save();

        //cuvanje slike u folderu storage
        Storage::disk('public')->put($imageName, file_get_contents($request->image));

        return response()->json(['Message' => 'You have successfuly created an NFT!', 
            'nft' => new NftResource($nft)]);
    }
}
