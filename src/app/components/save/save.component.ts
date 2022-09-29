import { OrderService } from './../../services/order-service/order.service';
import { AddOrderRequestDto } from './../../model/dto.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css']
})
export class SaveComponent implements OnInit {
  userId: string;
  paymentMethod: string;
  newOrder: AddOrderRequestDto;
  constructor(private orderService: OrderService, private router : Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.newOrder = history.state;
  }
  saveOder(){

    this.orderService.addOrder({
      OrderDate: (new Date()).toString(),
  UserId: this.userId,
  Products: this.newOrder.Products,
  PaymentType: this.paymentMethod
    }).subscribe(()=>{
      this.router.navigateByUrl(`orders`);
      this.toastr.success("this order added sucessfully", "Add Order");
    })
  }
}
