import { useEffect, useState } from "react";
import { AddPoints } from "../add-points/AddPoints";
import { InformationBox } from "./InformationBox";
import axios from "axios";
import { useCookies } from "next-client-cookies";

export function MainSection() {
    const cookies = useCookies();

    
    const [clientsAmout, setClientsAmount] = useState<number>(0);
    const [addedPointsAmount, setAddedPointsAmount] = useState<number>(0);
    const [redeemedVouchersAmount, setRedeemedVouchersAmount] = useState<number>(0);
    const [vouchersToRedeemAmount, setVouchersToRedeemAmount] = useState<number>(0);

    useEffect(() => {
        const token = cookies.get("auth_token") as string;
        (async () => {
            const clientsResponse = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/company/cards`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if(clientsResponse.data.type !== 'SUCCESS') {
                return;
            }
            setClientsAmount(clientsResponse.data.cards.length);
            setAddedPointsAmount(clientsResponse.data.cards.reduce(
                (accumulator: number, currentValue: {points: string}) => accumulator + currentValue.points,
                0,
              ))
        })()
    }, [])
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-32 md:h-64 flex justify-center items-center">
                    <InformationBox icon="USERS" text="Ilość klientów" value={clientsAmout} />
                </div>
                <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64 flex justify-center items-center">
                    <InformationBox icon="POINTS" text="Dodanych punktów" value={addedPointsAmount} />
                </div>
                <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64 flex justify-center items-center">
                    <InformationBox icon="GIFTS" text="Zrealizowanych voucherów" value={redeemedVouchersAmount} />
                </div>
                <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64 flex justify-center items-center">
                    <InformationBox icon="GIFTS" text="Voucherów do zrealizowania" value={vouchersToRedeemAmount} />
                </div>
            </div>
            <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4 flex justify-center items-center">
                <AddPoints />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72" />
                <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72" />
                <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72" />
                <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72" />
            </div>
            <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4" />
            <div className="grid grid-cols-2 gap-4">
                <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72" />
                <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72" />
                <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72" />
                <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72" />
            </div>
        </>
    );
}
