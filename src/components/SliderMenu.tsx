import { Button, Paper } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import styles from '../styles/styles.module.css';
import { invoke } from '@tauri-apps/api/tauri';

interface SliderMenuProps {
  number: number | null;
  onNumPpuChange: (numPpu: number | null) => void;
}

interface FastRealization {
  id: number;
  author: string;
  numppu: number;
  problem: string;
  proposal: string;
  photo: string | null;
  department: number;
}

export default function SliderMenu({ number, onNumPpuChange }: SliderMenuProps) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [fastRealization, setFastRealization] = useState<FastRealization | null>(null);

  const handlePanelOpen = () => {
    setIsPanelOpen(true);
  };

  const handlePanelClose = () => {
    onNumPpuChange(null);
    setIsPanelOpen(false);
    setFastRealization(null); // Reset the state when the panel is closed
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

  useEffect(() => {
    const fetchData = async () => {
      if (number !== null) {
        try {
          const result = await invoke('get_sidebar', { id: number });
          const data: FastRealization = result as FastRealization;
          setFastRealization(data);
          handlePanelOpen();
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      }
    };
    fetchData();
  }, [number]);

  const getPhotoSrc = (photo: string | null) => {
    if (photo) {
      return `data:image/jpeg;base64,${photo}`;
    }
    return 'defaultPhoto';
  };

  return (
    <>
      <Paper style={panelStyle} shadow="sm" radius="xs" p="xl" className={styles.paper}>
        {fastRealization && (
          <>
            <img src={getPhotoSrc(fastRealization.photo)} alt="Фото" />
            <div className={styles.photoInfo}>
              <h3>{fastRealization.author}</h3>
              <span>Отдел №{fastRealization.department}</span>
              <span>№ ППУ: {fastRealization.numppu}</span>
            </div>
            <div className={styles.mainInfo}>
              <h3>Проблема:</h3>
              <p>{fastRealization.problem}</p>
              <h3>Предложение:</h3>
              <p>{fastRealization.proposal}</p>
            </div>
          </>
        )}
        <Button onClick={handlePanelClose} className={styles.button}>
          Закрыть
        </Button>
      </Paper>
    </>
  );
}
