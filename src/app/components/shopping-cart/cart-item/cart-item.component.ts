import { Component, Input } from '@angular/core';
import { CartitemModel } from "../cartitem.model";
import { SnackbarType } from "../../snackbar/snackbar-type.enum";
import { SnackbarService } from "../../snackbar/snackbar.service";
import { CartService } from "../cart.service";
import { Subject } from "rxjs";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent {
  @Input() item: CartitemModel;
  @Input() observer: Subject<string>;

  public quantity: number;

  constructor(
    private snackbarService: SnackbarService,
    private cartService: CartService
  ) {}

  deleteCartItem(id: string): void {
    this.cartService.deleteCartItem(id).subscribe({
      next: value => {
        this.snackbarService.show('Item Deleted', SnackbarType.SUCCESS);
        this.observer.next("");
      },
    });
  }

  updateItem(): void {
    this.cartService.updateCartItem(this.item).subscribe({
      next: value => {
        this.snackbarService.show('Item Updated', SnackbarType.SUCCESS);
        this.observer.next("");
      },
    });
  }

  quantityChangeHandler(event: string) {
    const newQuantity = parseInt(event);

    if (!isNaN(newQuantity)) {
      this.item.quantity = newQuantity;
    } else {
      this.snackbarService.show("Input Is Not a Number", SnackbarType.DANGER);
    }
  }
}
