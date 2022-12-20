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
