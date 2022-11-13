import React from "react";
import Sidebar from "./Sidebar";

export default function Authenticated({ children }) {
    return (
        <>
            {/* Desktop Only */}
            <div className="mx-auto max-w-screen hidden lg:block">
                {/* START: Sidebar */}
                <Sidebar />
                {/* END: Sidebar */}

                {/* START: Content */}
                <div className="ml-[300px] px-[50px]">
                    <div className="py-10 flex flex-col gap-[50px]">
                        {/* Topbar */}
                        <div className="flex justify-between items-center">
                            <input
                                type="text"
                                className="top-search"
                                placeholder="Search movie, cast, genre"
                                style={{
                                    backgroundImage:
                                        'url("/icons/ic_search.svg")',
                                }}
                            />
                            <div className="flex items-center gap-4">
                                <span className="text-black text-sm font-medium">
                                    Welcome, Granola Sky
                                </span>
                                {/* user avatar */}
                                <div className="collapsible-dropdown flex flex-col gap-2 relative">
                                    <a
                                        href="#!"
                                        className="outline outline-2 outline-gray-2 p-[5px] rounded-full w-[60px] dropdown-button"
                                        data-target="#dropdown-button"
                                    >
                                        <img
                                            src="/images/avatar.png"
                                            className="rounded-full object-cover w-full"
                                            alt=""
                                        />
                                    </a>
                                    <div
                                        className="bg-white rounded-2xl text-black font-medium flex flex-col gap-1 absolute z-[999] right-0 top-[80px] min-w-[180px] hidden overflow-hidden"
                                        id="dropdown-target"
                                    >
                                        <a
                                            href="#!"
                                            className="transition-all hover:bg-sky-100 p-4"
                                        >
                                            Dashboard
                                        </a>
                                        <a
                                            href="#!"
                                            className="transition-all hover:bg-sky-100 p-4"
                                        >
                                            Settings
                                        </a>
                                        <a
                                            href="sign_in.html"
                                            className="transition-all hover:bg-sky-100 p-4"
                                        >
                                            Sign Out
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /Topbar */}

                        <main>{children}</main>
                    </div>
                </div>
                {/* END: Content */}
            </div>

            <div className="mx-auto px-4 w-full h-screen lg:hidden flex bg-black">
                <div className="text-white text-2xl text-center leading-snug font-medium my-auto">
                    Sorry, this page only supported on 1024px screen or above
                </div>
            </div>
        </>
    );
}
