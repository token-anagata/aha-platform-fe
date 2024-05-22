import { useWeb3ModalTheme } from '@web3modal/wagmi/react';
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

interface DarkModeState {
  darkMode: boolean;
}

interface DarkModeAction {
  type: 'TOGGLE_DARK_MODE';
}

interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType>({} as DarkModeContextType);

const darkModeReducer = (state: DarkModeState, action: DarkModeAction): DarkModeState => {
  switch (action.type) {
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    default:
      return state;
  }
};

interface DarkModeProviderProps {
  children: ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(darkModeReducer, {
    darkMode: getInitialMode(),
  });

  // web3modal theme
  const { setThemeMode } = useWeb3ModalTheme();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(state.darkMode ? 'light' : 'dark');
    root.classList.add(state.darkMode ? 'dark' : 'light');

    // set web3 modal theme
    setThemeMode(state.darkMode ? 'dark' : 'light');

    localStorage.setItem('dark', JSON.stringify(state.darkMode));
  }, [state.darkMode, setThemeMode]);

  function getInitialMode(): boolean {
    const isReturningUser = 'dark' in localStorage;
    const savedMode = JSON.parse(localStorage.getItem('dark') || 'false');
    const userPrefersDark = getPrefColorScheme();

    if (isReturningUser) {
      return savedMode;
    } else if (userPrefersDark) {
      return true;
    } else {
      return false;
    }
  }

  function getPrefColorScheme(): boolean {
    if (!window.matchMedia) return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = (): DarkModeContextType => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};
