import React from 'react';

const GasFee: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8 dark:text-gray-200">

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
                <p className="text-2xl font-semibold mb-4">What are Gas Fees?</p>
                <p>Gas fees are payments made by users to compensate for the computing energy required to process and validate transactions on a blockchain.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
                <p className="text-2xl font-semibold mb-4">Why is a Gas Fee Needed?</p>
                <ul className="list-disc list-outside">
                    <li className="mb-2">
                        <strong>Compensation for Miners/Validators</strong>
                        <p>
                            Gas fees serve as an incentive, compensating miners or validators for their efforts and resources used in processing transactions.
                        </p>
                    </li>
                    <li className="mb-2">
                        <strong>Network Security</strong>
                        <p>
                            By requiring a fee for each transaction, blockchain networks protect against spam attacks. Gas fees make such attacks prohibitively expensive.
                        </p>
                    </li>
                    <li className="mb-2">
                        <strong>Resource Management</strong>
                        <p>

                            Gas fees help manage and allocate computational resources efficiently, ensuring that only transactions worth the cost are processed.
                        </p>
                    </li>
                    <li>
                        <strong>Priority and Speed</strong>
                        <p>
                            Higher gas fees can be set by users to prioritize their transactions. Transactions with higher gas fees are processed faster during network congestion.
                        </p>
                    </li>
                </ul>
            </div >

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
                <p className="text-2xl font-semibold mb-4">Factors Affecting Gas Fees</p>
                <ul className="list-disc list-outside">
                    <li className="mb-2">
                        <strong>Network Congestion</strong>
                        <p>Higher demand for transaction processing can lead to increased gas fees.</p>
                    </li>
                    <li className="mb-2">
                        <strong>Gas Price and Gas Limit</strong>
                        <p>Users can set the gas price (how much they are willing to pay per unit of gas) and gas limit (the maximum amount of gas they are willing to spend on a transaction).</p>
                    </li>
                    <li>
                        <strong>Type of Transaction</strong>
                        <p>Simple transfers of BNB typically cost less than complex interactions with smart contracts.</p>
                    </li>
                </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">How Gas Fees Work</h2>
                <ul className="list-disc list-outside">
                    <li className="mb-2"><strong>Gas Price and Gas Limit</strong>
                        <ul className="list-disc list-outside ml-4">
                            <li><strong>Gas Price:</strong> The amount of the native cryptocurrency (e.g., BNB) the user is willing to pay per unit of gas.</li>
                            <li><strong>Gas Limit:</strong> The maximum amount of gas the user is willing to spend on a transaction.</li>
                        </ul>
                    </li>
                    <li className="mb-2"><strong>Calculating Gas Fees</strong>
                        <p>Total Gas Fee = Gas Price * Gas Used</p>
                        <p>For example, if a transaction uses 21,000 units of gas and the gas price is 10 gwei, the total gas fee would be 21,000 * 10 = 210,000 gwei (or 0.00021 BNB).</p>
                    </li>
                    <li><strong>Burning and Redistribution</strong>
                        <p>Some blockchain networks implement mechanisms where a portion of the gas fee is burned (permanently removed from circulation) or redistributed to different entities (like validators or network maintenance funds).</p>
                    </li>
                </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
                <p className="text-2xl font-semibold mb-4">Reducing Gas Fees</p>
                <ul className="list-disc list-outside">
                    <li className="mb-2">
                        <strong>Timing</strong>
                        <p>Conduct transactions during off-peak hours when the network is less congested.</p>
                    </li>
                    <li className="mb-2">
                        <strong>Optimizing Gas Price</strong>
                        <p>Setting a lower gas price can reduce costs but might delay transaction processing if the network is busy.</p>
                    </li>
                </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
                <p className="text-2xl font-semibold mb-4">How to Check Gas Fees</p>
                <ul className="list-disc list-outside">
                    <li className="mb-2">A popular tool to monitor gas fees and network activity on ETH is Etherscan & BSC is BscScan. It provides real-time data on current gas prices and estimated fees.</li>
                    <li><strong>Wallets and DApps </strong> many wallets and decentralized applications (e.g., MetaMask, Trust Wallet) also display current gas fees and allow users to set custom gas prices.</li>
                </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
                <p className="text-2xl font-semibold mb-4">Recent Trends and Updates</p>
                <p><strong>EIP-1559 </strong> While Ethereum has implemented EIP-1559 to stabilize gas fees, BSC may adopt similar improvements to enhance fee predictability and network performance.
                </p>
            </div>

            <div className="p-2">
                <p>Gas fees are a crucial component of blockchain networks, ensuring that transactions are processed efficiently, resources are allocated fairly, and the network remains secure from spam and abuse. By understanding and managing gas fees, users can effectively interact with blockchain ecosystems, prioritizing their transactions and controlling their costs</p>
            </div>
        </div >
    );
};

export default GasFee;
