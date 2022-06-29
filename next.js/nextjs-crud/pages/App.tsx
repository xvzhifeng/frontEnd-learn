import React from 'react';
// import logo from './../public/logo.svg';
import '../styles/app.module.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import ProductPage from "./pages/ProductListPage";
// import AboutPage from "./pages/AboutPage";
// import HomePage from "./pages/HomePage";
// import SectionPage from "./pages/SectionListPage"

import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
import { ConfirmProvider } from 'material-ui-confirm';
import { GlobalStateProvider } from '../context/GlobalState';

import * as colors from "@material-ui/core/colors";
import HomePage from './HomePage';

const theme = createTheme({
  typography: {
    fontFamily: [
      "Noto Sans JP",
      "Lato",
      "游ゴシック Medium",
      "游ゴシック体",
      "Yu Gothic Medium",
      "YuGothic",
      "ヒラギノ角ゴ ProN",
      "Hiragino Kaku Gothic ProN",
      "メイリオ",
      "Meiryo",
      "ＭＳ Ｐゴシック",
      "MS PGothic",
      "sans-serif",
    ].join(","),
  },
  palette: {
    primary: { main: colors.blue[800] }, // テーマの色
  },
});

function App({ children }) {

  return (
      <ThemeProvider theme={theme}>
        <GlobalStateProvider>
          {children}
        </GlobalStateProvider>
      </ThemeProvider>
  );
}

export default App;
