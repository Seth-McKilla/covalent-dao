import { useReducer, createContext } from "react";
import reducers from "./reducers";

const initialState = {
  provider: null,
  web3Provider: null,
  address: null,
  chainId: null,
};

const Context = createContext({});

const combineReducers =
  (...reducers) =>
  (state, action) => {
    for (let i = 0; i < reducers.length; i++)
      state = reducers[i](state, action);
    return state;
  };

// context provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(combineReducers(reducers), initialState);
  const value = { state, dispatch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
