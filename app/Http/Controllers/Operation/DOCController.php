<?php

namespace App\Http\Controllers\Operation;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\MenuLogdoc;

class DocController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $logdocs = MenuLogdoc::all();

        return Inertia::render('Operation/Doc/Index', [
            'logdocs' => $logdocs
        ]);
    }
}
