// routes/api.php

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\DocsRedirectController;

// Redirige la raíz /api al Swagger UI
Route::get('/', DocsRedirectController::class);

// Ruta para servir la documentación JSON
Route::get('/documentation', function () {
    return response()->file(storage_path('compra-entradas/api-docs/api-docs.json'));
});


Route::prefix('v1')->group(function () {
    // 1) Eventos — públicos (proxy al microservicio de Eventos)
    Route::get('events',           [EventController::class, 'index']);
    Route::get('events/{id}',      [EventController::class, 'show']);

    // 2) Compras y pagos — requieren JWT
    Route::middleware('auth:api')->group(function () {
        // Tickets: listar, crear, ver, actualizar, eliminar
        Route::apiResource('tickets', TicketController::class)
             ->only(['index', 'store', 'show', 'update', 'destroy']);

        // Marcar pago: POST /api/v1/pagar/{ticket}
    Route::post('pagar/{ticket_id}', [PaymentController::class, 'confirm'])
     ->middleware('auth:api');
    });
});
