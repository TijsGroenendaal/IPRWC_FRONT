import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "../login.service";
import { Router } from "@angular/router";
import { SnackbarService } from "../../components/snackbar/snackbar.service";
import { SnackbarType } from "../../components/snackbar/snackbar-type.enum";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
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
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(128)]],
      password: ['', [Validators.required, Validators.maxLength(128)]],
    });
    this.disabled = true;
    this.loginForm.statusChanges.subscribe((status) => {
      this.disabled = status != 'VALID';
    });
  }

  ngOnInit(): void {
    this.loginService.checkIfLoggedIn().subscribe({
      next: (response) => {
        this.loginService.redirectToHome(response);
      }
    })
  }

  public login(): void {
    if (!this.validate()) return;
    this.loginService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe({
        complete: () => {
          console.log("Logged in")
        },
        error: (err) => {
          console.log(err);
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

}
