import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000/api/'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Metode za CRUD operacije
  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}products/`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}products/`, product);
  }

  getCustomers(): Observable<any> {
    return this.http.get(`${this.apiUrl}customers/`);
  }

  addCustomer(customer: any): Observable<any> {
    return this.http.post(`${this.apiUrl}customers/`, customer);
  }

  getOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}orders/`);
  }

  addOrder(order: any): Observable<any> {
    return this.http.post(`${this.apiUrl}orders/`, order);
  }

  createOrderItem(orderItem: {
    order: number;
    product: number;
    quantity: number;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}orderitems/`, orderItem);
  }
}
