import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private _http:HttpClient) { }

  GetAllProducts(){
    return this._http.get("http://localhost:3003/api/product");
  }

  DeleteProduct(id){
    return this._http.post("http://localhost:3003/api/product/delete",{id:id});

  }

  AddProduct(data){
    return this._http.post("http://localhost:3003/api/product/add",data);
  }

  GetProductByID(id){
    return this._http.get("http://localhost:3003/api/product/" + id);
  }

  UpdateProduct(data){
    return this._http.post("http://localhost:3003/api/product/update",data);
  }
}
