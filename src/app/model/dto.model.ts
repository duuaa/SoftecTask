export interface ProductDto{
  id: number,
  ProductName: string,
  ProductPrice: number,
  AvailablePieces: number,
  ProductImg: string
}

export interface OrderDto{
  id: number,
  OrderDate: string,
  UserId: string,
  Products: ProductOrderDto[],
  PaymentType: string
}
export interface AddOrderRequestDto{
  OrderDate: string,
  UserId: string,
  Products: ProductOrderDto[],
  PaymentType: string
}

export interface ProductOrderDto{
  ProductId: number,
  Quantity: number
}
export interface UserDto{
  id: string,
  Name: string,
  Email: string,
  Phone: string,
  Address: string,
  RegisterDate: string
}
