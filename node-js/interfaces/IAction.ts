export interface IAction {
    id: string;
    name: string;
    description: string;
    type: string;
    amount: number;
    userId: string;
    companyId: string;
    cardId: string;
    rewardId: string;
}
