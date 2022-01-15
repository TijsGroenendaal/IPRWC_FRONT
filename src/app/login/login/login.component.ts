import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "../login.service";
import { Router } from "@angular/router";
import { SnackbarService } from "../../components/snackbar/snackbar.service";
import { SnackbarType } from "../../components/snackbar/snackbar-type.enum";
import { PassableInterface } from "../../components/modal/passable.interface";
import { ModalComponent } from "../../components/modal/modal.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent extends PassableInterface<any> {
  @ViewChild('modalComponent')
  modal: ModalComponent<LoginComponent>;

  @ViewChild('username') usernameInputField: HTMLInputElement;
  @ViewChild('password') passwordInputField: HTMLInputElement;

  public loginForm: FormGroup;
  public disabled: boolean;

  constructor(
    public formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private snackbarService: SnackbarService,
  ) {
    super();
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(128)]],
      password: ['', [Validators.required, Validators.maxLength(128)]],
    });
    this.disabled = true;
    this.loginForm.statusChanges.subscribe((status) => {
      this.disabled = status != 'VALID';
    });
  }

  public login(): void {
    if (!this.validate()) return;
    this.loginService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe({
        complete: () => {
          this.close();
        },
        error: (err) => {
          this.snackbarService.show(err['error']['message'], SnackbarType.DANGER)
        },
        next: (data) => {
          console.log(data)
        }
      });
  }

  public validate(): boolean {
    if (this.loginForm.valid) return true;
    this.snackbarService.show('Validation Error', SnackbarType.DANGER);
    return false;
  }

  signIn() {

  }

  async close(): Promise<void> {
    await this.modal?.close();
  }
}
