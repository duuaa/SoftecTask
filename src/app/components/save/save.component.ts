import { OrderService } from './../../services/order-service/order.service';
import { AddOrderRequestDto } from './../../model/dto.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css']
})
export class SaveComponent implements OnInit, OnDestroy {
  userId: string;
  paymentMethod: string;
  newOrder: AddOrderRequestDto;
  componentSubscripitions : Array<Subscription>= [];
  constructor(private orderService: OrderService,
              private router : Router,
              private toastr: ToastrService) { }

  ngOnDestroy(): void {
    this.componentSubscripitions.forEach((subscription: Subscription)=>{
      subscription.unsubscribe();
    })
  }

  ngOnInit() {
    this.newOrder = history.state;
  }
  saveOder(){
    this.componentSubscripitions.push(
      this.orderService.addOrder({
        OrderDate: (new Date()).toString(),
        UserId: this.userId,
        Products: this.newOrder.Products,
        PaymentType: this.paymentMethod
        }).subscribe(()=>{
            this.router.navigateByUrl(`orders`);
            this.toastr.success("this order added sucessfully", "Add Order");
          }));
  }
  navigateToProducts(){
    this.router.navigateByUrl(`products`);
}
}
