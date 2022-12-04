import { Board, ColumsFromBackendProps, ItemsFromBackendProps } from './types';

export const boards: Board[] = [
  {
    id: '1',
    name: 'Название Доски',
    users: [],
    rootUser: '',
  },
  {
    id: '2',
    name: 'Название Доски',
    users: [],
    rootUser: '',
  },
  {
    id: '3',
    name: 'Название Доски',
    users: [],
    rootUser: '',
  },
  {
    id: '4',
    name: 'Название Доски',
    users: [],
    rootUser: '',
  },
  {
    id: '5',
    name: 'Название Доски',
    users: [],
    rootUser: '',
  },
  {
    id: '6',
    name: 'Название Доски',
    users: [],
    rootUser: '',
  },
  {
    id: '7',
    name: 'Название Доски',
    users: [],
    rootUser: '',
  },
];

export const itemsFromBackend: ItemsFromBackendProps[] = [
  {
    id: 1,
    columnId: 7,
    content: 'First task',
  },
  {
    id: 2,
    columnId: 7,
    content: 'Second task',
  },
];

export const itemsTwoFromBackend: ItemsFromBackendProps[] = [
  {
    id: 3,
    columnId: 7,
    content: 'Three task',
  },
  {
    id: 4,
    columnId: 7,
    content: 'Four task',
  },
];

export const itemsThreeFromBackend: ItemsFromBackendProps[] = [
  {
    id: 5,
    columnId: 7,
    content: 'Five task',
  },
  {
    id: 6,
    columnId: 7,
    content: 'Six task',
  },
];

export const columsFromBackend: ColumsFromBackendProps[] = [
  {
    id: 7,
    boardId: 1,
    name: 'Todo',
    items: itemsFromBackend,
  },
  {
    id: 8,
    boardId: 1,
    name: 'In progress',
    items: itemsTwoFromBackend,
  },
  {
    id: 9,
    name: 'Ready',
    boardId: 1,
    items: itemsThreeFromBackend,
  },
];
