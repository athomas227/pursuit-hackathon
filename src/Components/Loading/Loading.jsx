import React from "react";

export default function Loading() {
    return (
        <div>
            <p class="text-center text-white font-extrabold">Loading your experience</p>
            <div class="bg-black bg-opacity-40 dark:bg-zinc-800 p-4 ring-1 ring-zinc-900/5 rounded-lg shadow-lg w-screen max-w-screen-sm">
                <div class="flex-col space-y-4 animate-pulse">
                <div class="rounded bg-zinc-200 dark:bg-zinc-700 w-1/4 aspect-square mx-auto"></div>
                <div class="flex-1 space-y-6 py-1">
                    <div class="h-2 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                    <div class="h-2 bg-zinc-200 dark:bg-zinc-700 w-3/4 rounded"></div>
                    <div class="h-6 bg-zinc-200 dark:bg-zinc-700 w-20 mx-auto rounded"></div>
                </div>
                </div>
            </div>
        </div>
    );
}