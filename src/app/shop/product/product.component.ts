import { AfterContentChecked, Component, Input } from '@angular/core';
import { ProductModel } from "./product.model";
import { ProductService } from "../product.service";
import { CartService } from "../../components/shopping-cart/cart.service";
import { SnackbarType } from "../../components/snackbar/snackbar-type.enum";
import { SnackbarService } from "../../components/snackbar/snackbar.service";
import { StateService } from "../../components/state.service";
import { UserModel } from "../../components/login/user.model";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements AfterContentChecked {
  public available: boolean;
  @Input() product: ProductModel;
  public user: UserModel;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private snackbarService: SnackbarService,
    private stateService: StateService,
  ) {
    this.user = this.stateService.getUser();
    this.stateService.observable.subscribe({
      next: (user) => {
        this.user = user;
      }
    })
  }

  public handleProductClick(): void {
    if (this.stateService.getUser().role == 'CUSTOMER') {
      this.orderProduct();
    } else {
      this.editProduct();
    }
  }

  public editProduct(): void {

  }

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
