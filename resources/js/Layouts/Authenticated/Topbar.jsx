import { Link } from "@inertiajs/inertia-react";
import { React, useRef } from "react";

export default function Topbar({ name }) {
    const dropdownTarget = useRef();

    const triggerDropdown = () => {
        dropdownTarget.current.classList.toggle("hidden");
    };

    return (
        <div className="flex justify-between items-center cursor-pointer">
            <input
                type="text"
                className="top-search"
                placeholder="Search movie, cast, genre"
                style={{
                    backgroundImage: 'url("/icons/ic_search.svg")',
                }}
            />
            <div className="flex items-center gap-4">
                <span className="text-black text-sm font-medium">
                    Welcome, {name}
                </span>
                {/* user avatar */}
                <div className="collapsible-dropdown flex flex-col gap-2 relative">
                    <div
                        className="outline outline-2 outline-gray-2 p-[5px] rounded-full w-[60px] dropdown-button"
                        onClick={triggerDropdown}
                    >
                        <img
                            src="/images/avatar.png"
                            className="rounded-full object-cover w-full"
                            alt=""
                        />
                    </div>
                    <div
                        className="bg-white rounded-2xl text-black font-medium flex hidden flex-col gap-1 absolute z-[999] right-0 top-[80px] min-w-[180px] overflow-hidden"
                        ref={dropdownTarget}
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
                        <Link
                            href={route("logout")}
                            method="post"
                            className="transition-all hover:bg-sky-100 p-4"
                        >
                            Sign Out
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
