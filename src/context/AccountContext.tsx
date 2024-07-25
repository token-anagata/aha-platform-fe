import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AccountContextType {
  solanaAddress: string | null;
  setSolanaAddress: (solanaAddress: string) => void;
  removeSolanaAddress: () => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

const AccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [solanaAddress, setSolanaAddressState] = useState<string | null>(() => {
    return localStorage.getItem('solanaAddress');
  });

  const setSolanaAddress = (newAddress: string) => {
    setSolanaAddressState(newAddress);
    localStorage.setItem('solanaAddress', newAddress);
  };

  const removeSolanaAddress = () => {
    setSolanaAddressState(null);
    localStorage.removeItem('solanaAddress');
  };

  useEffect(() => {
    const storedAddress = localStorage.getItem('solanaAddress');
    if (storedAddress) {
      setSolanaAddressState(storedAddress);
    }
  }, []);

  return (
    <AccountContext.Provider value={{ solanaAddress, setSolanaAddress, removeSolanaAddress }}>
      {children}
    </AccountContext.Provider>
  );
};

const useAccount = (): AccountContextType => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};

export { AccountProvider, useAccount };
