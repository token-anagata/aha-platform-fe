import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
  } from 'react';
  
  interface AccountStakedContextProps {
    amountStaked: number;
    updateAmountStaked: (newAmount: number) => void;
    rewardStaked: number;
    updateRewardStaked: (newReward: number) => void;
    totalStaked: number;
    updateTotalStaked: (newTotal: number) => void;
    lastStaked: string;
    updateLastStaked: (newDate: string) => void;
    currentStake: number | null;
    updateCurrentStake: (newPlan: number | null) => void;
    unclaimedStake: number;
    updateUnclaimedStake: (newUnclaim: number) => void;
  }
  
  const AccountStakedContext = createContext<AccountStakedContextProps | undefined>(undefined);
  
  export const useAccountStaked = (): AccountStakedContextProps => {
    const context = useContext(AccountStakedContext);
    if (!context) {
      throw new Error('useAccountStaked must be used within an AccountStakedProvider');
    }
    return context;
  };
  
  interface AccountStakedProviderProps {
    children: ReactNode;
  }
  
  export const AccountStakedProvider: React.FC<AccountStakedProviderProps> = ({ children }) => {
    const [amountStaked, setAmountStaked] = useState<number>(0);
    const [rewardStaked, setRewardStaked] = useState<number>(0);
    const [totalStaked, setTotalStaked] = useState<number>(0);
    const [lastStaked, setLastStaked] = useState<string>('');
    const [currentStake, setCurrentStake] = useState<number | null>(null);
    const [unclaimedStake, setUnclaimedStake] = useState<number>(0);


    const updateAmountStaked = (newAmount: number) => {
      setAmountStaked(newAmount);
    };
  
    const updateRewardStaked = (newReward: number) => {
      setRewardStaked(newReward);
    };
  
    const updateTotalStaked = (newTotal: number) => {
      setTotalStaked(newTotal);
    };
  
    const updateLastStaked = (newDate: string) => {
      setLastStaked(newDate);
    };
  
    const updateCurrentStake = (newPlan: number | null) => {
      setCurrentStake(newPlan);
    };
  
    const updateUnclaimedStake = (newUnclaim: number) => {
      setUnclaimedStake(newUnclaim);
    };
  
    return (
      <AccountStakedContext.Provider
        value={{
          amountStaked,
          updateAmountStaked,
          rewardStaked,
          updateRewardStaked,
          totalStaked,
          updateTotalStaked,
          lastStaked,
          updateLastStaked,
          currentStake,
          updateCurrentStake,
          unclaimedStake,
          updateUnclaimedStake,
        }}
      >
        {children}
      </AccountStakedContext.Provider>
    );
  };
  