import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CategoryService } from '../service/category.service';
import { category } from '../models/category';
import { error } from 'protractor';
import { ToastrService } from 'ngx-toastr/ngx-toastr.d';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryForm = new FormGroup({
    name:new FormControl(''),
    description:new FormControl(''),
    _id:new FormControl('')
  })
  submitted = false;
  pricevalue = 0;
  isAdd = true;
  constructor(private _categoryService:CategoryService,private toastr: ToastrService) { }

  categories:[];
  ngOnInit() {
    this.Load();
  }

  OnSubmit(){
    if(this.categoryForm.valid && this.isAdd){
      this._categoryService.AddCategory(this.categoryForm.value).subscribe(
        (q)=>{
        this.toastr.success('Successfully Added');
        this.Load();
        this.categoryForm.reset();
      },
      (error) => {
        var errors = JSON.stringify(error.error.errors);
        var errorList = JSON.parse(errors);
        
        errorList.map(element => {
          this.toastr.error(element.msg, 'Error!');
        });
      },
      () => {
        this.Load();
      });
    }
    else if(this.categoryForm.valid && !this.isAdd){
      this._categoryService.UpdateCategory(this.categoryForm.value).subscribe(
        (q)=>{
          this.toastr.success('Successfully Updated');
        this.Load();
        this.categoryForm.reset();
      },
      (error) => {
        error.map(element => {
          this.toastr.error(element.msg, 'Error!');
        });
      },
      () => {
        this.Load();
      });
    }
    
  }

  Load() {
    this._categoryService.GetAllCategories().subscribe((data: []) => {
      this.categories = data;
    })
    this.isAdd = true;
  }

  Delete(id) {
    this._categoryService.DeleteCategory(id).subscribe((q)=>{
      this.Load();
    })
  }
  
  GetData(id){

    this._categoryService.GetCategoryByID(id).subscribe((data:category)=>{
      this.categoryForm.setValue({name:data.name,description:data.description,_id:data._id});
      this.isAdd = false;
    })
  }

}