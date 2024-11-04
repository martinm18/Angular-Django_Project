// order-form.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
})
export class OrderFormComponent implements OnInit {
  orders: any[] = [];
  products: any[] = [];
  selectedOrder: number | null = null;
  selectedProduct: number | null = null;
  quantity: number = 1;
  message: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadOrders();
    this.loadProducts();
  }

  loadOrders(): void {
    this.apiService.getOrders().subscribe(
      (data) => (this.orders = data),
      (error) => console.error('Greška kod dohvaćanja narudzbi', error)
    );
  }

  loadProducts(): void {
    this.apiService.getProducts().subscribe(
      (data) => (this.products = data),
      (error) => console.error('Greška kod dohvaćanja proizvoda', error)
    );
  }

  createOrderItem(): void {
    if (this.selectedOrder && this.selectedProduct) {
      const orderItem = {
        order: this.selectedOrder,
        product: this.selectedProduct,
        quantity: this.quantity,
      };

      this.apiService.createOrderItem(orderItem).subscribe(
        (response) => {
          this.message = 'Narudžba uspješno poslana!';
          console.log('Narudžba kreirana:', response);
        },
        (error) => {
          this.message = 'Greška kod narudžbe.';
          console.error('Greška:', error);
        }
      );
    }
  }
}
