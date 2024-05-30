import { createContext, useReducer } from 'react';
import { reducer, initialState } from './reducers';
import { setName, setEmail, setPopup } from './actions';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch, setName, setEmail, setPopup }}>
      {children}
    </AppContext.Provider>
  );
};