import AhaIcon from "@/assets/svg/AhaIcon";
import UsdtIcon from "@/assets/svg/UsdtIcon";
import { formatNumber } from "@/utils/number";

interface IcoBalanceProps {
    usdt: number;
    aha: number;
}

const IcoBalance: React.FC<IcoBalanceProps> = ({ usdt, aha }) => {
    return (
        <div className="grid grid-cols-2 text-lg">
            <div className="flex">
                <UsdtIcon addClassName="" />&nbsp;
                <p className="font-bold">{formatNumber(usdt, 0, 2)} USDT</p>
            </div>
            <div className="flex justify-end">
                <p className="font-bold text-right"> {formatNumber(aha, 0, 2)} AHA</p> &nbsp;
                <AhaIcon addClassName=" "/>
            </div>
        </div>
    )
}

export default IcoBalance