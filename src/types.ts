export interface Task {
  id: string
  content: string
  columnId: string
}

export interface Column {
  id: string
  customId: string
  name: string
  boardId: string
  tasks: Task[]
}

export interface Board {
  id: string,
  name: string,
  users: string[],
  rootUser: string,
  columns: Column[]
}

export interface User {
  id: string,
  lastName: string,
  firstName: string,
  email: string
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
