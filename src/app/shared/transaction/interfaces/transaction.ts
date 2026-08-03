import { TransactionType } from "@shared/transaction/enums/transaction-type"

export interface Transaction {
    id: number
    title: string
    value: number
    type: TransactionType
}

// Omitir o id
export type TransactionPayload = Omit<Transaction, 'id'>