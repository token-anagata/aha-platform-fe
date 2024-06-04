export const ABI_STAKE_CONTRACT = [
    {
        "inputs": [{
            "internalType": "address",
            "name": "_tokenAddress",
            "type": "address"
        }],
        "stateMutability": "nonpayable",
        "type": "constructor"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
        }, {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }, {
            "indexed": false,
            "internalType": "uint256",
            "name": "duration",
            "type": "uint256"
        }, {
            "indexed": false,
            "internalType": "uint256",
            "name": "created",
            "type": "uint256"
        }, {
            "indexed": false,
            "internalType": "uint256",
            "name": "apr",
            "type": "uint256"
        }],
        "name": "Staked",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
        }, {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }, {
            "indexed": false,
            "internalType": "uint256",
            "name": "interest",
            "type": "uint256"
        }],
        "name": "Unstaked",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
        }],
        "name": "UpdateStakeAPR",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
        }],
        "name": "UpdateStakeMonth",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
        }],
        "name": "UpdateStakeRangeAmount",
        "type": "event"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "stakeIndex",
            "type": "uint256"
        }],
        "name": "calculateInterest",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "stakeAmount",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "stakeMonth",
            "type": "uint256"
        }],
        "name": "getApr",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }],
        "name": "getIndex",
        "outputs": [{
            "internalType": "int256",
            "name": "",
            "type": "int256"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "owner",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "stakeMonth",
            "type": "uint256"
        }],
        "name": "stake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "token",
        "outputs": [{
            "internalType": "contract IERC20",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
        }],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "stakeIndex",
            "type": "uint256"
        }],
        "name": "unstake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256[6][6]",
            "name": "newAPR",
            "type": "uint256[6][6]"
        }],
        "name": "updateAPR",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256[6]",
            "name": "newMinAmounts",
            "type": "uint256[6]"
        }, {
            "internalType": "uint256[6]",
            "name": "newMaxAmounts",
            "type": "uint256[6]"
        }],
        "name": "updateMinMaxAmounts",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256[6]",
            "name": "newStakeMonths",
            "type": "uint256[6]"
        }],
        "name": "updateStakeMonths",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]