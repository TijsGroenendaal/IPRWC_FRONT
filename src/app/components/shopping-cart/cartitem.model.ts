import { ProductModel } from "../../shop/product/product.model";

export class CartitemModel {
  quantity: number;
  id: string;
  productEntity: ProductModel;
}
