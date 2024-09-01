import { TestBed, waitForAsync } from '@angular/core/testing';

import { ProductService } from './product.service';
import { provideHttpClient } from '@angular/common/http';
import {  HttpTestingController } from '@angular/common/http/testing';
import { ProductApiService } from 'src/app/services/product-api.service';
import { Product, ProductListFilterSort } from 'src/app/shared/models/product';
import { of, throwError } from 'rxjs';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { SortOrder } from 'src/app/shared/enums/sort';

describe('ProductService', () => {
  let service: ProductService;
  let apiService: ProductApiService;

  let productListMock: Product[] = [{
    id: 1,
    name: 'product 1',
    description: 'product description',
    discount: 50,
    price: 1000
  } ,
  {
    id: 2,
    name: 'product 2',
    description: 'product description',
    discount: 10,
    price: 3000
  }]

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [ provideHttpClient(), ProductService, ProductApiService, HttpTestingController]
    });
    service = TestBed.inject(ProductService);
    apiService = TestBed.inject(ProductApiService);
  }));


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProducts', () => {
    it(`should return product list mock`, () => {
      spyOn(apiService, 'fetchProducts').and.returnValue(of(productListMock))

      service.getProducts().subscribe(list => {
        expect(list).toEqual(productListMock)
      })

      service.updateSearchSortFilters({
        name: '',
        sortByPrice: SortOrder.ASC
      });
    })
    it(`should return empty array when fetchProducts is throwing an error`, () => {
      spyOn(apiService, 'fetchProducts').and.returnValue(throwError(() => new Error('mockError')))
      service.getProducts().subscribe(list => {
        expect(list).toEqual([])
      })
    })
  })

  describe('getProduct', () => {
    it(`should return a product with id given`, () => {
      spyOn(apiService, 'fetchProducts').and.returnValue(of(productListMock))

      service.getProduct(1).subscribe(data => {
        expect(data).toEqual(productListMock[0])
      })
    })
  })

  describe(`searchFilterAndSortProducts`, () => {
    it(`should return result based on name value`, () => {
      const productListFilterSortMock: ProductListFilterSort = {name: 'product 1', sortByPrice: SortOrder.ASC};

      // Based on product mock above this will only return 1 product
      let result = service.searchFilterAndSortProducts(productListMock, productListFilterSortMock)

      expect(result).toEqual([productListMock[0]]);
    })

    it(`should return array in ascending order based on discounted price`, () => {
      const productListFilterSortMock: ProductListFilterSort = {name: '', sortByPrice: SortOrder.ASC};

      // Based on product mock above this will return productListMock index order 0, 1
      let result = service.searchFilterAndSortProducts(productListMock, productListFilterSortMock)

      expect(result).toEqual([productListMock[0], productListMock[1]])
    })

    it(`should return array in descending order based on discounted price`, () => {
      const productListFilterSortMock: ProductListFilterSort = {name: '', sortByPrice: SortOrder.DESC};

      // Based on product mock above this will return productListMock index order 1, 0
      let result = service.searchFilterAndSortProducts(productListMock, productListFilterSortMock)

      expect(result).toEqual([productListMock[1], productListMock[0]])
    })
  })

  describe('updateSearchAndSortFilters', () => {
    it(`should set productListFilterSort based on given data`, () => {
      const productListFilterSortMock: ProductListFilterSort = {name: 'test product', sortByPrice: SortOrder.ASC};

      spyOn(service.productListSearchAndSort$,'next');
      service.updateSearchSortFilters(productListFilterSortMock);

      expect(service.productListSearchAndSort$.next).toHaveBeenCalled();
      expect(service.productListFilterSort).toEqual(productListFilterSortMock);
    })
  })

});
