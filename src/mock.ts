import {
  Board, Column, Task, User,
} from './types';

export const usersMock: User[] = [
  {
    id: '1',
    firstName: 'Dima',
    lastName: '',
    email: '',
  },
  {
    id: '2',
    firstName: 'Misha',
    lastName: '',
    email: '',
  },
  {
    id: '3',
    firstName: 'Stas',
    lastName: '',
    email: '',
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
    tasks: itemsFromBackendMock,
  },
  {
    id: '8',
    boardId: '2',
    name: 'In progress',
    tasks: itemsTwoFromBackendMock,
  },
  {
    id: '9',
    name: 'Ready',
    boardId: '3',
    tasks: itemsThreeFromBackendMock,
  },
];

export const boardsMock: Board[] = [
  {
    id: '1',
    name: 'Название Доски',
    users: [],
    rootUser: '',
    columns: columsFromBackendMock,
  },
];
