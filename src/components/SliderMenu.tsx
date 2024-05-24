import { Button, Paper } from '@mantine/core';
import React, {useState} from 'react';

export default function SliderMenu() {
 

    //Нужно экспортировать handleButtonClick либо в App либо в TablePpu и 
    //сделать, чтобы оно меняло содержимое внутри Paper

     const [isPanelOpen,setIsPanelopen] = useState(false);

     const handleButtonClick = () => {
        setIsPanelopen(true);
     }

     const handlePanelClose = () => {
        setIsPanelopen(false)
     }


     //Наверное это стоит потом перенести в отдельный css файл, но пока не трогаем
     //Возможно удобнее будет работать с выезжающей менюшкой

     const panelStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '50%',
        transform: isPanelOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease-out',
    };  

  return (
    <>
        <Button onClick={handleButtonClick}> Открыть панель</Button>
        <Paper style={panelStyle} shadow="sm" radius="xs" p="xl">
            <Button onClick={handlePanelClose}>Закрыть панель</Button>
        </Paper>
    </>
  );
};

