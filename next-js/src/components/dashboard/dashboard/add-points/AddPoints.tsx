import { useState } from "react";
import { UserTempCodeVerification } from "./UserTempCodeVerification";
import { AddPointsBox } from "./AddPointsBox";
import { User } from "@/app/types/User";

export function AddPoints() {
    const [user, setUser] = useState<User | null>(null);

    const clearUser = () => {
        setUser(null);
    };

    return (
        <div className="flex flex-row justify-center items-center w-full">
            {user === null ? (
                <div className="w-full flex justify-center items-center">
                    <UserTempCodeVerification setUser={(user: User) => setUser(user)} />
                </div>
            ) : (
                <AddPointsBox user={user} clearUser={() => clearUser()} />
            )}
        </div>
    );
}
