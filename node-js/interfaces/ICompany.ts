import { ICard } from "./ICard";

export interface ICompany {
    id: string;
    type: string;
    name: string;
    email: string;
    password: string;
    isActive: boolean;
    cards: ICard[];
}
