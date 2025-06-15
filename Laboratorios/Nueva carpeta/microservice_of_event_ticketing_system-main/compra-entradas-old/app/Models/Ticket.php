<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="Ticket",
 *     type="object",
 *     title="Ticket",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="user_id", type="integer", example=5),
 *     @OA\Property(property="event_id", type="integer", example=3),
 *     @OA\Property(property="quantity", type="integer", example=2),
 *     @OA\Property(property="total_price", type="number", format="float", example=100.00),
 *     @OA\Property(property="status", type="string", example="pendiente"),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */
class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'event_id',
        'quantity',
        'total_price',
        'status',
    ];

    /**
     * Relación con el usuario comprador
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relación con el pago asociado
     */
    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}
