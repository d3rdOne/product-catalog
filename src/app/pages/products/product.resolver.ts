import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { catchError, Observable, take } from "rxjs";
import { Product } from "src/app/shared/models/product";
import { ProductService } from "./services/product.service";


@Injectable()
export class ProductIdResolver implements Resolve<any> {

  constructor(private productService: ProductService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Product> {
    const id = route.paramMap.get('id');
    return this.productService.getProduct(+id!).pipe(take(1) ,catchError((error) => {
      alert('cannot open product');
      throw error;
    }));
  }
}