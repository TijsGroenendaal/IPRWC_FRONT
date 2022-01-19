import { Component } from '@angular/core';
import { StateService } from "../state.service";
import { LoginService } from "../login/login.service";
import { LoginComponent } from "../login/login.component";
import { AccountComponent } from "../account/account.component";
import { ModalService } from "../modal/modal.service";
import { ShoppingCartComponent } from "../shopping-cart/shopping-cart.component";
import {UserModel} from "../login/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  public user: UserModel;

  constructor(
    private stateService: StateService,
    private loginService: LoginService,
    private modalLoginService: ModalService<LoginComponent>,
    private modalAccountService: ModalService<AccountComponent>,
    private modalCartService: ModalService<ShoppingCartComponent>,
  ) {
    this.user = this.stateService.getUser();
    this.stateService.observable.subscribe({
      next: (user) => {
        this.user = user;
      }
    });
  }

  openAccount() {
    this.loginService.checkIfLoggedIn().subscribe({
      next: (response) => {
        this.modalAccountService.open(AccountComponent);
      },
      error: () => {
        this.stateService.deleteUser();
        this.modalLoginService.open(LoginComponent);
      }
    });
  }

  openCart() {
    this.modalCartService.open(ShoppingCartComponent);
  }
}
