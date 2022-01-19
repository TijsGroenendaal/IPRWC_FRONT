import { AfterContentChecked, Component, Input } from '@angular/core';
import { ProductModel } from "./product.model";
import { ProductService } from "../product.service";
import { CartService } from "../../components/shopping-cart/cart.service";
import { CartitemModel } from "../../components/shopping-cart/cartitem.model";
import { SnackbarType } from "../../components/snackbar/snackbar-type.enum";
import { SnackbarService } from "../../components/snackbar/snackbar.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements AfterContentChecked {
  public available: boolean;
  @Input() product: ProductModel;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private snackbarService: SnackbarService,
  ) {}

  public orderProduct(): void {
    this.cartService.addCartItem(this.product, 1).subscribe({
      error: err => this.snackbarService.show(err['error']['message'], SnackbarType.DANGER),
      next: value => this.snackbarService.show("Product Added To Cart", SnackbarType.SUCCESS),
    });
  }

  ngAfterContentChecked(): void {
    this.available = this.product?.quantity > 0;
  }
}
