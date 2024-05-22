//import { useState } from "react";
//import { invoke } from "@tauri-apps/api/tauri";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { TableSort } from "./components/TablePpu";

function App() {

  return (
    
    <MantineProvider>
    
      <TableSort/>

    </MantineProvider>

  );
}

export default App;
