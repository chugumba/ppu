import { Button, Paper, Text } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import styles from '../styles/styles.module.css';
import photo from '../images/photo.jpg';
import { invoke } from '@tauri-apps/api/tauri';

interface SliderMenuProps {
  number: number | null;
  onNumPpuChange: (numPpu: number | null) => void;
}

interface FastRealization {
  id: number;
  author: string;
  numPpu: number;
  problem: string;
  proposal: string;
  photo: string;
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
    top: 120,
    right: 20,
    bottom: 30,
    width: '50%',
    transform: isPanelOpen ? 'translateX(0)' : 'translateX(120%)',
    transition: 'transform 0.3s ease-out',
  };
  
  //Открывает меню при изменении значения пропа
  useEffect(() => {

      const fetchData = async () =>{
        if(number != null){
    const result:[any] = await invoke('get_fast_realization', { number });
    const fastRealization: FastRealization | null = result[0].data;
    console.log(fastRealization)
    handlePanelOpen(); }
  }
  fetchData();
  }, [number]);
  
  return (
    <>
      <Paper style={panelStyle} shadow="sm" radius="xs" p="xl" className={styles.paper}>
        <img src={photo} alt='Фото'></img>
        <div className={styles.photoInfo}>
          <h3>Алексей Туманов</h3>
          <span>Отдел №11</span>
          <span>№ ППУ: {number}</span>
        </div>
        <div className={styles.mainInfo}>
          <h3>Дата составления:</h3>
        </div>
        <Button onClick={handlePanelClose} className={styles.button}>
            Закрыть
        </Button>
      </Paper>
    </>
  );
};
