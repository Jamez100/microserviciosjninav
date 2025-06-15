<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class CreateOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // La autorización se maneja en el middleware JWT
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'event_id' => 'required|integer|min:1',
            'quantity' => 'required|integer|min:1|max:10'
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'event_id.required' => 'El ID del evento es requerido',
            'event_id.integer' => 'El ID del evento debe ser un número entero',
            'event_id.min' => 'El ID del evento debe ser mayor a 0',
            'quantity.required' => 'La cantidad es requerida',
            'quantity.integer' => 'La cantidad debe ser un número entero',
            'quantity.min' => 'La cantidad debe ser al menos 1',
            'quantity.max' => 'La cantidad máxima permitida es 10'
        ];
    }

    /**
     * Handle a failed validation attempt.
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'success' => false,
                'message' => 'Datos de entrada inválidos',
                'errors' => $validator->errors()
            ], 422)
        );
    }
}