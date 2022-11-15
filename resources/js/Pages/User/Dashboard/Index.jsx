import Authenticated from "@/Layouts/Authenticated";
import React from "react";
import Flickity from "react-flickity-component";

// CSS for Flickity
import "flickity/css/flickity.css";
import { Head } from "@inertiajs/inertia-react";
import MovieCard from "@/Components/MovieCard";
import FeaturedMovie from "@/Components/FeaturedMovie";

export default function Dashboard({ auth, featuredMovies, movies }) {
    const flickityOptions = {
        cellAlign: "left",
        contain: true,
        groupCells: 1,
        wrapAround: false,
        pageDots: false,
        prevNextButtons: false,
        draggable: ">1",
    };

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>

            <Authenticated auth={auth}>
                {/* Featured */}
                <div>
                    <div className="font-semibold text-[22px] text-black mb-4">
                        Featured Movies
                    </div>

                    <Flickity className="gap-[30px]" options={flickityOptions}>
                        {featuredMovies.map((featuredMovie) => (
                            <FeaturedMovie
                                key={featuredMovie.id}
                                slug={featuredMovie.slug}
                                name={featuredMovie.name}
                                category={featuredMovie.category}
                                thumbnail={featuredMovie.thumbnail}
                                rating={featuredMovie.rating}
                            />
                        ))}
                    </Flickity>
                </div>
                {/* /Featured */}

                {/* Browse */}
                <div className="mt-14">
                    <div className="font-semibold text-[22px] text-black mb-4">
                        Browse
                    </div>
                    <Flickity className="gap-[30px]" options={flickityOptions}>
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <MovieCard
                                key={i}
                                slug="the-batman-in-love"
                                name={`The Batman in Love ${i}`}
                                category="Comedy"
                                thumbnail="https://picsum.photos/seed/picsum/300/300"
                            />
                        ))}
                    </Flickity>
                </div>
                {/* /Continue Watching */}
            </Authenticated>
        </>
    );
}
