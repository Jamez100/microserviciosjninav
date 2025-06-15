<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;

/**
 * @OA\Tag(
 *     name="Events",
 *     description="Operaciones para obtener eventos desde el microservicio de Eventos"
 * )
 */
class EventController extends Controller
{
    protected string $baseUrl;

    public function __construct()
    {
        // Tomamos la URL base desde config/services.php
        $this->baseUrl = config('services.events.url', 'http://localhost:8001/api/v1');
    }

    /**
     * @OA\Get(
     *     path="/api/v1/events",
     *     summary="Listar eventos disponibles",
     *     tags={"Events"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de eventos",
     *         @OA\JsonContent(type="array", @OA\Items())
     *     ),
     *     @OA\Response(response=502, description="Error al comunicarse con el servicio de Eventos")
     * )
     */
    public function index(): JsonResponse
    {
        $response = Http::get("{$this->baseUrl}/events");

        if ($response->failed()) {
            return response()->json([
                'message' => 'No se pudo obtener la lista de eventos'
            ], 502);
        }

        return response()->json($response->json(), 200);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/events/{id}",
     *     summary="Obtener detalle de un evento",
     *     tags={"Events"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del evento",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Detalle del evento",
     *         @OA\JsonContent()
     *     ),
     *     @OA\Response(response=404, description="Evento no encontrado"),
     *     @OA\Response(response=502, description="Error al comunicarse con el servicio de Eventos")
     * )
     */
    public function show(int $id): JsonResponse
    {
        $response = Http::get("{$this->baseUrl}/events/{$id}");

        if ($response->status() === 404) {
            return response()->json([
                'message' => 'Evento no encontrado'
            ], 404);
        }

        if ($response->failed()) {
            return response()->json([
                'message' => 'No se pudo obtener el evento'
            ], 502);
        }

        return response()->json($response->json(), 200);
    }
}
