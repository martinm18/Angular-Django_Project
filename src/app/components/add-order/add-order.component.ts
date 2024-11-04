import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
})
export class AddOrderComponent implements OnInit {
  customers: any[] = [];
  order = {
    customer: '',
    status: 'Pending',
    date_created: new Date().toISOString().substring(0, 10),
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getCustomers().subscribe((data: any) => {
      this.customers = data;
    });
  }

  onSubmit(): void {
    this.apiService.addOrder(this.order).subscribe(
      (response) => {
        console.log('Order added:', response);
        alert('Order successfully added!');
      },
      (error) => console.error('Error adding order:', error)
    );
  }
}

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ApiService } from '../../services/api.service';

// @Component({
//   selector: 'app-add-order',
//   templateUrl: './add-order.component.html',
//   styleUrls: ['./add-order.component.css'],
// })
// export class AddOrderComponent implements OnInit {
//   orderForm: FormGroup;
//   customers: any[] = [];

//   constructor(private fb: FormBuilder, private apiService: ApiService) {
//     this.orderForm = this.fb.group({
//       customer: ['', Validators.required],
//       status: ['Pending', Validators.required],
//       date_created: [''],
//     });
//   }

//   ngOnInit(): void {
//     // Dohvaćanje postojećih kupaca
//     this.apiService.getCustomers().subscribe((data) => {
//       this.customers = data;
//     });
//   }

//   onSubmit(): void {
//     if (this.orderForm.valid) {
//       const orderData = this.orderForm.value;
//       this.apiService.addOrder(orderData).subscribe(
//         (response) => {
//           console.log('Order added:', response);
//         },
//         (error) => {
//           console.error('Error adding order:', error);
//         }
//       );
//     }
//   }
// }
