"use client"
import useSWR from 'swr'

interface GlobalState {
  isMenuOpen: boolean
  username: string
  email: string|undefined
  avatar: string
}

const initialState: GlobalState = {
  isMenuOpen: false,
  username: '',
  email: '',
  avatar: '',
}

const useGlobalState = () => {
  const { data: state, mutate } = useSWR<GlobalState>('globalState', () => initialState, {
    fallbackData: initialState, // Provide fallback data for SSR
  })
  const updateState = (newState: Partial<GlobalState>) => {
    mutate((currentState) => ({
      ...currentState,
      ...newState
    }) as GlobalState,false)
  }

  return {
    state,
    updateState,
  }
}
export default useGlobalState


// import useSWR, { mutate } from 'swr'
// import React from 'react'

// interface GlobalState {
//   isMenuOpen: boolean;
//   username: string;
//   email: string | undefined;
//   avatar: string;
// }

// const initialState: GlobalState = {
//   isMenuOpen: false,
//   username: '',
//   email: undefined,
//   avatar: '',
// };

// const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { data: state, mutate: updateState } = useSWR<GlobalState>('globalState', () => initialState, {
//     fallbackData: initialState,
//   });

//   const updateGlobalState = (newState: Partial<GlobalState>) => {
//     updateState((currentState) => ({ ...currentState, ...newState }) as GlobalState);
//   };

//   return (
//     <GlobalStateContext.Provider value={{ state: state!, updateGlobalState }}>
//       {children}
//     </GlobalStateContext.Provider>
//   );
// };const GlobalStateContext = React.createContext<{
//   state: GlobalState;
//   updateGlobalState: (newState: Partial<GlobalState>) => void;
// }>({
//   state: initialState,
//   updateGlobalState: () => {},
// });

// export const useGlobalState = () => React.useContext(GlobalStateContext);

// export default GlobalStateProvider;