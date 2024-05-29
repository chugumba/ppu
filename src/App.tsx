//import { invoke } from "@tauri-apps/api/tauri";
import '@mantine/core/styles.css';
import { MantineProvider, Grid } from '@mantine/core';
import { TableSort } from "./components/TablePpu";
import SliderMenu from './components/SliderMenu';
import {useState} from 'react';
import Header from './components/Header/Header';
import styles from './styles/styles.module.css'
function App() {

  const [numPpu, setNumPpu] = useState<number|null>(null);

  return (
    
    <MantineProvider>

      <div className={styles.wrapper}>

        <div className={styles.header_container}>
          <Header />
        </div>

        <Grid grow className={styles.main_container}>

          <Grid.Col span={numPpu === null ? 10 : 8}>
            <TableSort  onNumPpuChange={setNumPpu}/>
            </Grid.Col>
            
            <Grid.Col span={4}>
            <SliderMenu number={numPpu} onNumPpuChange={setNumPpu}/>
          </Grid.Col>
        
        </Grid>
      </div>
    
    </MantineProvider>

  );
}

export default App;


/*

Был произведён жёсткий спидран за один вечер, пока все данные берутся из 
MySQL базы later-transfer-to-oracle, таблицы sidebar, на оракл перенести должно быть не трудно,
учитывая что запросы есть на локальном компьютере в папке с проектом ппу, не известно 
как подключить раст к ораклу

подключение бд здесь:
C:\Practice\PPU\ppu\src-tauri\src\db_conn.rs

ЗАПУСК ПРОЕКТА:

!!!!!!!!!!!!!!!!!!!!!!!!!!!

cd C:\Practice\PPU\ppu
npm run tauri dev

!!!!!!!!!!!!!!!!!!!!!!!!!!!

ЕСЛИ НУЖНО ЗАПУСТИТЬ ЧИСТО REACT БЕЗ TAURI: 

!!!!!!!!!!!!!!!!!!!!!!!!!!!

cd C:\Practice\PPU\ppu
npm run dev 
o

!!!!!!!!!!!!!!!!!!!!!!!!!!!

*/