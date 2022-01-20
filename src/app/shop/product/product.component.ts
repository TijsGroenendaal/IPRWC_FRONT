import { AfterContentChecked, Component, Input } from '@angular/core';
import { ProductModel } from "./product.model";
import { ProductService } from "../product.service";
import { CartService } from "../../components/shopping-cart/cart.service";
import { SnackbarType } from "../../components/snackbar/snackbar-type.enum";
import { SnackbarService } from "../../components/snackbar/snackbar.service";
import { StateService } from "../../components/state.service";
import { UserModel } from "../../components/login/user.model";
import { ModalService } from "../../components/modal/modal.service";
import { AddProductModalComponent } from "../../components/add-product-modal/add-product-modal.component";

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
    private modalProductAddService: ModalService<AddProductModalComponent>,
  ) {
    this.user = this.stateService.getUser();
    this.stateService.observable.subscribe({
      next: (user) => {
        this.user = user;
      }
    })
  }

  public handleProductClick(): void {
    if (this.stateService.getUser().role == 'ADMIN') {
      this.editProduct();
    } else {
      this.orderProduct();
    }
  }

  public editProduct(): void {
    this.modalProductAddService.open<ProductModel>(AddProductModalComponent, this.product);
  }

  public orderProduct(): void {
    this.cartService.addCartItem(this.product, 1).subscribe({
      next: value => this.snackbarService.show("Product Added To Cart", SnackbarType.SUCCESS),
    });
  }

  ngAfterContentChecked(): void {
    this.available = this.product?.quantity > 0;
  }
}
