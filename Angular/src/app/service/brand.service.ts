import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private _http:HttpClient) { }

  GetAllBrands(){
    return this._http.get("http://localhost:3003/api/brand");
  }

  DeleteBrand(id){
    return this._http.post("http://localhost:3003/api/brand/delete",{id:id});

  }

  AddBrand(data){
    return this._http.post("http://localhost:3003/api/brand/add",data);
  }

  GetBrandByID(id){
    return this._http.get("http://localhost:3003/api/brand/" + id);
  }

  UpdateBrand(data){
    return this._http.post("http://localhost:3003/api/brand/update",data);
  }
}
