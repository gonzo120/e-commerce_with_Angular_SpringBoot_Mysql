import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductService } from '../../services/product.service';
import { ImageProcessingService } from '../../image-processing.service';
import { Router } from '@angular/router';
import { Product } from '../../_model/product.model';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { BuyProductResolverService } from '../../buy-product-resolver.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
    MatGridListModule,
    FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  pageNumber: number = 0;

  productDetails: Product[] = [];

  showLoadButton = false;

  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router,
    private searchservice: BuyProductResolverService,) { }

  ngOnInit(): void {
    //this.getAllProducts();
    this.searchservice.searchKeyword$.subscribe(keyword => {
      this.searchByKeyword(keyword);
    });
  }

   searchByKeyword(searchkeyword:any) {
    console.log(searchkeyword);
    this.pageNumber = 0;
    
    this.getAllProducts(searchkeyword);
  } 

  public getAllProducts(searchKey: string = "") {
    
    this.productService.getAllProducts(searchKey)
    .pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
    )
    .subscribe(
      (resp: Product[]) => {
        console.log(resp);
        this.productDetails = [];
        resp.forEach(p => this.productDetails.push(p));
        
        console.log(this.productDetails)
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

 /*  public loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  } */

  showProductDetails(productId:number) {
    this.router.navigate(['/productViewDetails', {productId: productId}]);
  } 

}
