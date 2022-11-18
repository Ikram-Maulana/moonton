import FlashMessage from "@/Components/FlashMessage";
import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import React from "react";

export default function Index({ auth, flashMessage, movies }) {
    const { delete: destroy, put } = useForm();

    return (
        <>
            <Head>
                <title>Admin - List of Movie</title>
            </Head>

            <Authenticated auth={auth}>
                <Link href={route("admin.dashboard.movie.create")}>
                    <PrimaryButton type="button" className="w-40 mb-8">
                        Insert New Movie
                    </PrimaryButton>
                </Link>

                {flashMessage?.message && (
                    <FlashMessage message={flashMessage.message} />
                )}

                <table className="table-fixed w-full text-center">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Rating</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((movie) => (
                            <tr key={movie.id}>
                                <td>
                                    <img
                                        src={movie.thumbnail}
                                        alt={movie.name}
                                        className="w-32 rounded-sm"
                                    />
                                </td>
                                <td>{movie.name}</td>
                                <td>{movie.category}</td>
                                <td>{Math.round(movie.rating * 100) / 100}</td>
                                <td>
                                    <Link
                                        href={route(
                                            "admin.dashboard.movie.edit",
                                            movie.slug
                                        )}
                                    >
                                        <PrimaryButton
                                            type="button"
                                            variant="warning"
                                        >
                                            Edit
                                        </PrimaryButton>
                                    </Link>
                                </td>
                                <td>
                                    <div
                                        onClick={(e) => {
                                            e.preventDefault();

                                            movie.deleted_at
                                                ? confirm(
                                                      "Are you sure to restore this movie?"
                                                  ) &&
                                                  put(
                                                      route(
                                                          "admin.dashboard.movie.restore",
                                                          movie.slug
                                                      )
                                                  )
                                                : confirm(
                                                      "Are you sure to delete this movie?"
                                                  ) &&
                                                  destroy(
                                                      route(
                                                          "admin.dashboard.movie.destroy",
                                                          movie.slug
                                                      )
                                                  );
                                        }}
                                    >
                                        <PrimaryButton
                                            type="button"
                                            variant="danger"
                                        >
                                            {movie.deleted_at
                                                ? "Restore"
                                                : "Delete"}
                                        </PrimaryButton>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Authenticated>
        </>
    );
}
