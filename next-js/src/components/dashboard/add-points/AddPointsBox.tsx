import { useState } from "react";

export function AddPointsBox({ userId }: { userId: string }) {
    const [points, setPoints] = useState<number>(1);

    const addPoints = () => {
        setPoints((prev) => ++prev);
    };

    const subtrackPoints = () => {
        if (points <= 0) return;
        setPoints((prev) => --prev);
    };

    return (
        <div className="max-w-xs mx-auto">
            <div className="relative flex items-center max-w-[11rem]">
                <button
                    type="button"
                    onClick={() => subtrackPoints()}
                    className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-16 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                    <svg
                        className="w-4 h-4 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2">
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                        />
                    </svg>
                </button>
                <div className="bg-gray-50 border-x-0 border-gray-300 font-medium text-center text-gray-900 text-xl focus:ring-blue-500 focus:border-blue-500 min-w-24 w-full h-16 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 flex justify-center items-center">
                    {points}
                </div>
                <button
                    type="button"
                    onClick={() => addPoints()}
                    className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-16 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                    <svg
                        className="w-4 h-4 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18">
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
