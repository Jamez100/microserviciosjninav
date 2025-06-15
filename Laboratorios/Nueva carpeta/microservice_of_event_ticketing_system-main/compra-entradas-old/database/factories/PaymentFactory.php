<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Payment;
use App\Models\Ticket;

class PaymentFactory extends Factory
{
    protected $model = Payment::class;

    public function definition()
    {
        return [
            // Asociamos aleatoriamente a un ticket ya existente
            'ticket_id' => Ticket::factory(),
            // Estado por defecto antes de la simulación de pago
            'status'    => 'pendiente',
        ];
    }
}
