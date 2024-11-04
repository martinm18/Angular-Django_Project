import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [AuthGuard],
  },
  { path: 'add-product', component: AddProductComponent },
  { path: 'customers', component: CustomerListComponent },
  { path: 'add-customer', component: AddCustomerComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'add-order', component: AddOrderComponent },
  { path: 'order-form', component: OrderFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'login' },

  // Ostale rute
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
