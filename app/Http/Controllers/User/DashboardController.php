<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
  public function index()
  {
    $data = [
      'featuredMovies' => Movie::whereIsFeatured(1)->get(),
      'movies' => Movie::all(),
    ];

    return inertia('User/Dashboard/Index', $data);
  }
}