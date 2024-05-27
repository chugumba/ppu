//import { invoke } from "@tauri-apps/api/tauri";
import '@mantine/core/styles.css';
import { MantineProvider, Grid } from '@mantine/core';
import { TableSort } from "./components/TablePpu";
import SliderMenu from './components/SliderMenu';
import {useState} from 'react';
//import Header from './components/Header';
function App() {

  const [numPpu, setNumPpu] = useState<number|null>(null);

  return (
    
    <MantineProvider>
       <Grid grow>

       <Grid.Col span={4}>
        <TableSort  onNumPpuChange={setNumPpu}/>
        </Grid.Col>
        
        <Grid.Col span={4}>
        <SliderMenu number={numPpu} onNumPpuChange={setNumPpu}/>
        </Grid.Col>
      
      </Grid>
    
    {/*<Header />*/}
    
    </MantineProvider>

  );
}

export default App;


/*

Сейчас сделал так, что из компонента таблицы в App.tsx возвращается номер ППУ, 
это вызывает useEffect в SliderMenu, при нажатии на кнопку закрыть, данные сбрасываются на null,
нормально обновляет данные. Правильнее было бы через контекст сделать наверно,
но пока с этим не разобрался.

Сделал ширину таблицы через гриды, нужно будет сделать либо чтобы таблица занимала всю ширину пока не выехало окно,
либо чтобы первый элемент из базы данных вызывался сразу (пока не знаю что лучше).

Нужно подключить бд, можно попробовать поставить оракловскую, но я уже впринципе скопировал
Главную таблицу в MySQL.

ЗАПУСК ПРОЕКТА:

!!!!!!!!!!!!!!!!!!!!!!!!!!!

cd ppu
npm run tauri dev

!!!!!!!!!!!!!!!!!!!!!!!!!!!

ЕСЛИ НУЖНО ЗАПУСТИТЬ ЧИСТО REACT БЕЗ TAURI: 

!!!!!!!!!!!!!!!!!!!!!!!!!!!

npm run dev 
o

!!!!!!!!!!!!!!!!!!!!!!!!!!!

*/