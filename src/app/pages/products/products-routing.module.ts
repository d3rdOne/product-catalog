import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsPage } from './products.page';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductIdResolver } from './product.resolver';


const routes: Routes = [
  {
    path: '',
    component: ProductsPage,
    children: [
      {
        path:'list',
        component: ProductListComponent,
        title: 'Product Catalog | List'
      },
      {
        path: ':id',
        resolve: {
          product: ProductIdResolver
        },
        component: ProductDetailsComponent,
         title: 'Product Catalog | Product'
      },
      {
        path:'**',
        pathMatch: 'full',
        redirectTo: 'list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsPageRoutingModule {}
