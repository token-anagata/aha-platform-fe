import { useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import EthIcon from '@/assets/svg/EthIcon'
import BnbIcon from '@/assets/svg/BnbIcon'
import UsdtIcon from '@/assets/svg/UsdtIcon'
import AhaIcon from '@/assets/svg/AhaIcon'
import classNames from 'classnames'
import { ChainOpts } from '@/types/chain'

export const CHAIN_OPTS: ChainOpts[] = [
  {
    name: 'Anagata Token',
    value: 'aha',
    icon: <AhaIcon addClassName='' />
  },
  {
    name: 'USD Tether',
    value: 'usdt',
    icon: <UsdtIcon addClassName='' />
  },
  {
    name: 'Ethereum',
    value: "eth",
    icon: <EthIcon addClassName='' />
  },
  {
    name: 'Binance Coin',
    value: 'bnb',
    icon: <BnbIcon addClassName='' />
  },
]

interface ChainSelectBoxProps {
  onChange: (selectedValue: ChainOpts) => void;
}

const ChainSelectBox: React.FC<ChainSelectBoxProps> = ({ onChange }) => {
  const [selected, setSelected] = useState<ChainOpts>(CHAIN_OPTS[0]);

  const handleChange = (chain: ChainOpts) => {
    setSelected(chain);
    onChange(chain); // Pass the selected value to the parent component
  };


  return (
    <Listbox value={selected} onChange={handleChange}>
      {({ open }) => (
        <>
          <div className="relative mt-2 ">
            <ListboxButton className="relative w-full cursor-default appearance-none border-gray-500 border py-4 pl-4 text-xl bg-gray-100 dark:bg-gray-700 text-black dark:text-white placeholder:text-gray-500 placeholder:dark:text-gray-200 focus:placeholder-gray-600 transition rounded-sm outline-none">
              <span className="flex items-center">
                {selected.icon}
                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              </span>
            </ListboxButton>

            <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-gray-100 dark:bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {CHAIN_OPTS.map((chain) => (
                  <ListboxOption
                    key={chain.value}
                    className={({ focus }) =>
                      classNames(
                        focus ? 'bg-indigo-600 text-black dark:text-white' : '',
                        !focus ? 'text-black dark:text-white' : '',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={chain}
                  >
                    {({ selected }) => (
                      <>
                        <div className="flex items-center">
                          {chain.icon}
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {chain.name}
                          </span>
                        </div>
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}


export default ChainSelectBox