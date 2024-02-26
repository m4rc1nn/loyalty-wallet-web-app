export type User = {
    id: string;
    name: string;
    messages: Message[];
    createdAt: Date;
};

export type Message = {
    id: string;
    text: string;
    type: "SYSTEM" | "COMPANY";
    createdAt?: Date;
};
