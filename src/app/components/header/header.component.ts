import { Component } from '@angular/core';
import { StateService } from "../state.service";
import { LoginService } from "../login/login.service";
import { LoginComponent } from "../login/login.component";
import { AccountComponent } from "../account/account.component";
import { ModalService } from "../modal/modal.service";
import { ShoppingCartComponent } from "../shopping-cart/shopping-cart.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private stateService: StateService,
    private loginService: LoginService,
    private modalLoginService: ModalService<LoginComponent>,
    private modalAccountService: ModalService<AccountComponent>,
    private modalCartService: ModalService<ShoppingCartComponent>,
  ) { }

  openAccount() {
    this.loginService.checkIfLoggedIn().subscribe({
      next: (response) => {
        this.modalAccountService.open(AccountComponent);
      },
      error: () => {
        this.stateService.deleteUser();
        this.modalLoginService.open(LoginComponent);
      }
    })
  }

  openCart() {
    this.modalCartService.open(ShoppingCartComponent);
  }
}
