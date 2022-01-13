import {AfterContentChecked, AfterViewChecked, AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ProductModel} from "./product.model";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements AfterContentChecked {
  public available: boolean;
  @Input() product: ProductModel;

  constructor(
    private productService: ProductService,
  ) {}

  public openProduct(): void {

  }

  ngAfterContentChecked(): void {
    this.available = this.product.quantity > 0
  }
}
