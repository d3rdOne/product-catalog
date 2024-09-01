import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { Product, ProductListFilterSort } from '../../../shared/models/product';
import { SortOrder } from '../../../shared/enums/sort';
import { ProductApiService } from 'src/app/services/product-api.service';

@Injectable()
export class ProductService {

  productListFilterSort: ProductListFilterSort = {
    name: '',
    sortByPrice: SortOrder.ASC
  }
  productListSearchAndSort$ = new BehaviorSubject<ProductListFilterSort>(this.productListFilterSort);
  productList: Product[] = [];

  constructor(private productApiService: ProductApiService) { }

  /**
   * Fetches product list from API when productListSearchAndSort$ is emitting a value
   * @returns Observable instance of product list
   */
  getProducts(): Observable<Product[]> {
    return this.productListSearchAndSort$.asObservable().pipe(
      switchMap(filter =>
        this.productApiService.fetchProducts().pipe(
          map(data => this.searchFilterAndSortProducts(data, filter)),
          catchError(() => of([])
        ))
      )
    )
  }

  /**
   * Fetches products from APis
   * @param id
   * @returns Product
   * @throws Error when no product is found
   */
  getProduct(id: number): Observable<Product>  {
    return this.productApiService.fetchProducts().pipe(
      // Return product if found,
      // Throws error if not found
      map(products => {
        let product = products.find(product => product.id == id)!
        if(product === undefined)
        {
          throw new Error('Data is undefined')
        } return product;
      }),
    )
  }

  /**
   * Filters and sort data based on provided parameters
   *
   * @param  productList  List of products
   * @param filter
   * @returns list of product with applied filters and sorting
   */
  searchFilterAndSortProducts(productList: Product[], filter: ProductListFilterSort): Product[] {

    // Filters data based on name value, if name is not an empty string
    return productList.filter(item => {
      return filter.name !== '' ? item.name.includes(filter.name): item;
    })
    // Sort data based on provided sortByPrice
    // The data will be sorted based on the final price after deducted by the discount rate
    .sort((a, b) => {
      let aDiscountedPrice = a.discount > 0 ? a.price - (a.price * (a.discount / 100)) : a.price;
      let bDiscountedPrice = b.discount > 0 ? b.price - (b.price * (a.discount / 100)) : b.price;
      if(filter.sortByPrice === SortOrder.ASC) {
        return aDiscountedPrice - bDiscountedPrice;
      }
      return bDiscountedPrice - aDiscountedPrice;
    })
  }

  /**
   * Updates the productFilterSort object and emit a value by triggering productListSearchAndSort$
   * @param updatedFilters
   */
  updateSearchSortFilters(updatedFilters: ProductListFilterSort)  {
    this.productListFilterSort = {...updatedFilters};
    this.productListSearchAndSort$.next(this.productListFilterSort);
  }


}
