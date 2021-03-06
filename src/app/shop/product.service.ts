import { PageableInterface } from "../components/paged-list/pageable.interface";
import { Observable, Subject } from "rxjs";
import { PageType } from "../components/paged-list/page.type";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ProductModel } from "./product/product.model";
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ProductService implements PageableInterface {
  observable: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {}

  getPage(
    page: number,
    pageSize: number
  ): Observable<PageType<ProductModel>> {
    const params = new HttpParams().set('size', pageSize).set('page', page);
    return this.http.get<PageType<ProductModel>>(
      environment.apiUrl + '/product',
      { params }
    );
  }

  createProduct(product: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(environment.apiUrl + '/product', product)
  }

  updateProduct(product: ProductModel): Observable<ProductModel> {
    return this.http.patch<ProductModel>(environment.apiUrl + '/product/' + product.id, product)
  }

  deleteProduct(product: ProductModel): Observable<void> {
    return this.http.delete<void>(environment.apiUrl + '/product/' + product.id);
  }
}
