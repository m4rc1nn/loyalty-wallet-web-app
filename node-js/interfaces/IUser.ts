import { ICard } from "./ICard";

export interface IUser {
    id: string;
    googleId: string;
    email: string;
    name: string;
    isActive: boolean;
    pushToken: string;
    cards: ICard[];
}
