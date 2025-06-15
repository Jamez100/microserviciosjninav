<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Ticket;

class TicketFactory extends Factory
{
    protected $model = Ticket::class;

    public function definition()
    {
        return [
            // Asumimos user_id y event_id aleatorios; ajusta rangos según tu entorno
            'user_id'     => $this->faker->numberBetween(1, 5),
            'event_id'    => $this->faker->numberBetween(1, 5),
            'quantity'    => $this->faker->numberBetween(1, 4),
            'total_price' => $this->faker->randomFloat(2, 10, 200),
            'status'      => 'pendiente',
        ];
    }
}
