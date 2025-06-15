<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\Payment;

/**
 * @OA\Tag(name="Payments", description="Operaciones para pagos de tickets")
 */
class PaymentController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/v1/pagar/{ticket_id}",
     *     summary="Confirmar pago de un ticket (requiere JWT)",
     *     tags={"Payments"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="ticket_id", in="path", required=true, @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Pago confirmado y notificado"),
     *     @OA\Response(response=404, description="Pago no encontrado"),
     *     @OA\Response(response=401, description="No autorizado")
     * )
     */
    public function confirm(int $ticket_id): JsonResponse
    {
        // 1) Buscar el payment
        $payment = Payment::where('ticket_id', $ticket_id)->first();
        if (! $payment) {
            return response()->json(['error' => 'Pago no encontrado'], 404);
        }

        // 2) Marcar como confirmado
        $payment->status = 'confirmed';
        $payment->save();

        // 3) Obtener usuario desde JWT
        $user = JWTAuth::parseToken()->authenticate();

        // 4) Notificar vía HTTP al microservicio de Notificaciones
        Http::post(
            config('services.notify.url') . '/api/v1/notify',
            [
                'email'   => $user->email,
                'subject' => 'Pago confirmado',
                'body'    => "Tu pago para el ticket #{$ticket_id} ha sido confirmado."
            ]
        );

        // 5) Devolver respuesta al cliente
        return response()->json([
            'message' => 'Pago confirmado y notificado',
            'payment' => $payment,
        ], 200);
    }
}
