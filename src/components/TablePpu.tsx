import React, { useState } from 'react';
import styles from '../styles/TableSort.module.css'
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

import { invoke } from "@tauri-apps/api/tauri";

interface RowData {
  numppu: number;
  date: string;
  author: string;
  object: string;
  typeppu: string;
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

//Получение данных из базы данных
const data: RowData[] = await invoke('get_table', {});

interface TableSortProps {
  onNumPpuChange: (numPpu: number) => void;
}

export function TableSort({ onNumPpuChange }:TableSortProps) {
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

    <Table.Tr key={row.numppu} className={classes.entry} onClick={() => onNumPpuChange(row.numppu)} >
      <Table.Td>{row.numppu}</Table.Td>
      <Table.Td>{row.date}</Table.Td>
      <Table.Td>{row.author}</Table.Td>
      <Table.Td>{row.object}</Table.Td>
      <Table.Td>{row.typeppu}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      <TextInput className={styles.searchField}
        placeholder="Поиск по всем полям"
        mb="md"
        leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table horizontalSpacing="md" verticalSpacing="xs" layout="fixed" className={styles.tableField} stickyHeader striped withTableBorder withColumnBorders>
        <Table.Tbody>
          <Table.Tr>
            <Th
              sorted={sortBy === 'numppu'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('numppu')}
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
              sorted={sortBy === 'typeppu'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('typeppu')}
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
                  Ничего не найдено
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
