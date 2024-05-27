//import { useState } from "react";
//import { invoke } from "@tauri-apps/api/tauri";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { TableSort } from "./components/TablePpu";
import SliderMenu from './components/SliderMenu';
import React from 'react';
//import Header from './components/Header';

const currentPpu = React.createContext('');

function App() {

  return (
    
    <MantineProvider>
      
      <currentPpu.Provider value = ''>
        <TableSort/>
        <SliderMenu/>
      </currentPpu.Provider>
  
      {/*<Header />*/}

    </MantineProvider>

  );
}

export default App;
