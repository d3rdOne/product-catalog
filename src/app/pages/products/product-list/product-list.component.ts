import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/pages/products/services/product.service';
import { SortOrder } from 'src/app/shared/enums/sort';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent  implements OnInit {

  productList$!: Observable<Product[]>;

  searchValue!: string;
  priceSort!: SortOrder;

  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) { }

  /**
   * Initializes the search and sort value from on product service default values.
   * Initializes the product list observable from the product service
   */
  ngOnInit() {
    this.searchValue = this.productService.productListFilterSort.name;
    this.priceSort = this.productService.productListFilterSort.sortByPrice;
    this.productList$ = this.productService.getProducts();
  }

  /**
   * Handles the user's product name input
   * @param $event
   */
  onSearchInput($event: Event) {
    this.searchValue = this.getValue($event);
    this.applySearchAndSort();
  }

  /**
   * Handles the user's sort value selection
   * @param $event
   */
  onSortChange($event:Event) {
    this.priceSort = this.getValue($event) as SortOrder;
    this.applySearchAndSort();
  }

  /**
   * Updates the product service sort and filter object
   */
  applySearchAndSort() {
    this.productService.updateSearchSortFilters({
      name: this.searchValue,
      sortByPrice: this.priceSort
    })
  }

  /**
   * Handles the user click on a card and navigate
   * @param id
   */
  navigateToDetails(id: number) {
    this.router.navigate(['/products', id], {relativeTo: this.activatedRoute})
  }

  /**
   * Extracts the value from the DOM Event object
   *
   * @param event
   * @returns Value of the event target
   */
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  /**
   * Exposes SortOrder enum to the template
   */
  get SortOrder() {
    return SortOrder;
  }
 }
