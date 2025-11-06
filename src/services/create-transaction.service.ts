import { apiClient } from "../clients"
import type { CreateTransactionDto } from "./types";

export const createTransactionInApi = async (dto: CreateTransactionDto) => {
    await apiClient.request({
        method: 'post',
        url: 'transactions',
        data: dto,
    });
}
