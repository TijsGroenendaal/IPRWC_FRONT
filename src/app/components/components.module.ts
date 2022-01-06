import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagedListComponent } from './paged-list/paged-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { NgxPaginationModule } from "ngx-pagination";



@NgModule({
  declarations: [
    PagedListComponent,
    ShoppingCartComponent,
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [],
  exports: [
    PagedListComponent,
  ]
})
export class ComponentsModule { }
