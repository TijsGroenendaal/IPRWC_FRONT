import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from "./product.model";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent {

  @Input() product: ProductModel;

  constructor(
    private productService: ProductService,
  ) {}

  public openProduct(): void {

  }
}
