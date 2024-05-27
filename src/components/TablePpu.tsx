import React, { useState } from 'react';
import styles from '../styles/TableSort.module.css'
//import SliderMenu from './SliderMenu';
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import classes from '../styles/TableSort.module.css';
//import { invoke } from "@tauri-apps/api/tauri";

/*

Нужно сделать так, чтобы боковое меню появлялось при нажатии на запись в таблице 
и + к этому выводило бы ppu записи на которую было нажатие. 

То что сейчас записи при наведении выделяются красным это просто тест, потом надо будет убрать.

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

interface RowData {
  ppu: number;
  date: string;
  author: string;
  object: string;
  type: string;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toString().toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return payload.reversed ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return payload.reversed ? bValue - aValue : aValue - bValue;
      }

      return 0;
    }),
    payload.search
  );
}

const data: RowData[] = [
  {
    ppu: 1,
    date: '2024-05-23',
    author: 'Алексей Туманов',
    object: 'Обновление системы',
    type: 'ПО',
  },
  {
    ppu: 2,
    date: '2024-05-24',
    author: 'Автор Тест',
    object: 'Тест',
    type: 'Тип',
  },
  {
    ppu: 3,
    date: '2024-05-25',
    author: 'Антон Кузнецов',
    object: 'Письмо',
    type: 'Типо',
  }
];

export function TableSort() {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = sortedData.map((row) => (
    /*<Table.Tr key={row.ppu} className = {classes.entry} onClick={() => console.log(row.ppu)}>*/
    <Table.Tr key={row.ppu} className={classes.entry} onClick={() => document.getElementById('open-panel-button').click()} >
      <Table.Td>{row.ppu}</Table.Td>
      <Table.Td>{row.date}</Table.Td>
      <Table.Td>{row.author}</Table.Td>
      <Table.Td>{row.object}</Table.Td>
      <Table.Td>{row.type}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      <TextInput className={styles.searchField}
        placeholder="Search by any field"
        mb="md"
        leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed" className={styles.tableField}>
        <Table.Tbody>
          <Table.Tr>
            <Th
              sorted={sortBy === 'ppu'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('ppu')}
            >
              №ППУ
            </Th>
            <Th
              sorted={sortBy === 'date'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('date')}
            >
              Дата составления
            </Th>
            <Th
              sorted={sortBy === 'author'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('author')}
            >
              Автор ППУ
            </Th>
            <Th
              sorted={sortBy === 'object'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('object')}
            >
              Объект улучшения
            </Th>
            <Th
              sorted={sortBy === 'type'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('type')}
            >
              Тип ППУ
            </Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={Object.keys(data[0]).length}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
