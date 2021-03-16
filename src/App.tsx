import React, { FC } from 'react';
// import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from 'styled-components';
import { theme } from './assets/theme';

import Map from './components/map';

function App(): JSX.Element {
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Map />
      </ThemeProvider>
    </div>
  );
}

export default App;
