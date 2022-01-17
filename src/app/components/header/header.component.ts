import { Component } from '@angular/core';
import { StateService } from "../state.service";
import { LoginService } from "../login/login.service";
import { LoginComponent } from "../login/login.component";
import { AccountComponent } from "../account/account.component";
import { ModalService } from "../modal/modal.service";

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

  }
}
