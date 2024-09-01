import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { catchError, Observable, of, take } from "rxjs";
import { ProductService } from "./services/product.service";


@Injectable()
export class ProductIdResolver implements Resolve<any> {

  constructor(private productService: ProductService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.paramMap.get('id');
    return this.productService.getProduct(+id!).pipe(take(1) ,catchError((error) => {
       // TODO : Show message toast

      // Navigate back to products
      this.router.navigate(['/products'])
      return of(null);
    }));
  }
}