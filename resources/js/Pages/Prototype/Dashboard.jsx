import Authenticated from "@/Layouts/Authenticated";
import React from "react";
import Flickity from "react-flickity-component";

// CSS for Flickity
import "flickity/css/flickity.css";
import { Head } from "@inertiajs/inertia-react";

export default function Dashboard() {
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

            <Authenticated>
                {/* Featured */}
                <div>
                    <div className="font-semibold text-[22px] text-black mb-4">
                        Featured Movies
                    </div>

                    <Flickity className="gap-[30px]" options={flickityOptions}>
                        {[...Array(4)].map((i) => (
                            <div
                                className="absolute overflow-hidden group mr-[30px]"
                                key={i}
                            >
                                <img
                                    src="/images/featured-1.png"
                                    className="object-cover rounded-[30px] w-[520px] h-[340px]"
                                    alt=""
                                />

                                {/* rating */}
                                <div className="rating absolute top-0 left-0">
                                    <div className="p-[30px] flex items-center gap-1">
                                        <img src="/icons/ic_star.svg" alt="" />
                                        <span className="text-sm font-medium text-white mt-1">
                                            4.5/5.0
                                        </span>
                                    </div>
                                </div>

                                {/* bottom detail */}
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black rounded-bl-[28px]
                          rounded-br-[28px] flex justify-between items-center px-7 h-[130px]"
                                >
                                    <div>
                                        <div className="font-medium text-[22px] text-white">
                                            The Batman in Love
                                        </div>
                                        <p className="mb-0 text-white text-sm font-light">
                                            Action • Horror
                                        </p>
                                    </div>
                                    <div className="translate-x-[100px] group-hover:translate-x-0 transition ease-in-out duration-500">
                                        <img
                                            src="/icons/ic_play.svg"
                                            width={50}
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <a
                                    href="watching.html"
                                    className="inset-0 absolute z-50"
                                />
                            </div>
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
                        {[...Array(6)].map((i) => (
                            <div className="absolute group overflow-hidden mr-[30px]">
                                <img
                                    src="/images/browse-1.png"
                                    className="object-cover rounded-[30px] h-[340px] w-[250px]"
                                    alt=""
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black rounded-bl-[28px] rounded-br-[28px]">
                                    <div className="px-7 pb-7">
                                        <div className="font-medium text-xl text-white">
                                            Meong Golden
                                        </div>
                                        <p className="mb-0 text-gray-300 text-base mt-[10px]">
                                            Horror • Love
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="absolute top-1/2 left-1/2 -translate-y-[500px] group-hover:-translate-y-1/2
                          -translate-x-1/2 z-20 transition ease-in-out duration-500"
                                >
                                    <img
                                        src="/icons/ic_play.svg"
                                        className=""
                                        width={50}
                                        alt=""
                                    />
                                </div>
                                <a
                                    href="watching.html"
                                    className="inset-0 absolute z-50"
                                />
                            </div>
                        ))}
                    </Flickity>
                </div>
                {/* /Continue Watching */}
            </Authenticated>
        </>
    );
}
