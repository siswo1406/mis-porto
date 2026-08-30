<?php

namespace App\Http\Controllers\Tax;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;

class TaxController extends Controller
{
    public function index()
    {
        return Inertia::render('Tax/Portal');
    }
}
