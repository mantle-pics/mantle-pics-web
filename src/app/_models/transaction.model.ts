export interface TransactionConnection {
    edges: TransactionEdge[]
    pageInfo: PageInfo
}

export interface TransactionEdge {
    node: Transaction
    cursor: string
}

export interface PageInfo {
    hasNextPage: boolean
    hasPreviousPage: boolean
    startCursor: string
    endCursor: string
}

export interface Transaction {
    blockNumber: number
    createdContractAddressHash: string
    cumulativeGasUsed: number
    error: String
    from: string
    gas: number
    gasPrice: number
    gasUsed: number
    hash: string
    id: string
    index: number
    input: String
    // skipped, not used
    internalTransactions: any
    // internalTransactions: InternalTransactionConnection
    l1Fee: number
    l1FeeScalar: number
    l1GasPrice: number
    l1GasUsed: number
    nonce: string
    r: number
    s: number
    status: string
    timeStamp: number
    to: string
    v: number
    value: number
}