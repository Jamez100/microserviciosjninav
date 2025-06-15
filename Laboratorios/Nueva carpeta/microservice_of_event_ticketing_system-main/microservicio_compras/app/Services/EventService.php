<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class EventService
{
    private $eventsServiceUrl;

    public function __construct()
    {
        $this->eventsServiceUrl = env('EVENTS_SERVICE_URL', 'http://localhost:8002');
    }

    /**
     * Obtener información de un evento por su ID
     */
    public function getEvent(int $eventId): ?array
    {
        try {
            $response = Http::timeout(10)->get("{$this->eventsServiceUrl}/api/events/{$eventId}");

            if ($response->successful()) {
                $data = $response->json();
                
                if ($data['success'] ?? false) {
                    return $data['data'] ?? null;
                }
            }

            Log::warning('Evento no encontrado', ['event_id' => $eventId, 'status' => $response->status()]);
            return null;

        } catch (\Exception $e) {
            Log::error('Error consultando servicio de eventos: ' . $e->getMessage(), [
                'event_id' => $eventId,
                'service_url' => $this->eventsServiceUrl
            ]);

            // Retornar datos mock en caso de error para evitar fallos críticos
            return $this->getMockEvent($eventId);
        }
    }

    /**
     * Obtener lista de eventos disponibles
     */
    public function getAvailableEvents(): array
    {
        try {
            $response = Http::timeout(10)->get("{$this->eventsServiceUrl}/api/events");

            if ($response->successful()) {
                $data = $response->json();
                
                if ($data['success'] ?? false) {
                    return $data['data'] ?? [];
                }
            }

            Log::warning('Error obteniendo lista de eventos', ['status' => $response->status()]);
            return [];

        } catch (\Exception $e) {
            Log::error('Error consultando lista de eventos: ' . $e->getMessage());
            return [];
        }
    }

    /**
     * Verificar disponibilidad de entradas para un evento
     */
    public function checkAvailability(int $eventId, int $quantity): bool
    {
        try {
            $response = Http::timeout(10)
                ->get("{$this->eventsServiceUrl}/api/events/{$eventId}/availability", [
                    'quantity' => $quantity
                ]);

            if ($response->successful()) {
                $data = $response->json();
                return $data['available'] ?? false;
            }

            return false;

        } catch (\Exception $e) {
            Log::error('Error verificando disponibilidad: ' . $e->getMessage());
            return false; // Por seguridad, asumimos no disponible
        }
    }

    /**
     * Datos mock para casos de error en el servicio externo
     */
    private function getMockEvent(int $eventId): array
    {
        return [
            'id' => $eventId,
            'name' => 'Evento Mock',
            'description' => 'Evento de prueba (servicio no disponible)',
            'date' => now()->addDays(30)->toISOString(),
            'location' => 'Ubicación no disponible',
            'capacity' => 100,
            'price' => 50.00,
            'is_active' => true,
            'created_at' => now()->toISOString()
        ];
    }
}