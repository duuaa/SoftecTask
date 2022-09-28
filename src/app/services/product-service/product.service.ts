import { ProductDto } from './../../model/dto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { productsAPI } from '../utils/URLs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(private http: HttpClient) { }
  getProducts(): Observable<ProductDto[]>{
    return this.http.get<ProductDto[]>(productsAPI);
  }
  editProductQuantity( productId: number, quantity: number): Observable<ProductDto>{
    return this.http.post<ProductDto>(productsAPI + `/${productId}`,quantity);
  }
}
