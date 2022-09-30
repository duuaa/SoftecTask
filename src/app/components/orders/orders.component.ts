import { ProductService } from './../../services/product-service/product.service';
import { OrderService } from './../../services/order-service/order.service';
import { Component, OnInit } from '@angular/core';
import { OrderDto, ProductDto } from 'src/app/model/dto.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: OrderDto[] = [];
  products: ProductDto[] = [];
  componentSubscripitions: Array<Subscription> = [];

  constructor(private orderService: OrderService,
              private productService: ProductService,
              private router : Router) { }

  ngOnDestroy(): void {
    this.componentSubscripitions.forEach((subscription: Subscription)=>{
      subscription.unsubscribe();
    })
  }
  ngOnInit() {
    this.componentSubscripitions.push(
    this.getAllProducts(),
    this.getAllOrders());
  }
  getAllOrders(): Subscription{
    return this.orderService.getOrders().subscribe((response)=>{
      response.forEach(item=>{
        item.productsItems = []
        item.total= item.Products.reduce((accumulator, object) => {
          var product = this.products.find(p => p.id == object.ProductId);
          if(product)
            item.productsItems.push(product);
          return product?.ProductPrice ? accumulator+ product.ProductPrice*object.Quantity: 0
        }, 0);
      })
      this.orders = response;
    })
  }
  getAllProducts(): Subscription{
    return this.productService.getProducts().subscribe((response)=>{
      this.products = response;
    })
  }
  navigateToOrderDetails(index: number){
    this.router.navigateByUrl(`orders/${this.orders[index].id}`);
  }
  navigateToProducts(){
    this.router.navigateByUrl(`products`);
}
}
