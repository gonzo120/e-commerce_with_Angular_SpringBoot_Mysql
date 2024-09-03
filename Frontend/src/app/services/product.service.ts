import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../_model/product.model';
import { OrderDetails } from '../_model/order-details.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://e-commerce-with-angular-springboot-mysql.onrender.com/';
  //private baseUrl = 'http://localhost:9090/';
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  headers = new HttpHeaders({
    'Authorization': 'Bearer ', // Reemplaza con tu token de autenticación
    'Content-Type': 'application/json'
  });
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken'); // O el método que uses para obtener el token
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  constructor(private http: HttpClient) { }

  public addNewProduct(product: FormData): Observable<any> {
    console.log(product);
    return this.http.post<Product>(this.baseUrl + 'addNewProduct', product);
  }

  /* public getAllProducts() {
    return this.http.get<Product[]>(this.baseUrl+'getAllProducts');
  } */
  public deleteProduct(productId: number) {
    return this.http.delete(this.baseUrl+ 'deleteProductDetails/'+productId);
  }

  public getProductDetailsById(productId:any) {
    console.log(productId)
    return this.http.get<Product>(this.baseUrl+ 'getProductDetailsById/'+productId);
  }

  public getProductDetails(isSingleProductCheckout:any, productId:any) {
    return this.http.get<Product[]>(this.baseUrl+ 'getProductDetails/'+isSingleProductCheckout+'/'+productId
      , { headers: this.getHeaders() }
    );
  }

  public placeOrder(orderDetails: OrderDetails, isCartCheckout:any) {
    return this.http.post(this.baseUrl+ 'placeOrder/'+  isCartCheckout, orderDetails
      , { headers: this.getHeaders() }
    );
  }

  public getAllProducts(searchKey: string = "") {
    return this.http.get<Product[]>(this.baseUrl+ 'getAllProducts?searchKey='+searchKey);
  }

  public getCartDetails() {
    return this.http.get(this.baseUrl+ 'getCartDetails', 
      { headers: this.getHeaders() });
  }

  public deleteCartItem(cartId:any) {
    return this.http.delete(this.baseUrl+'deleteCartItem/'+cartId
      , { headers: this.getHeaders() }
    );
  }

  public addToCart(productId:any) {
    return this.http.get(this.baseUrl+'addToCart/'+productId
      , { headers: this.getHeaders() }
    );
  }
}
