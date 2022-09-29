import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';

import { HttpClientModule } from '@angular/common/http';
import { OrderService } from './services/order-service/order.service';
import { ProductService } from './services/product-service/product.service';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SaveComponent } from './components/save/save.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    OrdersComponent,
    OrderDetailsComponent,
    SaveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    OrderService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
