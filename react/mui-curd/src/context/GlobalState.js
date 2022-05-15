import React, { createContext, useState } from 'react';

const initialState = {
  common: {
    aboutDlgOpen: true
  }
  // products: [
  //   {
  //     id: 1,
  //     name: "チョコレート",
  //     category: 1,
  //     weight: 100,
  //     price: 120
  //   }
  // ]
};

export const GlobalContext = createContext();

export const GlobalStateProvider = ({ children }) => {

  const [aboutDlgOpen, setaboutDlgOpen] = useState(initialState.common.aboutDlgOpen);

  function openAboutDlg() {
    setaboutDlgOpen(true);
  }

  function closeAboutDlg() {
    setaboutDlgOpen(false);
  }

  return (
    <GlobalContext.Provider
      value={{
        aboutDlgOpen: aboutDlgOpen,
        openAboutDlg,
        closeAboutDlg
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};