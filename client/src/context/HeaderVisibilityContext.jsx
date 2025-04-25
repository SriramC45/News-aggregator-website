// src/context/HeaderVisibilityContext.js
import { createContext, useContext, useState } from 'react';

const HeaderVisibilityContext = createContext();

export const HeaderVisibilityProvider = ({ children }) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  return (
    <HeaderVisibilityContext.Provider value={{ isHeaderVisible, setIsHeaderVisible }}>
      {children}
    </HeaderVisibilityContext.Provider>
  );
};

export const useHeaderVisibility = () => useContext(HeaderVisibilityContext);
