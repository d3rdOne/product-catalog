import { SortOrder } from "../enums/sort"

export interface Product {
  id: number,
  name: string,
  price: number,
  description: string,
  discount: number
}


export interface ProductListFilterSort {
  name: string,
  sortByPrice: SortOrder
}