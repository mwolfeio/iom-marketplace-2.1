import { createContext } from "react";

export const UserContext = createContext({
  isLoggedIn: false,
  info: {},
  token: "",
  iom: 0,
  balances: [],
  refreshUSer: () => {},
});
