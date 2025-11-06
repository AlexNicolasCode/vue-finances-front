import type { TransactionTypeEnum } from "../shared/enums"

export type CreateTransactionDto = {
    type: TransactionTypeEnum;
    value: number;
    targetAccountId: string;
}  