import { CartitemModel } from "./cartitem.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import {Injectable} from "@angular/core";
import {ProductModel} from "../../shop/product/product.model";

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {
  }

  public getAllCartItems(): Observable<CartitemModel[]> {
    return this.http.get<CartitemModel[]>(environment.apiUrl + '/cart');
  }

  public addCartItem(product: ProductModel, quantity: number): Observable<CartitemModel> {
    return this.http.post<CartitemModel>(environment.apiUrl + '/cart', {
      quantity: quantity,
      productEntity: product,
    });
  }

  public updateCartItem(cartItem: CartitemModel): Observable<CartitemModel> {
    return this.http.patch<CartitemModel>(environment.apiUrl + '/cart/' + cartItem.id, cartItem);
  }

  public deleteCartItem(id: string): Observable<void> {
    return this.http.delete<void>(environment.apiUrl + '/cart/' + id);
  }

  public clearCart(): Observable<void> {
    return this.http.delete<void>(environment.apiUrl + '/cart');
  }

}
