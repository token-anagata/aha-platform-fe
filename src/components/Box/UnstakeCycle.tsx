import React, { useState, ChangeEvent, MouseEvent } from "react";
import { toast } from "react-toastify";
import SpinIcon from "../../assets/svg/SpinIcon";
import classNames from "classnames";
import { useAccountStaked } from "../../context/AccountStakedContext";
import { unstake } from "@/utils/wagmi/stake/writeContract";
import { Address } from "viem";

interface UnstakeCycleProps {
  address: string;
}

const UnstakeCycle: React.FC<UnstakeCycleProps> = ({ address }) => {
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [cycleNumber, setCycleNumber] = useState<string>('');
  const { currentStake, unclaimedStake } = useAccountStaked();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCycleNumber(event.target.value);
  };

  const handleUnStake = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoadingButton(true);
      const result = await unstake(address as Address, Number(cycleNumber));

      if (result) {
        setLoadingButton(false);
        toast.success('Unstake has been successful');
      }
    } catch (e) {
      console.log('unstake', e);
      setLoadingButton(false);
      toast.error("There was an error during unstake, try again in a moment");
    }
  };

  return (
    <section className="col-span-2 px-2 py-6 space-y-8 bg-gray-300 shadow-xl sm:px-4 rounded-sm bg-opacity-60 dark:bg-opacity-30">
      <div className="flex flex-col items-center sm:flex-row justify-evenly">
        <div className="font-medium">
          <h6 className="font-semibold"> Forgot to unstake from a previous cycle? We got you! </h6>
          <p className="mt-1">
            <span className="text-sm"> Unclaimed Cycle: </span>
            {unclaimedStake !== 0 ? unclaimedStake : 'None'}
          </p>
        </div>

        <div className="flex items-center justify-between w-full max-w-sm py-1 pr-1 bg-gray-100 dark:bg-gray-700 rounded">
          <input
            type="number"
            className="border-0 outline-none rounded p-1.5 bg-gray-100 dark:bg-gray-700 text-black dark:text-white w-2/3 placeholder:text-gray-500 placeholder:dark:text-gray-200"
            onChange={handleInputChange}
            value={cycleNumber}
            placeholder="Cycle Number"
          />

          <button
            className={classNames({
              'btn inline-flex btn rounded-sm py-1.5 px-6 text-lg': true
            })}
            disabled={loadingButton || currentStake === 0}
            onClick={handleUnStake}
          >
            {loadingButton ? <><SpinIcon addClassName="animate-spin -ml-1 mr-3 text-white h-5 w-5"  /> Processing</> : 'Claim'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default UnstakeCycle;
