<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';
    
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'user_id',
        'event_id',
        'quantity',
        'total_amount',
        'status',
        'payment_reference'
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
        'created_at' => 'datetime',
        'paid_at' => 'datetime',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'paid_at'
    ];

    // Status constants
    const STATUS_PENDING = 'pending';
    const STATUS_PAID = 'paid';
    const STATUS_CANCELLED = 'cancelled';

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
            if (empty($model->status)) {
                $model->status = self::STATUS_PENDING;
            }
        });
    }

    /**
     * Scope para filtrar por usuario
     */
    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope para filtrar por estado
     */
    public function scopeWithStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Marcar orden como pagada
     */
    public function markAsPaid($paymentReference = null)
    {
        $this->status = self::STATUS_PAID;
        $this->paid_at = now();
        if ($paymentReference) {
            $this->payment_reference = $paymentReference;
        }
        $this->save();
    }

    /**
     * Verificar si la orden está pagada
     */
    public function isPaid()
    {
        return $this->status === self::STATUS_PAID;
    }

    /**
     * Verificar si la orden está pendiente
     */
    public function isPending()
    {
        return $this->status === self::STATUS_PENDING;
    }

    /**
     * Calcular total basado en cantidad y precio
     */
    public function calculateTotal($pricePerTicket)
    {
        return $this->quantity * $pricePerTicket;
    }
}