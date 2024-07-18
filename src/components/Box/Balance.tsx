import BnbIcon from "@/assets/svg/BnbIcon";
import { formatNumber } from "@/utils/number";
import classNames from "classnames";

interface IcoBalanceProps {
    page: string | undefined;
    title: string;
    bnb: number;
}

const Balance: React.FC<IcoBalanceProps> = ({ page, title, bnb }) => {
    return (
        <div className="flex justify-between">
            <h2 className="font-bold text-2xl">{title}</h2>
            <div className="flex relative">
                <p className={classNames({
                    'font-bold text-right': true,
                    'text-red-500': page === 'invest' && bnb < 10000
                })}> {formatNumber(bnb, 0, 2)} BNB</p> &nbsp;
                <BnbIcon addClassName=" " />
            </div>
        </div>
    )
}

export default Balance