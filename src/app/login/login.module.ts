import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./login/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginService } from "./login.service";
import { ComponentsModule } from "../components/components.module";



@NgModule({
  declarations: [ LoginComponent ],
  imports: [ CommonModule, ReactiveFormsModule, ComponentsModule ],
  providers: [ LoginService ],
  bootstrap: [],
  exports: [ LoginComponent ],
})
export class LoginModule { }
