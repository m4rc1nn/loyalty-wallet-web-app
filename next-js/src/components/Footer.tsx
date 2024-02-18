import Image from "next/image";

export function Footer() {
    return (
        <footer className="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
            <div className="mx-auto max-w-screen-xl text-center">
                <a
                    href="#"
                    className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white">
                    <Image
                        src={"/logo.png"}
                        width={36}
                        height={36}
                        className="max-w-full rounded-full"
                        alt={"Logo LoyaltyApp"}
                    />
                    <span className="pl-3 self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        LoyaltyApp
                    </span>
                </a>
                <p className="my-6 text-gray-500 dark:text-gray-400">
                    Wirtualne karty lojalnościowe dla Twojego biznesu. W pełni za darmo!{" "}
                </p>
                <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6 ">
                            O nas
                        </a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6">
                            Premium
                        </a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6">
                            Blog
                        </a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6">
                            Program affilacyny
                        </a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6">
                            FAQ
                        </a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6">
                            Kontakt
                        </a>
                    </li>
                </ul>
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2024{" "}
                    <a href="#" className="hover:underline">
                        LoyaltyApp
                    </a>
                    . All Rights Reserved.
                </span>
            </div>
        </footer>
    );
}
