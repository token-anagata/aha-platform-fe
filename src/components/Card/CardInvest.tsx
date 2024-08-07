import ContributeIcon from "@/assets/svg/ContributeIcon";
import SpinIcon from "@/assets/svg/SpinIcon";
import { API_URL } from "@/configurations/common";
import { Project } from "@/types/project";
import { formatNumber } from "@/utils/number";
import classNames from "classnames";
import ImageWithFallback from "../Image/ImageFallback";

interface CardInvestProps {
    data: Project | null | undefined;
}

const CardInvest: React.FC<CardInvestProps> = ({ data }) => {
    const createMarkup = (html: string) => {
        return { __html: html };
    };

    if (!data) {
        return (
            <div className="flex justify-center items-center h-full">
                <SpinIcon addClassName="animate-spin -ml-1 mr-3 text-white h-20 w-20 text-aha-green-light" />
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-between items-stretch min-h-full">
            <div className="max-h-[360px] aspect-h-2 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                <ImageWithFallback
                    src={`${API_URL}/storage/${data?.images[0].image}`}
                    fallbackSrc="/image-couldnt-load.webp"
                    alt={data.project_name}
                    className="w-full h-full"
                />
            </div>
            <div className="flex justify-between pt-2">
                <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-200">{data.project_name}</p>
                    <p className="text-md text-gray-400">{data.project_category}</p>
                </div>
                <ContributeIcon addClassName="w-14 h-12" />
            </div>

            <div className="shrink-0 mt-4 gap-4">
                <div className="font-normal" dangerouslySetInnerHTML={createMarkup(data.project_title)} />

            </div>
            <div className="py-2">
                <div className="flex flex-col md:flex-row justify-start md:justify-between">
                    <p className="text-base md:text-2xl font-semibold">{data.project_stage}</p>

                    <div className="self-start md:self-end text-base md:text-xl flex gap-2">
                        <p className="font-normal text-gray-800 dark:text-gray-300">Raised</p>
                        <p className={classNames({
                            'text-aha-green-lighter': Number(data.total_conversion_value) > Number(data.target_investment),
                            'text-yellow-600 dark:text-yellow-500': Number(data.total_conversion_value) < Number(data.target_investment)
                        })}> $ {formatNumber(Number(data.total_conversion_value), 0, 2)}</p>
                        <p className="font-normal text-gray-800 dark:text-gray-300">from</p>
                        <p className="text-aha-green-light">$ {formatNumber(Number(data.target_investment), 0, 2)}</p>
                    </div>
                </div>

                <div className="flex w-full h-4 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-400" >
                    <div
                        className={classNames({
                            'flex flex-col justify-center rounded-full overflow-hidden text-xs text-white text-center whitespace-nowrap transition duration-500': true,
                            'bg-yellow-500': Number(data.total_conversion_value) < Number(data.target_investment),
                            'bg-aha-green-lighter':  Number(data.total_conversion_value) < Number(data.target_investment),
                        })}
                        style={{ width: `${Math.ceil(Number(data.total_conversion_value) / Number(data.target_donation) * 100)}%` }}
                    >
                    </div>
                </div>
                <div className="flex justify-end">
                    <p className="text-base text-gray-600 dark:text-white"> {data.days_left} Days Left</p>
                </div>
            </div>

        </div>
    )
}

export default CardInvest