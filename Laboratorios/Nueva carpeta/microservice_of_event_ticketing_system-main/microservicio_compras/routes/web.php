<?php

// use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return response()->json([
        'service' => 'mservicio_compras',
        'message' => 'Servicio de Compras API',
        'version' => '1.0.0',
        'endpoints' => [
            'health' => '/api/health',
            'orders' => '/api/orders',
            'create_order' => 'POST /api/orders',
            'pay_order' => 'PUT /api/orders/{id}/pay'
        ]
    ]);
});