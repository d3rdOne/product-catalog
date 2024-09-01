import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../shared/models/product';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  private apiUrl = environment.API_BASE_URL;
  constructor(private httpClient: HttpClient) {}

  /**
   * Fetches product mocked values
   * @returns Product list
   */
  fetchProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiUrl}/assets/product-data.json`)
  }

}
