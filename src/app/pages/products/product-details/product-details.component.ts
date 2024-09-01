import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent  implements OnInit {

  product!: Product;
  constructor(private activatedRoute: ActivatedRoute, public router: Router) { }

  /**
   * Get the product data from the route object
   */
  ngOnInit() {
    this.product = this.activatedRoute.snapshot.data['product'];
  }

}
