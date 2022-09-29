import { ordersAPI } from './../utils/URLs';
import { AddOrderRequestDto, OrderDto } from './../../model/dto.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }
  getOrders(): Observable<OrderDto[]>{
    return this.http.get<OrderDto[]>(ordersAPI);
  }
  getOrderById(id: number): Observable<OrderDto>{
    return this.http.get<OrderDto>(ordersAPI + `/${id}`);
  }
  addOrder(order: AddOrderRequestDto): Observable<OrderDto>{
    return this.http.put<OrderDto>(ordersAPI , order);
  }
}
