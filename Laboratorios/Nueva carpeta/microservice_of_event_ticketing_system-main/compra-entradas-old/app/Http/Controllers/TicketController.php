<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Models\Ticket;
use App\Models\Payment;

/**
 * @OA\PathItem(
 *     path="/api/v1/tickets",
 *     description="Operaciones sobre compra de tickets"
 * )
 */
class TicketController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/v1/tickets",
     *     summary="Listar mis tickets",
     *     tags={"Tickets"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(response=200, description="Listado de tickets",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Ticket"))
     *     )
     * )
     */
    public function index()
    {
        $user = Auth::user();
        $tickets = Ticket::where('user_id', $user->id)->get();
        return response()->json($tickets);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/tickets",
     *     summary="Comprar boletos (requiere JWT)",
     *     tags={"Tickets"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"event_id","quantity","price"},
     *             @OA\Property(property="event_id", type="integer"),
     *             @OA\Property(property="quantity", type="integer"),
     *             @OA\Property(property="price", type="number", format="float")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Ticket comprado",
     *         @OA\JsonContent(ref="#/components/schemas/Ticket")
     *     ),
     *     @OA\Response(response=401, description="No autorizado")
     * )
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'event_id' => 'required|integer',
            'quantity' => 'required|integer|min:1',
            'price'    => 'required|numeric',
        ]);
        $user = Auth::user();

        $ticket = Ticket::create([
            'user_id'  => $user->id,
            'event_id' => $data['event_id'],
            'quantity' => $data['quantity'],
            'price'    => $data['price'],
        ]);

        Payment::create([
            'ticket_id' => $ticket->id,
            'status'    => 'pending',
        ]);

        Mail::raw("Compra de boleto registrada. Ticket ID: {$ticket->id}", function($message) use ($user) {
            $message->to($user->email)->subject('Confirmación de compra');
        });

        return response()->json($ticket, 201);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/tickets/{ticket}",
     *     summary="Mostrar detalle de un ticket",
     *     tags={"Tickets"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="ticket",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Detalle del ticket",
     *         @OA\JsonContent(ref="#/components/schemas/Ticket")
     *     ),
     *     @OA\Response(response=404, description="Ticket no encontrado")
     * )
     */
    public function show(Ticket $ticket)
    {
        return response()->json($ticket);
    }

    /**
     * @OA\Put(
     *     path="/api/v1/tickets/{ticket}",
     *     summary="Actualizar un ticket",
     *     tags={"Tickets"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="ticket",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             @OA\Property(property="quantity", type="integer"),
     *             @OA\Property(property="price", type="number", format="float")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Ticket actualizado",
     *         @OA\JsonContent(ref="#/components/schemas/Ticket")
     *     ),
     *     @OA\Response(response=404, description="Ticket no encontrado")
     * )
     */
    public function update(Request $request, Ticket $ticket)
    {
        $data = $request->validate([
            'quantity' => 'sometimes|integer|min:1',
            'price'    => 'sometimes|numeric',
        ]);
        $ticket->update($data);
        return response()->json($ticket);
    }

    /**
     * @OA\Delete(
     *     path="/api/v1/tickets/{ticket}",
     *     summary="Eliminar un ticket",
     *     tags={"Tickets"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="ticket",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=204, description="Ticket eliminado")
     * )
     */
    public function destroy(Ticket $ticket)
    {
        $ticket->delete();
        return response()->json(null, 204);
    }
}
