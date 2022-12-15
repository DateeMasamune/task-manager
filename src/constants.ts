import { AUTH_FIELDS_PROPS } from './types';

export const routes = {
  MAIN: '/',
  AllBOARDS: '/AllBoards',
  REGISTRATION: '/registration',
  LOGIN: '/login',
};

export const menuList = [
  {
    id: 1,
    description: 'Все доски',
    link: routes.MAIN,
  },
  {
    id: 2,
    description: 'Создать доску',
    link: null,
  },
  {
    id: 3,
    description: 'Создать колонку',
    link: null,
  },
  {
    id: 4,
    description: 'Создать задачу',
    link: null,
  },
  {
    id: 5,
    description: 'Пригласить пользователя к доске',
    link: null,
  },
  {
    id: 6,
    description: 'Уйти',
    link: null,
  },
];

export const AUTH_FIELDS: AUTH_FIELDS_PROPS = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  PASSWORD: 'password',
  EMAIL: 'email',
};

export const AUTH_VALIDATIONS = {
  USERNAME_MAX_LENGTH: 30,
  USERNAME_MIN_LENGTH: 2,
  PASSWORD_MAX_LENGTH: 30,
  PASSWORD_MIN_LENGTH: 6,
};
