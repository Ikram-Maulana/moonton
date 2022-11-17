<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Movie\Store;
use App\Http\Requests\Admin\Movie\Update;
use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $data = [
      'movies' => Movie::all(),
    ];

    return inertia('Admin/Movie/Index', $data);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    return inertia('Admin/Movie/Create');
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \App\Http\Requests\Admin\Movie\Store  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Store $request)
  {
    $data = $request->validated();

    if ($request->file('thumbnail')) {
      $data['thumbnail'] = cloudinary()->upload($request->file('thumbnail')->getRealPath())->getSecurePath();
    }
    $data['slug'] = str()->slug($data['name']);

    Movie::create($data);

    return to_route('admin.dashboard.movie.index')->with([
      'message' => 'Movie inserted successfully',
      'type' => 'success',
    ]);
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Movie  $movie
   * @return \Illuminate\Http\Response
   */
  public function show(Movie $movie)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Movie  $movie
   * @return \Illuminate\Http\Response
   */
  public function edit(Movie $movie)
  {
    $data = [
      'movie' => $movie,
    ];

    return inertia('Admin/Movie/Edit', $data);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \App\Http\Requests\Admin\Movie\Update  $request
   * @param  \App\Models\Movie  $movie
   * @return \Illuminate\Http\Response
   */
  public function update(Update $request, Movie $movie)
  {
    $data = $request->validated();

    if ($request->name !== $movie->name) {
      $data['slug'] = str()->slug($data['name']);
    }

    if ($request->file('thumbnail')) {
      if ($request->old_image) {
        $old_image = $request->old_image;
        // get filename from the url ex: (fileId.png)
        $fileName = substr($old_image, strrpos($old_image, '/') + 1);
        // get fileId from the filename ex: (fileId)
        $publicId = substr($fileName, 0, strrpos($fileName, '.'));
        cloudinary()->destroy($publicId);
      }

      $data['thumbnail'] = cloudinary()->upload($request->file('image')->getRealPath())->getSecurePath();
    }

    $movie->update($data);

    return to_route('admin.dashboard.movie.index')->with([
      'message' => 'Movie updated successfully',
      'type' => 'success',
    ]);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Movie  $movie
   * @return \Illuminate\Http\Response
   */
  public function destroy(Movie $movie)
  {
    $movie->delete();
    return to_route('admin.dashboard.movie.index')->with([
      'message' => 'Movie deleted successfully',
      'type' => 'success',
    ]);
  }
}