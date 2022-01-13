import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./login/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginService } from "./login.service";



@NgModule({
  declarations: [ LoginComponent ],
  imports: [ CommonModule, ReactiveFormsModule ],
  providers: [ LoginService ],
  bootstrap: [],
  exports: [ LoginComponent ],
})
export class LoginModule { }
