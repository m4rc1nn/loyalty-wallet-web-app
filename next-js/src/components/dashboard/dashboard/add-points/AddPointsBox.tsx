import { useCompanyAuth } from "@/app/context/CompanyAuthContext";
import { User, Message } from "@/app/types/User";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";

type AddPointsBoxProps = {
    user: User;
    clearUser: () => void;
};

export function AddPointsBox({ user, clearUser }: AddPointsBoxProps) {
    const cookies = useCookies();
    const [messages, setMessages] = useState<Message[]>([]);

    const [points, setPoints] = useState<number>(1);
    const [inputPointsMessage, setInputPointsMessage] = useState<string>("");

    const [inputMessage, setInputMessage] = useState<string>("");

    const addPoints = () => {
        setPoints((prev) => ++prev);
    };

    const subtrackPoints = () => {
        if (points <= 1) return;
        setPoints((prev) => --prev);
    };

    const addPointsToClient = async () => {
        const token = cookies.get("auth_token") as string;
        try {
            const response = await axios.post(
                process.env.NEXT_PUBLIC_API_URL + `/api/actions`,
                {
                    userId: user.id,
                    name: "Dodanie punktow klientowi.",
                    description: inputPointsMessage,
                    type: "ADD",
                    amount: points,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data.type !== "SUCCESS") {
                alert("Blad podczas dodawania punktów");
                return;
            }
            alert(`Dodano ${points} klientowi ${user.name}`);
            clearUser();
        } catch (error) {
            console.log(error);
            alert("Blad podczas dodawania punktów");
        }
    };

    const addMessage = () => {
        if (inputMessage.length <= 3 && inputMessage.trim() === "") {
            alert("Wiadomość jest zbyt krótka.");
            return;
        }
        const message: Message = { id: "dasdsa", type: "COMPANY", text: inputMessage };
        setMessages([...messages, message]);
        setInputMessage("");
        //send message to api
    };

    if (user === null) {
        return (
            <div className="self-stretch flex justify-center items-center">
                <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                    />
                </svg>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-row justify-center items-center">
            <div className="w-1/2 flex flex-col justify-center items-center">
                <p className="font-normal text-2xl text-gray-700 dark:text-gray-400 text-center">
                    Dodaj punkty klientowi {user.name}
                </p>
                <div className="mt-6 relative flex items-center">
                    <button
                        type="button"
                        onClick={() => subtrackPoints()}
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-16 focus:outline-none hover:cursor-pointer">
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
                    <div className="bg-gray-50 border-x-0 border-gray-300 font-medium text-center text-gray-900 text-xl focus:border-blue-500 min-w-24 w-full h-16 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 flex justify-center items-center">
                        {points}
                    </div>
                    <button
                        type="button"
                        onClick={() => addPoints()}
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-16 focus:outline-none hover:cursor-pointer">
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
                <div className="mt-4 relative w-full max-w-[22rem]">
                    <input
                        type="text"
                        onChange={(event) => setInputPointsMessage(event.target.value)}
                        value={inputPointsMessage}
                        className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                        placeholder="Notatka o dodanych punktach (opcjonalnie)"
                        required={true}
                    />
                </div>
                <div className="mt-6 flex flex-row jusify-center items-center gap-3">
                    <button
                        type="button"
                        onClick={() => clearUser()}
                        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600">
                        Cofnij
                    </button>
                    <button
                        type="button"
                        onClick={() => addPointsToClient()}
                        className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600">
                        Dodaj punkty {inputPointsMessage.trim() === "" ? "bez wiadomości" : "z wiadomością"}
                    </button>
                </div>
            </div>
            <div className="w-1/2 py-4 px-12 flex flex-col justify-center items-center">
                <ul className="w-full max-h-[235px] overflow-y-auto text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white divide-y dark:divide-gray-600">
                    <li className="w-full px-4 py-2 rounded-t-lg">
                        <span className="text-primary-400">[system]</span> To 1 wizyta tego klienta w twojej firmie
                    </li>
                    <li className="w-full px-4 py-2">
                        <span className="text-primary-400">[system]</span> Klient korzysta z aplikacji od 23.09.2022
                    </li>
                    <li className="w-full px-4 py-2">
                        <span className="text-primary-400">[system]</span> System wykrył wysoką rentowność tego klienta
                    </li>
                    {messages.map((message) => {
                        return (
                            <li className="w-full px-4 py-2 rounded-b-lg">
                                {message.type === "SYSTEM" && <span className="text-primary-400">[system]</span>}{" "}
                                {message.text}
                            </li>
                        );
                    })}
                </ul>
                <div className="mt-4 relative w-full">
                    <input
                        type="text"
                        onChange={(event) => setInputMessage(event.target.value)}
                        value={inputMessage}
                        className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                        placeholder="Treść wiadomości o kliencie"
                        required={true}
                    />
                    <button
                        type="submit"
                        onClick={() => addMessage()}
                        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700">
                        Dodaj
                    </button>
                </div>
            </div>
        </div>
    );
}
