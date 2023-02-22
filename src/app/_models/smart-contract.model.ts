export interface SmartContract {
    abi: any
    // abi: json
    addressHash: string
    compilerVersion: string
    contractSourceCode: string
    name: string
    optimization: boolean
}