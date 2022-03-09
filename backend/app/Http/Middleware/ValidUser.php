<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Tokens;

class ValidUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $token= $request->header("Authorization");
        $token= Tokens::where('token',$token)->where('expired_at',null)->first();
        if($token)
        {
            return $next($request);
        }
        else
        {
            return response('Invalid Token',401);
        }
    }
}
