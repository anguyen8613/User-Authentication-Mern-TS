import axios from 'axios';
import React, { createContext, FC, useEffect, useState } from 'react';

interface IAuthContext {
  loggedIn: boolean | undefined;
  getLoggedIn: () => Promise<void>;
}

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthContextProvider: FC<Props> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const server: string = process.env.REACT_APP_HOST || 'http://localhost:5000';

  useEffect(() => {
    getLoggedIn();
  }, []);

  const getLoggedIn: () => Promise<void> = async () => {
    const response = await axios.get(`${server}/user/isLoggedIn`);
    const data = response.data;
    setLoggedIn(data);
  };
  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export { AuthContextProvider };
