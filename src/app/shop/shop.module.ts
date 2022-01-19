import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop/shop.component';
import { ComponentsModule } from "../components/components.module";
import { ProductComponent } from './product/product.component';



@NgModule({
    declarations: [
        ShopComponent,
        ProductComponent,
    ],
    exports: [
        ProductComponent
    ],
    imports: [
        ComponentsModule,
        CommonModule,
    ]
})
export class ShopModule { }
