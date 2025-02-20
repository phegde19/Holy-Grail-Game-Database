import React, { createContext, useState } from 'react';

export const VisibilityContext = createContext();

export const VisibilityProvider = ({ children }) => {
  const [visible, setVisible] = useState(true);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <VisibilityContext.Provider value={{ visible, toggleVisibility }}>
      {children}
    </VisibilityContext.Provider>
  );
};