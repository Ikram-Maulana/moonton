<?php

namespace Database\Seeders;

use App\Models\Movie;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MovieTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $movies = [
      [
        "name" => "The Shawshank Redemption",
        "slug" => "the-shawshank-redemption",
        "category" => "Drama",
        "video_url" => "https://www.youtube.com/embed/6hB3S9bIaco",
        "thumbnail" => "https://i.pinimg.com/736x/c2/f4/31/c2f431988c0a53d9731e2b4b4bcac214.jpg",
        "rating" => 4.3,
        "is_featured" => 1,
      ],
      [
        "name" => "The Godfather",
        "slug" => "the-godfather",
        "category" => "Crime",
        "video_url" => "https://www.youtube.com/embed/sY1S34973zA",
        "thumbnail" => "https://i.pinimg.com/1200x/b0/21/fe/b021fe6711ec0a442420719e56633101.jpg",
        "rating" => 4.2,
        "is_featured" => 0,
      ],
      [
        "name" => "The Dark Knight",
        "slug" => "the-dark-knight",
        "category" => "Action",
        "video_url" => "https://www.youtube.com/embed/EXeTwQWrcwY",
        "thumbnail" => "https://i.pinimg.com/originals/cc/47/a5/cc47a507854dfe4ea145ebb4c9ae51c4.jpg",
        "rating" => 4.0,
        "is_featured" => 0,
      ]
    ];

    Movie::insert($movies);
  }
}