import React, { createContext, useState } from 'react';

export const ResponseModalContext = createContext(undefined);

const ResponseModalContextProvider = ({ children }) => {
  const [respOpen, setRespOpen] = useState<boolean>(false);

  return (
    <ResponseModalContext.Provider value={{ respOpen, setRespOpen }}>
      {children}
    </ResponseModalContext.Provider>
  );
};

export default ResponseModalContextProvider;
