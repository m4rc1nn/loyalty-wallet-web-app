import { useState } from "react";
import { UserTempCodeVerification } from "./UserTempCodeVerification";
import { AddPointsBox } from "./AddPointsBox";

export function AddPoints() {
    const [userId, setUserId] = useState<string | null>(null);

    return (
        <div className="flex flex-row justify-center items-center w-full">
            {userId === null ? (
                <div className="w-full flex justify-center items-center">
                    <UserTempCodeVerification setUserId={(userId: string) => setUserId(userId)} />
                </div>
            ) : (
                <AddPointsBox userId={userId} />
            )}
        </div>
    );
}
