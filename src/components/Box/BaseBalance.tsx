import AhaIcon from "@/assets/svg/AhaIcon";
import UsdtIcon from "@/assets/svg/UsdtIcon";
import { formatNumber } from "@/utils/number";
import classNames from "classnames";

interface IcoBalanceProps {
    page: string | undefined;
    usdt: number;
    aha: number;
}

const BaseBalance: React.FC<IcoBalanceProps> = ({ page, usdt, aha }) => {
    return (
        <div className="grid grid-cols-2 text-lg mb-8">
            <div className="flex">
                <UsdtIcon addClassName="" />&nbsp;
                <p className="font-bold">{formatNumber(usdt, 0, 2)} USDT</p>
            </div>
            <div className="flex justify-end">
                <p className={classNames({
                    'font-bold text-right': true,
                    'text-red-500': page === 'invest' && aha < 10000
                })}> {formatNumber(aha, 0, 2)} AHA</p> &nbsp;
                <AhaIcon addClassName=" " />
            </div>
        </div >
    )
}

export default BaseBalance