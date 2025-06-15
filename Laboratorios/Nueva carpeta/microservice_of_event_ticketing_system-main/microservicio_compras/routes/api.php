<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Health check público
Route::get('/health', [OrderController::class, 'health']);

// Rutas protegidas por JWT
Route::middleware(['jwt'])->group(function () {
    // Rutas de órdenes
    Route::prefix('orders')->group(function () {
        Route::get('/', [OrderController::class, 'index']);          // GET /api/orders
        Route::post('/', [OrderController::class, 'store']);         // POST /api/orders  
        Route::get('/{id}', [OrderController::class, 'show']);       // GET /api/orders/{id}
        Route::put('/{id}/pay', [OrderController::class, 'pay']);    // PUT /api/orders/{id}/pay
    });
});

// Ruta de fallback para API
Route::fallback(function () {
    return response()->json([
        'success' => false,
        'message' => 'Endpoint no encontrado'
    ], 404);
});