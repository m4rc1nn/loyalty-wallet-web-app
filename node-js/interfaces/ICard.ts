import { IAction } from "./IAction";

export interface ICard {
    id: string;
    userId: string;
    companyId: string;
    actions: IAction[];
}
