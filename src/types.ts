export interface Board {
  id: string,
  name: string,
  users: string[],
  rootUser: string,
}

export interface User {
  id: string,
  name: string,
}

export interface Task {
  id: string
  content: string
  columnId: string
}

export interface Column {
  id: string
  name: string
  boardId: string
  items: Task[]
}

export interface FrontendMappingColumn {
  [key: string]: Column[]
}

export interface AUTH_FIELDS_PROPS {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  PASSWORD: 'password',
  EMAIL: 'email',
}
