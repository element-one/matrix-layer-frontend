export type StringObject = {
  [key: string]: string
}

export interface MenuItem {
  title: string
  pages: {
    id: string
    path: string
  }
}

export type Pagination = {
  currentPage: number
  pageCount: number
}
