import { Component, ViewChild } from '@angular/core';
import { PassableInterface } from "../modal/passable.interface";
import { ModalComponent } from "../modal/modal.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SnackbarType } from "../snackbar/snackbar-type.enum";
import { LoginService } from "../login/login.service";
import { SnackbarService } from "../snackbar/snackbar.service";
import { ModalService } from "../modal/modal.service";
import { LoginComponent } from "../login/login.component";
import { StateService } from "../state.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent extends PassableInterface<any> {
  @ViewChild('modalComponent')
  modal: ModalComponent<SigninComponent>;

  @ViewChild('username') usernameInputField: HTMLInputElement;
  @ViewChild('password') passwordInputField: HTMLInputElement;

  public signupForm: FormGroup;
  public disabled: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snackbarService: SnackbarService,
    private modalService: ModalService<LoginComponent>,
    private stateService: StateService,
  ) {
    super();
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(32)]],
      password: ['', [Validators.required, Validators.maxLength(32)]],
    });
    this.disabled = true;
    this.signupForm.statusChanges.subscribe((status) =>
      this.disabled = status != 'VALID');
  }

  public signup(): void {
    if (!this.validate()) return;
    this.loginService.signup(this.signupForm.value.username, this.signupForm.value.password)
      .subscribe({
        error: (err) => {
          this.snackbarService.show(err['error']['message'], SnackbarType.DANGER);
        },
        next: (data) => {
          this.snackbarService.show("Signup Success", SnackbarType.SUCCESS);
          this.stateService.setUser(data);
          this.close();
        }
      })
  }

  public validate(): boolean {
    if (this.signupForm.valid) return true;
    this.snackbarService.show('Validation Error', SnackbarType.DANGER);
    return false;
  }

  public login(): void {
    this.close();
    this.modalService.open(LoginComponent);
  }

  async close(): Promise<void> {
    await this.modal?.close();
  }

}
