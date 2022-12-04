export interface Board {
  id: string,
  name: string,
  users: string[],
  rootUser: string,
}

export interface Users {
  id: number,
  label: string,
}

export interface ItemsFromBackendProps {
  id: number
  content: string
  columnId: number
}

export interface ColumsFromBackendProps {
  id: number
  boardId: number
  name: string
  items: ItemsFromBackendProps[]
}

export interface JusticeColumnsProps {
  columns: ColumsFromBackendProps[]
}
