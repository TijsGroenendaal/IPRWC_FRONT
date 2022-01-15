import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopModule } from "./shop/shop.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./components/auth.interceptor";
import { ConsoleModule } from "./console/console.module";
import { ComponentsModule } from "./components/components.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ShopModule,
    ConsoleModule,
    BrowserModule,
    AppRoutingModule,
    ComponentsModule
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
