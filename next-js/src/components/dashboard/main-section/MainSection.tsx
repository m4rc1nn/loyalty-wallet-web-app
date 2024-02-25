import { AddPoints } from "../add-points/AddPoints";
import { InformationBox } from "./InformationBox";

export function MainSection() {
    return (
        <main className="p-4 md:ml-64 h-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-32 md:h-64 flex justify-center items-center">
                    <InformationBox icon="USERS" text="Ilość klientów" value="234" />
                </div>
                <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64 flex justify-center items-center">
                    <InformationBox icon="POINTS" text="Dodanych punktów" value="1765" />
                </div>
                <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64 flex justify-center items-center">
                    <InformationBox icon="GIFTS" text="Zrealizowanych voucherów" value="76" />
                </div>
                <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64 flex justify-center items-center">
                    <InformationBox icon="GIFTS" text="Voucherów do zrealizowania" value="6" />
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
        </main>
    );
}
