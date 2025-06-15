<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReservationController;

Route::group(['middleware'=>'jwt.auth'], function(){
    Route::get('/reservas',   [ReservationController::class,'index']);
    Route::post('/reservas',  [ReservationController::class,'store']);
    Route::delete('/reservas/{id}', [ReservationController::class,'destroy']);
});
