import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagedListComponent } from './paged-list/paged-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { NgxPaginationModule } from "ngx-pagination";
import { HttpClientModule } from "@angular/common/http";
import { SnackbarComponent } from "./snackbar/snackbar.component";
import { HeaderComponent } from './header/header.component';
import { ModalComponent } from "./modal/modal.component";
import { AccountComponent } from './account/account.component';



@NgModule({
  declarations: [
    PagedListComponent,
    ShoppingCartComponent,
    SnackbarComponent,
    HeaderComponent,
    ModalComponent,
    AccountComponent,
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [],
  exports: [
      PagedListComponent,
      SnackbarComponent,
      HeaderComponent,
      ModalComponent
  ]
})
export class ComponentsModule { }
