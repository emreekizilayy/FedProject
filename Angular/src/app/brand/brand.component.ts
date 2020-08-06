import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BrandService } from '../service/brand.service';
import { brand } from '../models/brand';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { error } from 'protractor';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  brandForm = new FormGroup({
    name:new FormControl(''),
    description:new FormControl(''),
    _id:new FormControl('')
  })
  submitted = false;
  pricevalue = 0;
  isAdd = true;
  constructor(private _brandService:BrandService,private toastr:ToastrService) { }

  brands:[];
  ngOnInit() {
    this.Load();
  }

  OnSubmit(){
    if(this.brandForm.valid && this.isAdd){
      console.log(this.brandForm.value);
      this._brandService.AddBrand(this.brandForm.value).subscribe((q)=>{
        this.toastr.success('Successfully Added');
        this.Load();
        this.brandForm.reset();
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
    else if(this.brandForm.valid && !this.isAdd){
      this._brandService.UpdateBrand(this.brandForm.value).subscribe((q)=>{
        this.Load();
        this.toastr.success('Successfully Updated');
        this.brandForm.reset();
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
    
  }

  Load() {
    this._brandService.GetAllBrands().subscribe((data: []) => {
      console.log(data);
      this.brands = data;
    })
    this.isAdd = true;
  }

  Delete(id) {
    this._brandService.DeleteBrand(id).subscribe((q)=>{
      this.Load();
    })
  }
  
  GetData(id){

    this._brandService.GetBrandByID(id).subscribe((data:brand)=>{
      this.brandForm.setValue({name:data.name,description:data.description,_id:data._id});
      this.isAdd = false;
    })
  }

}
