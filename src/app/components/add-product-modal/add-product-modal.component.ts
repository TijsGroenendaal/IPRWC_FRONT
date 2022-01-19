import { Component, OnInit, ViewChild } from '@angular/core';
import { PassableInterface } from "../modal/passable.interface";
import { ProductModel } from "../../shop/product/product.model";
import { ModalComponent } from "../modal/modal.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductService } from "../../shop/product.service";
import { SnackbarType } from "../snackbar/snackbar-type.enum";
import { SnackbarService } from "../snackbar/snackbar.service";

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
})
export class AddProductModalComponent extends PassableInterface<ProductModel> implements OnInit {
  @ViewChild('modalComponent')
  modal: ModalComponent<AddProductModalComponent>;

  public brand: string;
  public description: string;
  public price: number;
  public imageUrl: string;
  public quantity: number
  public name: string;

  public addProductForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private snackbarService: SnackbarService,
  ) {
    super();
    this.addProductForm = this.fb.group({
      brand:        ['', [Validators.required, Validators.maxLength(256)]],
      description:  ['', [Validators.required, Validators.maxLength(256)]],
      price:        ['', [Validators.required, Validators.max(1000)]],
      imageUrl:     ['', [Validators.required, Validators.max(256)]],
      quantity:     ['', [Validators.required, Validators.max(1000)]],
      name:         ['', [Validators.required, Validators.maxLength(256)]],
    })
  }

  ngOnInit() {
    if (this.object) {
      this.name = this.object.name;
      this.brand = this.object.brand;
      this.price = this.object.price;
      this.imageUrl = this.object.imageUrl;
      this.quantity = this.object.quantity;
      this.description = this.object.description;
    }
  }

  public handleButton(): void {
    const product: ProductModel = new ProductModel(
      this.object ? this.object.id : "",
      this.name, this.quantity,
      this.price, this.description,
      this.imageUrl, this.brand);

    if (this.object) {
      this.updateProduct(product);
    } else {
      this.createProduct(product);
    }
  }

  public updateProduct(product: ProductModel) {
    this.productService.updateProduct(product).subscribe({
      error: (err) => this.snackbarService.show(err['error']['message'], SnackbarType.DANGER),
      next: (data) => {
        this.snackbarService.show("Product Updated", SnackbarType.SUCCESS);
        this.productService.observable.next("");
        this.close();
      }
    })
  }

  public createProduct(product: ProductModel) {
    this.productService.createProduct(product).subscribe({
      error: (err) => this.snackbarService.show(err['error']['message'], SnackbarType.DANGER),
      next: (data) => {
        this.snackbarService.show("Product Created", SnackbarType.SUCCESS);
        this.productService.observable.next("");
        this.close();
      }
    })
  }

  async close(): Promise<void> {
    this.modal?.close();
  }

}
