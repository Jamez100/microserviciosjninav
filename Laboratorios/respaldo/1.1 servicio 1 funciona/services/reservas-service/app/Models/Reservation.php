<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'paciente_id',
        'medico_id',
        'start_time',
        'end_time'
    ];
}
