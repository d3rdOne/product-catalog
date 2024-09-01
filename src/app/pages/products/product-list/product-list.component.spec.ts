import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductListComponent } from './product-list.component';
import { provideHttpClient } from '@angular/common/http';
import {  provideRouter } from '@angular/router';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { SortOrder } from 'src/app/shared/enums/sort';
import { ProductService } from '../services/product.service';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      imports: [IonicModule.forRoot(), BrowserDynamicTestingModule],
      providers: [provideRouter([]), provideHttpClient(), ProductService]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on component initialization', () => {
    it(`should populate initial values, searchValue, priceSort`, () => {
      expect(component.searchValue).toBe(''),
      expect(component.priceSort).toBe(SortOrder.ASC)

      component.productList$.subscribe(data =>
        expect(data.length).toBe(7)
      )
    })
  })

  describe('on search input', () => {
    it(`should update search filters on product service `, () => {
      let mockEvent = {
        target: {
          value: 'product 1'
        }
      } as unknown as Event;

      spyOn(component['productService'], 'updateSearchSortFilters').and.callThrough();
      component.onSearchInput(mockEvent);

      expect(component['productService'].updateSearchSortFilters).toHaveBeenCalled();
      expect(component['productService'].productListFilterSort.name).toBe('product 1')
      expect(component['productService'].productListFilterSort.sortByPrice).toBe(SortOrder.ASC)
    })
  })

  describe('on sort value changed', () => {
    it(`should update search filters on product service `, () => {
      let mockEvent = {
        target: {
          value: SortOrder.DESC
        }
      } as unknown as Event;

      spyOn(component['productService'], 'updateSearchSortFilters').and.callThrough();
      component.onSortChange(mockEvent);

      expect(component['productService'].updateSearchSortFilters).toHaveBeenCalled();
      expect(component['productService'].productListFilterSort.name).toBe('')
      expect(component['productService'].productListFilterSort.sortByPrice).toBe(SortOrder.DESC)
    })
  })

  describe(`applySearchAndSort function`, () => {
    it(`should populate productService productListFilterSort values`, () => {
      component.searchValue = 'product test',
      component.priceSort = SortOrder.DESC

      component.applySearchAndSort();

      expect(component['productService'].productListFilterSort).toEqual({
        name: 'product test',
        sortByPrice: SortOrder.DESC
      } )
    })
  })

  describe('navigate to details', () => {
    it(`should call router navigate function`, () => {
      spyOn(component['router'], 'navigate');

      component.navigateToDetails(1);
      expect(component['router']['navigate']).toHaveBeenCalledWith(['/products', 1], {relativeTo: component['activatedRoute']})


      component.navigateToDetails(4);
      expect(component['router']['navigate']).toHaveBeenCalledWith(['/products', 4], {relativeTo: component['activatedRoute']})
    })
  })
});
