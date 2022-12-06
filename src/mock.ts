import {
  Board, Column, Task, User,
} from './types';

export const usersMock: User[] = [
  {
    id: '1',
    name: 'Dima',
  },
  {
    id: '2',
    name: 'Misha',
  },
  {
    id: '3',
    name: 'Stas',
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

export const itemsFromBackendMock: Task[] = [
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

export const itemsTwoFromBackendMock: Task[] = [
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

export const itemsThreeFromBackendMock: Task[] = [
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

export const columsFromBackendMock: Column[] = [
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
