<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ticket;
use App\Models\Payment;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Creamos 10 tickets de ejemplo
        Ticket::factory()
            ->count(10)
            ->create()
            ->each(function (Ticket $ticket) {
                // Para cada ticket, creamos un payment pendiente
                Payment::factory()->create([
                    'ticket_id' => $ticket->id,
                    'status'    => 'pendiente',
                ]);
            });
    }
}
