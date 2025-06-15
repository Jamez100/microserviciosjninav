<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;

class JwtMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $request->user = $user;
        } catch (Exception $e) {
            return response()->json(['error' => 'Token inválido o ausente'], 401);
        }
        return $next($request);
    }
}
