import {
  Board, ColumsFromBackendProps, ItemsFromBackendProps, Users,
} from './types';

export const usersMock: Users[] = [
  {
    id: '1',
    label: 'Dima',
  },
  {
    id: '2',
    label: 'Misha',
  },
  {
    id: '3',
    label: 'Stas',
  },
];

export const boardsMock: Board[] = [
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

export const itemsFromBackendMock: ItemsFromBackendProps[] = [
  {
    id: '1',
    columnId: '7',
    content: 'First task',
  },
  {
    id: '2',
    columnId: '7',
    content: 'Second task',
  },
];

export const itemsTwoFromBackendMock: ItemsFromBackendProps[] = [
  {
    id: '3',
    columnId: '7',
    content: 'Three task',
  },
  {
    id: '4',
    columnId: '7',
    content: 'Four task',
  },
];

export const itemsThreeFromBackendMock: ItemsFromBackendProps[] = [
  {
    id: '5',
    columnId: '7',
    content: 'Five task',
  },
  {
    id: '6',
    columnId: '7',
    content: 'Six task',
  },
];

export const columsFromBackendMock: ColumsFromBackendProps[] = [
  {
    id: '7',
    boardId: '1',
    name: 'Todo',
    items: itemsFromBackendMock,
  },
  {
    id: '8',
    boardId: '2',
    name: 'In progress',
    items: itemsTwoFromBackendMock,
  },
  {
    id: '9',
    name: 'Ready',
    boardId: '3',
    items: itemsThreeFromBackendMock,
  },
];
