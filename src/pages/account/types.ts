import type { TransactionStatusEnum, TransactionTypeEnum } from "../../shared/enums";

export type Transaction = {
    id: string;
    accountName: string;
    status: TransactionStatusEnum;
    type: TransactionTypeEnum;
    value: string;
}