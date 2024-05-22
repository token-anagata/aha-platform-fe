
import { formatNumber } from "@/utils/number";
import { DECIMALS } from "@/utils/wagmi";

interface IcoInfoProps {
    allowance: BigInt;
    tokenSold: BigInt;
    tokenHolders: number;
}

const IcoInfo: React.FC<IcoInfoProps> = ({ allowance, tokenSold, tokenHolders}) => {
    return (
        <div className="grid grid-cols-2 text-xl">
            <div>
                <p className="font-medium">Tokens Sale</p>
            </div>
            <div>
                <p className="font-bold text-right"> {formatNumber(Number(allowance) / Number(DECIMALS), 0, 2)} AHA</p>
            </div>
            <div>
                <p className="font-medium">Tokens Sold</p>
            </div>
            <div>
                <p className="font-bold text-right"> {formatNumber(Number(tokenSold) / Number(DECIMALS), 0, 2)} AHA</p>
            </div>
            <div>
                <p className="font-medium">Tokens Holder</p>
            </div>
            <div>
                <p className="font-bold text-right"> {formatNumber(tokenHolders, 0, 0)} Address</p>
            </div>
        </div>
    )
}

export default IcoInfo