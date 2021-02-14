import { useContext, createContext } from 'react';

// eslint-disable-next-line func-names
export const AppContext = createContext([{}, function () {}]);

export function useAppContext() {
  return useContext(AppContext);
}
