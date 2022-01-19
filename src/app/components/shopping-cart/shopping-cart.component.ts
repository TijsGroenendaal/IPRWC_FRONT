import { Component, ViewChild } from '@angular/core';
import { PassableInterface } from "../modal/passable.interface";
import { CartService } from "./cart.service";
import { SnackbarService } from "../snackbar/snackbar.service";
import { SnackbarType } from "../snackbar/snackbar-type.enum";
import { CartitemModel } from "./cartitem.model";
import { ModalComponent } from "../modal/modal.component";
import { Subject } from "rxjs";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
})
export class ShoppingCartComponent extends PassableInterface<any> {
  @ViewChild('modalComponent')
  modal: ModalComponent<ShoppingCartComponent>;

  public observer: Subject<string> = new Subject<string>();

  public cartItems: CartitemModel[];

  constructor(
    private cartService: CartService,
    private snackbarService: SnackbarService,
  ) {
    super();
    this.getAll();
    this.observer.subscribe(() => {
      this.getAll();
    })
  }

  getAll(): void {
    this.cartService.getAllCartItems().subscribe({
      error: err => {
        this.snackbarService.show(err['error']['message'], SnackbarType.DANGER);
        this.close();
      },
      next: value => {
        this.cartItems = value
      },
    });
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe({
      error: err => this.snackbarService.show(err['error']['message'], SnackbarType.DANGER),
      next: value => {
        this.snackbarService.show("Cart Cleared", SnackbarType.SUCCESS);
        this.getAll();
      },
    });
  }

  async close(): Promise<void> {
    await this.modal?.close();
  }
}
