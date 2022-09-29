import { ProductService } from './../../services/product-service/product.service';
import { OrderService } from './../../services/order-service/order.service';
import { Component, OnInit } from '@angular/core';
import { OrderDto, ProductDto } from 'src/app/model/dto.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: OrderDto[] = [];
  products: ProductDto[] = [];
  constructor(private orderService: OrderService,
              private productService: ProductService,
              private router : Router) { }

  ngOnInit() {
    this.getAllProducts()
    this.getAllOrders();
  }
  getAllOrders():void{
    this.orderService.getOrders().subscribe((response)=>{
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
  getAllProducts():void{
    this.productService.getProducts().subscribe((response)=>{
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
