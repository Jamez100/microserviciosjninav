<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTicketsTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->comment('ID del comprador (usuario autenticado)');
            $table->unsignedBigInteger('event_id')->comment('ID del evento comprado');
            $table->integer('quantity')->default(1);
            $table->decimal('total_price', 10, 2)->comment('Precio total de la compra');
            $table->enum('status', ['pendiente', 'pagado'])->default('pendiente')->comment('Estado de la compra');
            $table->timestamps();

            // Si ya existe la tabla users (emitido por el servicio de Usuarios)
            //$table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
}
