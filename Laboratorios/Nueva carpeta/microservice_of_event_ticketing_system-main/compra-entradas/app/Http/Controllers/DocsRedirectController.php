<?php
namespace App\Http\Controllers;

class DocsRedirectController extends Controller
{
    public function __invoke()
    {
        return redirect('/api/documentation');
    }
}
