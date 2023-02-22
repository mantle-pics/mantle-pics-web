import { SmartContract } from "./smart-contract.model"
import { TransactionConnection } from "./transaction.model"

export interface Address {
    contractCode: string
    // contractCode: Data
    fetchedCoinBalance: number
    fetchedCoinBalanceBlockNumber: number
    hash: string
    // hash: AddressHash
    smartContract: SmartContract
    transactions: TransactionConnection
}