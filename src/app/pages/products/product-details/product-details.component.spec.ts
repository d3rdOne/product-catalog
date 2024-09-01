import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductDetailsComponent } from './product-details.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { CommonModule } from '@angular/common';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let productMock: Product = {
    id: 1,
    name: 'product 1',
    description: 'product description',
    discount: 50,
    price: 1000
  }

  let mockActivatedRouteData = {
    snapshot: {
      data : {
        product: productMock
      }
    }
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailsComponent ],
      imports: [IonicModule.forRoot(), BrowserDynamicTestingModule, CommonModule, RouterModule],
      providers: [
        {provide:  ActivatedRoute, useValue: mockActivatedRouteData}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should instantiate product value coming from route data`, () => {
    expect(component.product).toEqual(productMock);
  })
});
