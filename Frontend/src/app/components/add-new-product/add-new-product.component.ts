import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import Swal from 'sweetalert2';
import { UserAuthService } from '../../services/user-auth.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../../_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
import { MatGridListModule } from '@angular/material/grid-list';


@Component({
  selector: 'app-add-new-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,
    MatGridListModule
  ],
  templateUrl: './add-new-product.component.html',
  styleUrl: './add-new-product.component.css'
})
export class AddNewProductComponent implements OnInit{
  isSignDivVisiable: boolean  = false;

  product: Product = {
  
    productId: 0,
    productName: "",
    productDescription: "",
    productDiscountedPrice: null,
    productActualPrice: null,
    productImages: [],
  };
  constructor(private router: Router, private clienteService: ClienteService, 
    private userAuthService: UserAuthService,
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private activateRoute: ActivatedRoute){}
    ngOnInit(): void {
        this.product = this.activateRoute.snapshot.data['product'];
    }
    public showSuccessAlert() {
      Swal.fire({
        title: 'Success',
        text: 'User created successfully.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) {
          
        }
      });
    }
    
    public showSuccessAlert2() {
      Swal.fire({
        title: 'Alert',
        text: 'It needs to complete fields',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) {
          
        }
      });
    }
    
  addProduct(form: NgForm) {
    console.log(form.value); 
    if(form.value.productName && form.value.productName && form.value.productName ){
      
      const formData = this.prepareFormDataForProduct(this.product);
  
      this.productService.addNewProduct(formData).subscribe(
        (response: Product)=>{
          console.log(response)
          this.showSuccessAlert();
          this.clear(form);
          this.product.productImages =[];
        },
        (error: HttpErrorResponse)=>{
          console.log(error);
        }
      ); 
    }else{
      this.showSuccessAlert2();
    }
    
  }
  clear(form: NgForm) {
  form.resetForm();  // Esto limpiará todos los campos del formulario.
}

prepareFormDataForProduct(product: Product): FormData {
  const uploadImageData = new FormData();
  uploadImageData.append(
    "product",
    new Blob([JSON.stringify(product)], { type: "application/json" })
  );

  for (var i = 0; i < product.productImages.length; i++) {
    uploadImageData.append(
      "imageFile",
      this.product.productImages[i].file,
      this.product.productImages[i].file.name
    );
  }
  
  return uploadImageData;
}
onFileSelected(event:any){
  console.log(event);
  if (event.target.files) {
    const file = event.target.files[0];
    const fileHandle: FileHandle = {
      file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file)
      ), 
    };
    this.product.productImages.push(fileHandle);
  }

}
removeImages(i: number) {
  this.product.productImages.splice(i, 1);
}

fileDropped(fileHandle: FileHandle[]) {
  this.product.productImages.push(...fileHandle);
}

}


