<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;

class AuthMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $header = $request->header('Authorization');
        if (!$header || !preg_match('/Bearer\s(\S+)/', $header, $matches)) {
            return response()->json(['mensaje'=>'Token no proporcionado'], 401);
        }
        $token = $matches[1];
        try {
            $payload = JWT::decode($token, env('JWT_SECRET'), ['HS256']);
            // inyectamos datos de usuario
            $request->attributes->add(['user'=>$payload]);
        } catch (Exception $e) {
            return response()->json(['mensaje'=>'Token inválido'], 401);
        }
        return $next($request);
    }
}
