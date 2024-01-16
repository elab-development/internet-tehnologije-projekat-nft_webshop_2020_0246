<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
    //fja za registraciju
    public function register(Request $request)
    {
        $validator=Validator::make($request->all(),[
            'name'=>'required|string',
            'email'=>'required|string|email|unique:users',
            'password'=>'required|string'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $user=User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password)
        ]);

        $token=$user->createToken('auth_token')->plainTextToken;
        
        return response()->json([
            'Message' => 'Succesful registration. You are now a user of NFT Webshop!💲💲💲',
            'user'=>$user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    //fja za logovanje na app
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['Error:', $validator->errors()]);
        }

        if(!Auth::attempt($request->only('email','password'))){
            return response()->json(['Message'=>'The login parameters are not correct.'], 401);
        }

        $user = User::where('email', $request['email']) -> firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'Message' => 'Hello,' . $user->name . ' welcome to NFT Webshop!🐵',
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    //fja za logout
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['Message'=> 'Successful logout']);
    }
}
