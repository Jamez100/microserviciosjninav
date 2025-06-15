<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateOrderRequest;
use App\Models\Order;
use App\Services\EventService;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Exception;

class OrderController extends Controller
{
    protected $eventService;
    protected $notificationService;

    public function __construct(EventService $eventService, NotificationService $notificationService)
    {
        $this->eventService = $eventService;
        $this->notificationService = $notificationService;
    }

    /**
     * Listar órdenes del usuario autenticado
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $userId = $request->get('user_id');
            
            $orders = Order::forUser($userId)
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $orders,
                'message' => 'Órdenes obtenidas exitosamente'
            ]);
        } catch (Exception $e) {
            Log::error('Error obteniendo órdenes: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error interno del servidor'
            ], 500);
        }
    }

    /**
     * Crear nueva orden de compra
     */
    public function store(CreateOrderRequest $request): JsonResponse
    {
        try {
            $userId = $request->get('user_id');
            $eventId = $request->input('event_id');
            $quantity = $request->input('quantity');

            // Obtener información del evento desde el servicio de eventos
            $event = $this->eventService->getEvent($eventId);
            
            if (!$event) {
                return response()->json([
                    'success' => false,
                    'message' => 'Evento no encontrado'
                ], 404);
            }

            // Verificar disponibilidad (simplificado)
            if (!$event['is_active']) {
                return response()->json([
                    'success' => false,
                    'message' => 'El evento no está disponible para compra'
                ], 400);
            }

            // Calcular total
            $totalAmount = $quantity * $event['price'];

            // Crear la orden
            $order = Order::create([
                'user_id' => $userId,
                'event_id' => $eventId,
                'quantity' => $quantity,
                'total_amount' => $totalAmount,
                'status' => Order::STATUS_PENDING
            ]);

            Log::info('Orden creada', ['order_id' => $order->id, 'user_id' => $userId]);

            return response()->json([
                'success' => true,
                'data' => $order,
                'event' => $event,
                'message' => 'Orden creada exitosamente'
            ], 201);

        } catch (Exception $e) {
            Log::error('Error creando orden: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error creando la orden: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener detalles de una orden específica
     */
    public function show(Request $request, string $id): JsonResponse
    {
        try {
            $userId = $request->get('user_id');
            
            $order = Order::forUser($userId)->find($id);

            if (!$order) {
                return response()->json([
                    'success' => false,
                    'message' => 'Orden no encontrada'
                ], 404);
            }

            // Obtener información del evento
            $event = $this->eventService->getEvent($order->event_id);

            return response()->json([
                'success' => true,
                'data' => $order,
                'event' => $event,
                'message' => 'Orden obtenida exitosamente'
            ]);

        } catch (Exception $e) {
            Log::error('Error obteniendo orden: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error interno del servidor'
            ], 500);
        }
    }

    /**
     * Confirmar pago de una orden
     */
    public function pay(Request $request, string $id): JsonResponse
    {
        try {
            $userId = $request->get('user_id');
            $userEmail = $request->get('user_email');
            
            $order = Order::forUser($userId)->find($id);

            if (!$order) {
                return response()->json([
                    'success' => false,
                    'message' => 'Orden no encontrada'
                ], 404);
            }

            if ($order->isPaid()) {
                return response()->json([
                    'success' => false,
                    'message' => 'La orden ya está pagada'
                ], 400);
            }

            // Simular procesamiento de pago
            $paymentReference = 'PAY_' . strtoupper(uniqid());
            
            // Marcar como pagada
            $order->markAsPaid($paymentReference);

            // Obtener información del evento para la notificación
            $event = $this->eventService->getEvent($order->event_id);

            // Enviar notificación por email
            $this->notificationService->sendPurchaseConfirmation([
                'user_id' => $userId,
                'order_id' => $order->id,
                'email' => $userEmail,
                'event_name' => $event['name'] ?? 'Evento',
                'quantity' => $order->quantity,
                'total_amount' => $order->total_amount,
                'payment_reference' => $paymentReference
            ]);

            Log::info('Pago confirmado', [
                'order_id' => $order->id, 
                'user_id' => $userId,
                'payment_reference' => $paymentReference
            ]);

            return response()->json([
                'success' => true,
                'data' => $order->fresh(),
                'message' => 'Pago confirmado exitosamente',
                'payment_reference' => $paymentReference
            ]);

        } catch (Exception $e) {
            Log::error('Error procesando pago: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error procesando el pago: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Health check del servicio
     */
    public function health(): JsonResponse
    {
        return response()->json([
            'service' => 'mservicio_compras',
            'status' => 'healthy',
            'timestamp' => now()->toISOString(),
            'version' => '1.0.0'
        ]);
    }
}