import React, { createContext } from 'react';

// Sirf ek simple Context Provider bana kar dekho
export const Web3Context = createContext();

export function Web3Provider({ children }) {
  console.log("Web3Provider is rendering..."); // Ye console mein dikhna chahiye
  return (
    <Web3Context.Provider value={{ status: "Active" }}>
      {children}
    </Web3Context.Provider>
  );
}