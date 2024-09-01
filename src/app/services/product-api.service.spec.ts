import { TestBed } from '@angular/core/testing';

import { ProductApiService } from './product-api.service';
import { provideHttpClient } from '@angular/common/http';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('ProductApiService', () => {
  let service: ProductApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), ProductApiService]
    });
    service = TestBed.inject(ProductApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should call http client get function with parameters '/assets/product-data.json'`, () => {
    spyOn(service['httpClient'], 'get');

    service.fetchProducts();
    expect(service['httpClient']['get']).toHaveBeenCalled();
  })
});
