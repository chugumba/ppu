import { Button, Paper } from '@mantine/core';
import React, { useState, useEffect } from 'react';
//import style from '../styles/styles.module.css';

interface SliderMenuProps {
  number: number | null;
  onNumPpuChange: (numPpu: number | null) => void;
}
export default function SliderMenu({ number, onNumPpuChange }: SliderMenuProps) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handlePanelOpen = () => {
    setIsPanelOpen(true);
  };

  const handlePanelClose = () => {
    onNumPpuChange(null)
    setIsPanelOpen(false);
  };

  const panelStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '50%',
    transform: isPanelOpen ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.3s ease-out',
  };
  
  //Открывает меню при изменении значения пропа
  useEffect(() => {
    if(number != null)
    handlePanelOpen(); 
  }, [number]);
  
  return (
    <>
      <Paper style={panelStyle} shadow="sm" radius="xs" p="xl">
        <Button onClick={handlePanelClose}>
          Закрыть панель
        </Button>
        <p>Number: {number}</p>
      </Paper>
    </>
  );
};
