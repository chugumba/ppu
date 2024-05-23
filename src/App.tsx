//import { useState } from "react";
//import { invoke } from "@tauri-apps/api/tauri";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { TableSort } from "./components/TablePpu";
import Header from './components/Header';

function App() {

  return (
    
    <MantineProvider>
      
      {<TableSort/>}
      <Header />

    </MantineProvider>

  );
}

export default App;
