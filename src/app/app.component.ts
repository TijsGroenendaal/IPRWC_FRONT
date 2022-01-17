import { Component } from '@angular/core';
import { LoginService } from "./components/login/login.service";
import { StateService } from "./components/state.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'IPRWC-FRONT';

  constructor(private loginService: LoginService, private stateService: StateService) {
    this.loginService.checkIfLoggedIn().subscribe({
      next: (response) => {
        this.loginService.redirectToHome(response);
      },
      error: err => {
        this.stateService.deleteUser();
      }
    });
  }
}
