import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Product } from '../../models/product';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, CurrencyPipe]
})
export class ProductCardComponent  {
  /**
   * Product data to be displayed in the card
   * @type {Product}
   * @see {@link Product}
   */
  @Input()
  product!: Product;

}
