import React, { createContext, useContext, useEffect, useState } from 'react';

interface StoreContextProps {
  gasInfoIco: boolean;
  setGasInfoIco: (value: boolean) => void;
  gasInfoStake: boolean;
  setGasInfoStake: (value: boolean) => void;
  gasInfoDonation: boolean;
  setGasInfoDonation: (value: boolean) => void;
  gasInfoInvest: boolean;
  setGasInfoInvest: (value: boolean) => void;
}

const StoreContext = createContext<StoreContextProps | undefined>(undefined);

const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gasInfoIco, setGasInfoIco] = useState<boolean>(() => {
    const savedValue = localStorage.getItem('GAS_INFO_ICO');
    return savedValue !== null ? false : true;
  });

  const [gasInfoStake, setGasInfoStake] = useState<boolean>(() => {
    const savedValue = localStorage.getItem('GAS_INFO_STAKE');
    return savedValue !== null ? false : true;
  });

  const [gasInfoDonation, setGasInfoDonation] = useState<boolean>(() => {
    const savedValue = localStorage.getItem('GAS_INFO_DONATE');
    return savedValue !== null ? false : true;
  });

  const [gasInfoInvest, setGasInfoInvest] = useState<boolean>(() => {
    const savedValue = localStorage.getItem('GAS_INFO_INVEST');
    return savedValue !== null ? false : true;
  });

  useEffect(() => {
    // Save value to local storage whenever it changes
    if (!gasInfoIco) {
      localStorage.setItem('GAS_INFO_ICO', JSON.stringify(gasInfoIco));
    }
  }, [gasInfoIco]);

  useEffect(() => {
    if (!gasInfoStake) {
      localStorage.setItem('GAS_INFO_STAKE', JSON.stringify(gasInfoStake));
    }
  }, [gasInfoStake]);

  useEffect(() => {
    if (!gasInfoDonation) {
      localStorage.setItem('GAS_INFO_DONATE', JSON.stringify(gasInfoDonation));
    }
  }, [gasInfoDonation]);

  useEffect(() => {
    if (!gasInfoInvest) {
      localStorage.setItem('GAS_INFO_INVEST', JSON.stringify(gasInfoInvest));
    }
  }, [gasInfoInvest]);

  return (
    <StoreContext.Provider value={{
      gasInfoIco,
      setGasInfoIco,
      gasInfoStake,
      setGasInfoStake,
      gasInfoDonation,
      setGasInfoDonation,
      gasInfoInvest,
      setGasInfoInvest,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

const useStore = (): StoreContextProps => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export { StoreProvider, useStore };
