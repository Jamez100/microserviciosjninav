<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NotificationService
{
    private $notificationsServiceUrl;

    public function __construct()
    {
        $this->notificationsServiceUrl = env('NOTIFICATIONS_SERVICE_URL', 'http://localhost:8004');
    }

    /**
     * Enviar confirmación de compra por email
     */
    public function sendPurchaseConfirmation(array $data): bool
    {
        try {
            $payload = [
                'user_id' => $data['user_id'],
                'order_id' => $data['order_id'],
                'email' => $data['email'],
                'subject' => 'Confirmación de Compra - ' . $data['event_name'],
                'content' => $this->buildEmailContent($data),
                'type' => 'purchase_confirmation'
            ];

            $response = Http::timeout(10)
                ->post("{$this->notificationsServiceUrl}/api/notifications", $payload);

            if ($response->successful()) {
                Log::info('Notificación enviada exitosamente', [
                    'order_id' => $data['order_id'],
                    'email' => $data['email']
                ]);
                return true;
            }

            Log::warning('Error enviando notificación', [
                'order_id' => $data['order_id'],
                'status' => $response->status(),
                'response' => $response->body()
            ]);
            return false;

        } catch (\Exception $e) {
            Log::error('Error enviando notificación: ' . $e->getMessage(), [
                'order_id' => $data['order_id'] ?? 'unknown',
                'service_url' => $this->notificationsServiceUrl
            ]);
            return false;
        }
    }

    /**
     * Construir contenido del email de confirmación
     */
    private function buildEmailContent(array $data): string
    {
        $eventName = $data['event_name'] ?? 'Evento';
        $quantity = $data['quantity'] ?? 1;
        $totalAmount = $data['total_amount'] ?? 0;
        $paymentReference = $data['payment_reference'] ?? 'N/A';

        return "
        <h2>¡Compra Confirmada!</h2>
        <p>Tu compra ha sido procesada exitosamente.</p>
        
        <h3>Detalles de la compra:</h3>
        <ul>
            <li><strong>Evento:</strong> {$eventName}</li>
            <li><strong>Cantidad de entradas:</strong> {$quantity}</li>
            <li><strong>Total pagado:</strong> $" . number_format($totalAmount, 2) . "</li>
            <li><strong>Referencia de pago:</strong> {$paymentReference}</li>
            <li><strong>Orden ID:</strong> {$data['order_id']}</li>
        </ul>
        
        <p>Guarda este email como comprobante de tu compra.</p>
        <p>¡Disfruta el evento!</p>
        
        <hr>
        <small>Sistema de Venta de Entradas</small>
        ";
    }

    /**
     * Enviar notificación de orden cancelada
     */
    public function sendOrderCancellation(array $data): bool
    {
        try {
            $payload = [
                'user_id' => $data['user_id'],
                'order_id' => $data['order_id'],
                'email' => $data['email'],
                'subject' => 'Orden Cancelada - ' . ($data['event_name'] ?? 'Evento'),
                'content' => $this->buildCancellationContent($data),
                'type' => 'order_cancellation'
            ];

            $response = Http::timeout(10)
                ->post("{$this->notificationsServiceUrl}/api/notifications", $payload);

            return $response->successful();

        } catch (\Exception $e) {
            Log::error('Error enviando notificación de cancelación: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Construir contenido del email de cancelación
     */
    private function buildCancellationContent(array $data): string
    {
        $eventName = $data['event_name'] ?? 'Evento';
        $orderId = $data['order_id'] ?? 'N/A';

        return "
        <h2>Orden Cancelada</h2>
        <p>Tu orden ha sido cancelada.</p>
        
        <h3>Detalles:</h3>
        <ul>
            <li><strong>Evento:</strong> {$eventName}</li>
            <li><strong>Orden ID:</strong> {$orderId}</li>
        </ul>
        
        <p>Si tienes preguntas, contacta nuestro soporte.</p>
        
        <hr>
        <small>Sistema de Venta de Entradas</small>
        ";
    }
}