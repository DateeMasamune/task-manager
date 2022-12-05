export interface Board {
  id: string,
  name: string,
  users: string[],
  rootUser: string,
}

export interface Users {
  id: string,
  label: string,
}

export interface ItemsFromBackendProps {
  id: string
  content: string
  columnId: string
}

export interface ColumsFromBackendProps {
  id: string
  name: string
  boardId: string
  items: ItemsFromBackendProps[]
}

export interface JusticeColumnsProps {
  columns: ColumsFromBackendProps[]
}
