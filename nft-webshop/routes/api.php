<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

use App\Http\Controllers\UserController;
use App\Http\Controllers\NftController;
use App\Http\Controllers\NftCollectionController;

use App\Http\Controllers\SearchController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//rute kojima svako moze da pristupi
Route::post('/register',[AuthController::class,'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::resource('users', UserController::class, ['only' => ['index', 'show']]);

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::post('/nfts', [NftController::class,'store']);

    Route::post('/nft_collections', [NftCollectionController::class,'store']);
    Route::put('/nft_collections/{id}', [NftCollectionController::class,'update']);
    Route::patch('/nft_collections/{id}', [NftCollectionController::class,'updatePrice']);
    Route::delete('/nft_collections/{id}', [NftCollectionController::class,'destroy']);
    Route::post('/nft_collections/kupi/{id}', [NftCollectionController::class,'kupiNftKolekciju']);
    Route::get('/nft_collections/searchByCryptoCurrency',[SearchController::class,'searchCryptoCurrency']);

    Route::post('/logout', [AuthController::class, 'logout']); 
});   