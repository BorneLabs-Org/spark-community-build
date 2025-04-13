
import { useContext } from 'react';
import { AppContext } from './context';
import { AppContextType } from './types';

// Hook to use the app context
export const useAppContext = (): AppContextType => useContext(AppContext);
