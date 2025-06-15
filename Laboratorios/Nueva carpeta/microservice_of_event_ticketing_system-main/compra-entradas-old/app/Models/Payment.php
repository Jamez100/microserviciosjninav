<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="Payment",
 *     type="object",
 *     title="Payment",
 *     @OA\Property(property="id",        type="integer", example=1),
 *     @OA\Property(property="ticket_id", type="integer", example=10),
 *     @OA\Property(property="status",    type="string",  example="confirmed"),
 *     @OA\Property(property="created_at",type="string",  format="date-time"),
 *     @OA\Property(property="updated_at",type="string",  format="date-time")
 * )
 */
class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'ticket_id',
        'status',
    ];

    /**
     * Relación con el ticket al que pertenece
     */
    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }
}
