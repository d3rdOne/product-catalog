import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { Product, ProductListFilterSort } from '../shared/models/product';
import { SortOrder } from '../shared/enums/sort';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productListFilterSort: ProductListFilterSort = {
    name: '',
    sortByPrice: SortOrder.ASC
  }

  productListSearchAndSort$ = new BehaviorSubject<ProductListFilterSort>(this.productListFilterSort);

  productList: Product[] = [];

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.productListSearchAndSort$.asObservable().pipe(
      switchMap(filter =>
        this.httpClient.get<Product[]>('/assets/product-data.json').pipe(
          map(data => this.applySearchFilter(data, filter)),
          catchError(() => of([])
        ))
      )
    )
  }

  getProduct(id: number): Observable<Product>  {
    return this.httpClient.get<Product[]>(`assets/product-data.json`).pipe(
      map(product => product.find(product => product.id == id)!),
      catchError(() => of())
    )
  }

  applySearchFilter(data: Product[], filter: ProductListFilterSort): Product[] {
    if(!filter) {
      return data
    }
    return data.filter(item => {
      return filter.name !== '' ? item.name.includes(filter.name): item;
    })
    .sort((a, b) => {
      let aFinalPrice = a.discount > 0 ? (a.price * (a.discount / 100)) : a.price;
      let bFinalPrice = b.discount > 0 ? (b.price * (a.discount / 100)) : b.price;
      if(filter.sortByPrice === SortOrder.ASC) {
        return aFinalPrice - bFinalPrice;
      }
      return bFinalPrice - aFinalPrice;
    })
  }

  updateSearchFilters(updatedFilters: ProductListFilterSort)  {
    this.productListFilterSort = {...updatedFilters};
    this.productListSearchAndSort$.next(this.productListFilterSort);
  }


}
