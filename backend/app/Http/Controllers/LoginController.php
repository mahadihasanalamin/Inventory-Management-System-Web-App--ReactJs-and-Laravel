<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Managers;
use App\Models\Users;
use App\Models\Tokens;
use Illuminate\Support\Str;
use Carbon\Carbon;

class LoginController extends Controller
{

    public function login(Request $request){
       
        // $this->validate(
        //     $request,
        //     [
        //         'phone'=>'required',
        //         'password'=>'required'
        //     ]
        // );

        $user = Users::where('phone',$request->phone)->first();
        if($user){
            if($request->password === $user->password)
            {
                if($user->usertype == 'admin')
                {
                    $date=Carbon::now();
                    // $request->session()->put('user',$user->manager);
                    // return redirect()->route('dashboard');
                    $token =new Tokens;
                    $token->u_id = $user->u_id;
                    $token->token = Str::random(32);
                    $token->created_at = $date->toDateTimeString();
                    $token->save();

                    return $token;
                }
                else
                {
                    $obj = array('fail'=>'manager Panel is under Construction...');
                    return (object)$obj;
                }
            }
            else{
                $obj = array('fail'=>'Incorrect password');
                return (object)$obj;
            }
        }
        else{
            $obj = array('fail'=>'user does not exist');
                return (object)$obj;
        }
       
    }

    public function logout(Request $request)
    {
        $date=Carbon::now();
        $token = Tokens::where('id',$request->id)->first();
        $token->expired_at =$date->toDateTimeString();
        $token->save();
        return 'token expired';
    }
}
