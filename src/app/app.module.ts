import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from "./login/login.module";
import { ShopModule } from "./shop/shop.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./components/auth.interceptor";
import { ConsoleModule } from "./console/console.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    LoginModule,
    ShopModule,
    ConsoleModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
