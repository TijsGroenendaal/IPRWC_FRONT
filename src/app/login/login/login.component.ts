import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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
    public formBuilder: FormBuilder
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

  }

  public login(): void {

  }

}
