import { Component, Input, OnInit } from '@angular/core';
import { IonCard, IonicModule } from '@ionic/angular';
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

  @Input()
  product!: Product;

  constructor() { }

}
