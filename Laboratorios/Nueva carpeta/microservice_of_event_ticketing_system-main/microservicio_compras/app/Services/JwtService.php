<?php

namespace App\Services;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use Illuminate\Support\Facades\Log;

class JwtService
{
    private $secret;
    private $algorithm;

    public function __construct()
    {
        $this->secret = env('JWT_SECRET', 'default-secret-key');
        $this->algorithm = 'HS256';
    }

    /**
     * Validar y decodificar un token JWT
     */
    public function validateToken(string $token)
    {
        try {
            $decoded = JWT::decode($token, new Key($this->secret, $this->algorithm));
            
            Log::info('Token JWT validado exitosamente', [
                'user_id' => $decoded->user_id ?? $decoded->sub ?? 'unknown',
                'exp' => $decoded->exp ?? 'no-exp'
            ]);
            
            return $decoded;
            
        } catch (ExpiredException $e) {
            Log::warning('Token JWT expirado: ' . $e->getMessage());
            return null;
        } catch (SignatureInvalidException $e) {
            Log::error('Firma JWT inválida: ' . $e->getMessage());
            return null;
        } catch (\Exception $e) {
            Log::error('Error validando JWT: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Crear un nuevo token JWT (útil para testing)
     */
    public function createToken(array $payload): string
    {
        $defaultPayload = [
            'iat' => time(),
            'exp' => time() + (60 * 60 * 24), // 24 horas
        ];

        $finalPayload = array_merge($defaultPayload, $payload);

        return JWT::encode($finalPayload, $this->secret, $this->algorithm);
    }

    /**
     * Verificar si un token está expirado
     */
    public function isTokenExpired(string $token): bool
    {
        try {
            $decoded = JWT::decode($token, new Key($this->secret, $this->algorithm));
            return false;
        } catch (ExpiredException $e) {
            return true;
        } catch (\Exception $e) {
            return true;
        }
    }
}