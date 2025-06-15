<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Services\JwtService;
use Illuminate\Support\Facades\Log;

class JwtMiddleware
{
    protected $jwtService;

    public function __construct(JwtService $jwtService)
    {
        $this->jwtService = $jwtService;
    }

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            // Obtener token del header Authorization
            $token = $this->extractTokenFromHeader($request);

            if (!$token) {
                return response()->json([
                    'success' => false,
                    'message' => 'Token de autorización requerido'
                ], 401);
            }

            // Validar y decodificar el token
            $payload = $this->jwtService->validateToken($token);

            if (!$payload) {
                return response()->json([
                    'success' => false,
                    'message' => 'Token inválido o expirado'
                ], 401);
            }

            // Agregar información del usuario a la request
            $request->merge([
                'user_id' => $payload->user_id ?? $payload->sub,
                'user_email' => $payload->email ?? null,
                'user_role' => $payload->role ?? 'user',
                'jwt_payload' => $payload
            ]);

            Log::info('JWT validado', [
                'user_id' => $request->get('user_id'),
                'endpoint' => $request->path()
            ]);

            return $next($request);

        } catch (\Exception $e) {
            Log::error('Error en JWT middleware: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Error de autenticación'
            ], 401);
        }
    }

    /**
     * Extraer token del header Authorization
     */
    private function extractTokenFromHeader(Request $request): ?string
    {
        $header = $request->header('Authorization');
        
        if (!$header) {
            return null;
        }

        // Verificar formato "Bearer {token}"
        if (strpos($header, 'Bearer ') !== 0) {
            return null;
        }

        return substr($header, 7); // Remover "Bearer "
    }
}