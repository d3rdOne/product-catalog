import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsPageRoutingModule } from './products-routing.module';

import { ProductsPage } from './products.page';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductCardComponent } from 'src/app/shared/components/product-card/product-card.component';
import { ProductService } from './services/product.service';
import { ProductIdResolver } from './product.resolver';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsPageRoutingModule,
    ProductCardComponent,
    CurrencyPipe
  ],
  declarations: [ProductsPage, ProductListComponent, ProductDetailsComponent],
  providers: [ProductService, ProductIdResolver]
})
export class ProductsPageModule {
  /**
   * This module contains components related to product page functionalities
   * such as displaying product list and a product details.
   */
}
