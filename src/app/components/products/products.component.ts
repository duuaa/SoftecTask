import { ProductDto, AddOrderRequestDto } from './../../model/dto.model';
import { ProductService } from './../../services/product-service/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products:ProductDto[] = [];
  addMode: boolean = false;
  newOrder: AddOrderRequestDto = {
    OrderDate: "",
    UserId: "",
    Products: [],
    PaymentType: ""
  };
  componentSubscripitions : Array<Subscription> = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnDestroy(): void {
    this.componentSubscripitions.forEach((subscription: Subscription)=>{
      subscription.unsubscribe();
    })
  }

  ngOnInit() {
    this.getAllProducts()
  }
  getAllProducts(): void{
    this.componentSubscripitions.push(this.productService.getProducts().subscribe((response)=>{
      this.products = response;
    }));
  }
  editQuantity(index: number,quantity: string ){
    this.products[index] .AvailablePieces = parseInt(quantity);
    this.componentSubscripitions.push(this.productService.editProductQuantity(this.products[index].id, parseInt(quantity))
    .subscribe((updatedProduct)=>{
      this.products[index] =updatedProduct;
    }));
  }
  navigateToOrders(){
    this.router.navigateByUrl(`orders`);
}
  activeAddMode(){
  this.addMode = true;
  }
  saveOrder(){
    if(!this.newOrder.Products.length){
      Swal.fire("Validation Error", "No thing to save", "error");
    }else{
      this.router.navigateByUrl(`save-order`, { state: this.newOrder });
    }
  }
  addToOrder(index: number,quantity: string){
    const quantityData = parseInt(quantity)
    if(this.products[index].AvailablePieces - this.takenQuantity(index)< quantityData){
      Swal.fire("Validation Error", "You can not add quantity to your order more than the available", "error");

    }
    else{
      var existProduct = this.newOrder.Products.filter(product=> product.ProductId== this.products[index].id);
      if(existProduct.length){
        existProduct[0].Quantity += quantityData;
      }else{
        this.newOrder.Products.push({ProductId: this.products[index].id , Quantity: quantityData})

      }
    }
  }
  takenQuantity(index: number): number{
    var existProduct = this.newOrder.Products.filter(product=> product.ProductId== this.products[index].id);
    return existProduct.length ? existProduct[0].Quantity : 0
  }
  cancelOrder(): void{
   this.addMode = false;
   this.newOrder = {
    OrderDate: "",
    UserId: "",
    Products: [],
    PaymentType: ""
  };
  }
}
