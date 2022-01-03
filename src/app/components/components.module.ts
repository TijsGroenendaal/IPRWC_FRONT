import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagedListComponent } from './paged-list/paged-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';



@NgModule({
  declarations: [
    PagedListComponent,
    ShoppingCartComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
