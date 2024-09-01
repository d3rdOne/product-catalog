import { SortOrder } from "../enums/sort"

/**
 * Represents a product information
 */
export interface Product {
  /**
   *  The unique identifier for the product
   */
  id: number,

  /**
   *  The name of the product
   */
  name: string,

  /**
   * The price of the product
   */
  price: number,

  /**
   * The description of the product
   */
  description: string,

  /**
   * The discount value of the product
   */
  discount: number
}


/**
 * Represents the product pages filter and sort
 */
export interface ProductListFilterSort {
  /**
   * Name of the product
   */
  name: string,

  /**
   * Sort by product by price
   *
   * @see {@link SortOrder}
   *
   */
  sortByPrice: SortOrder
}