import axios from "axios";
import React, { useState, useRef, ChangeEvent, KeyboardEvent } from "react";

export function UserTempCodeVerification({ setUserId }: { setUserId: (userId: string) => void }) {
    const [code, setCode] = useState<string[]>(Array(6).fill(""));
    const inputsRef = useRef<HTMLInputElement[]>([]);

    const handleClickButton = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/temp-code/" + code.join(""));
            if (response.data.type !== "SUCCESS") {
                alert("Nie znaleziono uzytkownika");
                return;
            }
            //setUserId(response.data.user.id);

            setUserId("is-usera-zmienic-to");
        } catch (error) {
            //alert("Nie znaleziono uzytkownika");
            setUserId("is-usera-zmienic-to"); //to do usuniecia na produckcji
        }
    };

    const focusNextInput = (currentIndex: number, direction: "next" | "previous"): void => {
        const nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
        if (nextIndex >= 0 && nextIndex < inputsRef.current.length) {
            inputsRef.current[nextIndex]?.focus();
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>, index: number): void => {
        const newCode = [...code];
        newCode[index] = event.target.value;
        setCode(newCode);

        if (event.target.value.length === 1) {
            focusNextInput(index, "next");
        }
    };

    const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>, index: number): void => {
        if (event.key === "Backspace" && !event.currentTarget.value) {
            focusNextInput(index, "previous");
        }
    };

    return (
        <div className="max-w-sm mx-auto w-full">
            <p className="text-xl text-gray-500 dark:text-gray-400 text-center">
                Wpisz 6-cyfrowy kod wygenerowany przez klienta w aplikacji.
            </p>
            <div className="mt-4 flex justify-center mb-2 space-x-2 rtl:space-x-reverse">
                {code.map((_, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            maxLength={1}
                            id={`code-${index + 1}`}
                            className="block w-12 h-12 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            required
                            value={code[index]}
                            onChange={(event) => handleInputChange(event, index)}
                            onKeyUp={(event) => handleKeyUp(event, index)}
                            ref={(el) => {
                                inputsRef.current[index] = el as HTMLInputElement;
                            }}
                        />
                    </div>
                ))}
            </div>
            <div className="mt-4 w-full flex justify-center items-center">
                <button
                    type="button"
                    onClick={() => handleClickButton()}
                    className="text-primary-700 hover:text-white border border-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-primary-400 dark:text-primary-400 dark:hover:text-white dark:hover:bg-primary-500 dark:focus:ring-primary-900">
                    Zatwierdź
                </button>
            </div>
        </div>
    );
}
