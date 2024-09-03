import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
/* import { ImageProcessingService } from '../image-processing.service';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
 */
import { ProductService } from '../../services/product.service';
import { Product } from '../../_model/product.model';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../../image-processing.service';
import { MatButtonModule } from "@angular/material/button";
import { BuyProductResolverService } from '../../buy-product-resolver.service';


@Component({
  selector: 'app-show-product-details',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './show-product-details.component.html',
  styleUrl: './show-product-details.component.css'
})
export class ShowProductDetailsComponent implements OnInit {

  showLoadMoreProductButton = false;
  dataSource = new MatTableDataSource();
  showTable = false;
  pageNumber: number = 0;
  productDetails: Product[] = [];
  displayedColumns: string[] = ['Id', 'Product Name', 'Product Description', 'Product Actual Price' ,'Product Discounted Price', 'Actions' ];

  constructor(private productService: ProductService,
    public imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router,
    private searchservice: BuyProductResolverService,) { }

  ngOnInit(): void {
    this.searchservice.searchKeyword$.subscribe(keyword => {
      this.searchByKeyword(keyword);
    });
  }

  /* searchByKeyword(searchkeyword) {
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchkeyword);
  }
 */
  /* public getAllProducts(searchKeyword: string = "") {
    this.showTable = false;
    this.productService.getAllProducts()
    .pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product))) 
    )
    .subscribe(
      (resp: Product[]) => {
        // console.log(resp);
        resp.forEach(product => this.productDetails.push(product));
        console.log('msg', this.productDetails);
        this.showTable = true;

        if(resp.length == 12) {
          this.showLoadMoreProductButton = true;
        } else {
          this.showLoadMoreProductButton = false;
        }

        // this.productDetails = resp;
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  } */
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
          this.showTable = true;
          console.log(this.productDetails)
        }, (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }
    

  loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }

  deleteProduct(productId:number) {
    this.productService.deleteProduct(productId).subscribe(
      (resp) => {
        this.getAllProducts();
      },
      (error:HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
 
 showImages(product: Product) {
    console.log(product);
    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data: {
        images: product.productImages
      },
      height: '500px',
      width: '800px'
    });
  } 

  editProductDetails(productId:number) {
    this.router.navigate(['/addNewProduct', {productId: productId}]);
  } 

}
