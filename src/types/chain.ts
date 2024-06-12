import { ReactNode } from "react";

export interface ChainOpts {
    id: number;
    name: string;
    value: string;
    recipient: string;
    explorer: string | undefined;
    icon: ReactNode;
}