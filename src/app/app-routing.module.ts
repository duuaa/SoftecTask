import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaveComponent } from './components/save/save.component';


const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'orders/:id',     component: OrderDetailsComponent },
  { path: 'save-order',     component: SaveComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
