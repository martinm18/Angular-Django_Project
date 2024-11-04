import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent {
  customer = { name: '', email: '', phone: '' };

  constructor(private apiService: ApiService) {}

  onSubmit(): void {
    this.apiService.addCustomer(this.customer).subscribe(
      (response) => {
        console.log('Customer added:', response);
        alert('Customer successfully added!');
      },
      (error) => console.error('Error adding customer:', error)
    );
  }
}

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ApiService } from '../../services/api.service';

// @Component({
//   selector: 'app-add-customer',
//   templateUrl: './add-customer.component.html',
//   styleUrls: ['./add-customer.component.css'],
// })
// export class AddCustomerComponent implements OnInit {
//   customerForm: FormGroup;

//   constructor(private fb: FormBuilder, private apiService: ApiService) {
//     this.customerForm = this.fb.group({
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       phone: ['', Validators.required],
//     });
//   }

//   ngOnInit(): void {}

//   onSubmit() {
//     if (this.customerForm.valid) {
//       this.apiService.addCustomer(this.customerForm.value).subscribe(
//         (response) => console.log('Customer added:', response),
//         (error) => console.error('Error adding customer:', error)
//       );
//     }
//   }
// }
