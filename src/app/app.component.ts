import { Component } from '@angular/core';
import { LoginService } from "./components/login/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'IPRWC-FRONT';

  constructor(private loginService: LoginService) {
    this.loginService.checkIfLoggedIn().subscribe({
      next: (response) => {
        this.loginService.redirectToHome(response);
      }
    });
  }
}
