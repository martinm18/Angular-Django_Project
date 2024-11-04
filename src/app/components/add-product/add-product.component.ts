import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  name: string = '';
  sku: string = '';
  description: string = '';
  price: number | null = null;
  stock: number | null = null;

  constructor(private apiService: ApiService) {}

  onSubmit() {
    const product = {
      name: this.name,
      sku: this.sku,
      description: this.description,
      price: this.price,
      stock: this.stock,
    };
    this.apiService.addProduct(product).subscribe(
      (response) => {
        console.log('Product added:', response);
        // Možeš dodati navigaciju nazad na listu proizvoda nakon dodavanja
      },
      (error) => {
        console.error('Error adding product:', error);
      }
    );
  }
}
