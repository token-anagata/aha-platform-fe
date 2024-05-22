export interface TokenType {
    AHA: string;
    USDT: string;
}

export interface TokenTransaction {
    blockNumber: string;
    timeStamp: string;
    hash: string;
    nonce: string;
    blockHash: string;
    from: string;
    contractAddress: string;
    to: string;
    value: string;
    tokenName: string;
    tokenSymbol: string;
    tokenDecimal: string;
    transactionIndex: string;
    gas: string;
    gasPrice: string;
    gasUsed: string;
    cumulativeGasUsed: string;
    input: string;
    confirmations: string;
}


export interface TokenHolderList{
    TokenHolderAddress: string;
    TokenHolderQuantity: string;
}