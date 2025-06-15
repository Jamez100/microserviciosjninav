<?php 
namespace App\Services;

use Illuminate\Support\Facades\Http;

class EventService
{
    protected string $base;

    public function __construct()
    {
        $this->base = config('services.events.url');
    }

    public function all(): array
    {
        $res = Http::get("{$this->base}/events");
        return $res->json();
    }

    public function find(int $id): array
    {
        $res = Http::get("{$this->base}/events/{$id}");
        return $res->json();
    }
}
