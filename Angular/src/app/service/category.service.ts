import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http:HttpClient) { }

  GetAllCategories(){
    return this._http.get("http://localhost:3003/api/category");
  }

  DeleteCategory(id){
    return this._http.post("http://localhost:3003/api/category/delete",{id:id});

  }

  AddCategory(data){
    return this._http.post("http://localhost:3003/api/category/add",data);
  }

  GetCategoryByID(id){
    return this._http.get("http://localhost:3003/api/category/" + id);
  }

  UpdateCategory(data){
    return this._http.post("http://localhost:3003/api/category/update",data);
  }
}
