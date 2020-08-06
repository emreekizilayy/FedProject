import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { product } from 'src/app/models/product';
import { CategoryService } from '../service/category.service';
import { BrandService } from '../service/brand.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productForm = new FormGroup({
    name:new FormControl(''),
    description:new FormControl(''),
    price: new FormControl(''),
    category:new FormControl(''),
    brand:new FormControl(''),
    _id:new FormControl('')
  })
  submitted = false;
  isAdd = true;
  constructor(private _productService:ProductService,private _categoryService:CategoryService,private _brandService:BrandService) { }

  products:[];
  categories:[];
  brands:[];
  ngOnInit() {
    this.Load();
    this.GetCategories();
    this.GetBrands();
  }

  OnSubmit(){
    if(this.productForm.valid && this.isAdd){
      this._productService.AddProduct(this.productForm.value).subscribe(
        (q) => {
        this.Load();
        this.productForm.reset();
      },
      (error) => {
        console.log(error);
      } );
    }
    else if(this.productForm.valid && !this.isAdd){
      console.log(this.productForm.value);
      this._productService.UpdateProduct(this.productForm.value).subscribe((q) => {
        this.Load();
        this.productForm.reset();
      });
    }
  }

  Load() {
    this._productService.GetAllProducts().subscribe((data: []) => {
      this.products = data;
    })
    this.isAdd = true;
  }

  Delete(id) {
    this._productService.DeleteProduct(id).subscribe((q)=>{
      this.Load();
    })
  }
  
  GetData(id){
    this._productService.GetProductByID(id).subscribe((data:product)=>{
      var selectedCategory = data.category.toString();
      var selectedBrand = data.brand.toString();
      this.productForm.setValue({name:data.name,description:data.description,price:data.price,_id:data._id,category:selectedCategory,brand:selectedBrand});
      this.isAdd = false;
    })
  }

  GetCategories(){
    this._categoryService.GetAllCategories().subscribe((data: []) => {
      this.categories = data;
    })
  }

  GetBrands(){
    this._brandService.GetAllBrands().subscribe((data: []) => {
      this.brands = data;
    })
  }

  ResetForm(){
    this.productForm.reset();
  }
}