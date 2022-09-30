import { ProductService } from './../../services/product-service/product.service';
import { UserDto, ProductDto } from './../../model/dto.model';
import { OrderDto } from 'src/app/model/dto.model';
import { OrderService } from './../../services/order-service/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  order: OrderDto;
  user: UserDto;
  products: ProductDto[] = [];
  componentSubscripitions: Array<Subscription> = [];

  constructor(private route: ActivatedRoute,
              private orderService: OrderService,
              private userService: UserService,
              private productService: ProductService,
              private router : Router) { }

  ngOnDestroy(): void {
    this.componentSubscripitions.forEach((subscription: Subscription)=>{
      subscription.unsubscribe();
    })
  }
  ngOnInit() {
    this.componentSubscripitions.push(this.getOrderItem());
  }
  getOrderItem(): Subscription{
    return this.route.params.pipe(switchMap((params: Params) =>
    this.orderService.getOrderById( params['id'])
    )).subscribe((orderResponse)=>{
        this.order = orderResponse
         this.componentSubscripitions.push(
          this.productService.getProducts().subscribe((response)=>{
          this.products= response;
          this.order.productsItems = this.products.filter(product=>
            this.order.Products.find(p=> p.ProductId == product.id))
        }));
        this.componentSubscripitions.push(
        this.userService.getUserById(this.order.UserId).subscribe((userResponse)=>{
          this.user = userResponse
        }));

      })

  }
  navigateToOrders(){
      this.router.navigateByUrl(`orders`);
  }
}
