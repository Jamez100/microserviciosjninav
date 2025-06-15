<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Carbon\Carbon;
use GuzzleHttp\Client;

class ReservationController extends Controller
{
    // Listar reservas del usuario o médico
    public function index(Request $req)
    {
        $user = $req->user;
        if ($user->role === 'paciente') {
            $reservas = Reservation::where('paciente_id', $user->id)->get();
        } else if ($user->role === 'medico') {
            $reservas = Reservation::where('medico_id', $user->id)->get();
        } else {
            return response()->json(['error'=>'Rol inválido'], 403);
        }
        return response()->json($reservas);
    }

    // Crear nueva reserva de 1 hora
    public function store(Request $req)
    {
        $user = $req->user;
        if ($user->role !== 'paciente') {
            return response()->json(['error'=>'Solo pacientes pueden reservar'], 403);
        }
        $req->validate([
            'medico_id'=>'required|integer',
            'start_time'=>'required|date_format:Y-m-d H:i:s'
        ]);

        $start = new Carbon($req->start_time);
        $end   = $start->copy()->addHour();

        // Verificar solapamiento
        $conflicto = Reservation::where('medico_id', $req->medico_id)
            ->where(function($q) use($start,$end){
                $q->whereBetween('start_time', [$start, $end])
                  ->orWhereBetween('end_time', [$start, $end]);
            })->exists();
        if ($conflicto) {
            return response()->json(['error'=>'Horario no disponible'], 409);
        }

        // Validar que médico existe en Usuarios Service
        $client = new Client();
        $resp = $client->get(config('app.usuarios_service_url')."/users/{$req->medico_id}", [
            'headers'=>['Authorization'=>"Bearer ".$req->bearerToken()]
        ]);
        if ($resp->getStatusCode() !== 200) {
            return response()->json(['error'=>'Médico no encontrado'], 404);
        }

        $reserva = Reservation::create([
            'paciente_id'=> $user->id,
            'medico_id'  => $req->medico_id,
            'start_time' => $start,
            'end_time'   => $end
        ]);

        return response()->json($reserva, 201);
    }

    // Cancelar (eliminar) reserva
    public function destroy(Request $req, $id)
    {
        $user = $req->user;
        $res = Reservation::find($id);
        if (!$res) {
            return response()->json(['error'=>'Reserva no encontrada'], 404);
        }
        if ($user->role==='paciente' && $res->paciente_id!==$user->id) {
            return response()->json(['error'=>'Acceso denegado'], 403);
        }
        if ($user->role==='medico' && $res->medico_id!==$user->id) {
            return response()->json(['error'=>'Acceso denegado'], 403);
        }
        $res->delete();
        return response()->json(null, 204);
    }
}
