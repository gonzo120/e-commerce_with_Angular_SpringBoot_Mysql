import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../_model/product.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-product-view-details',
  standalone: true,
  imports: [CommonModule, MatGridListModule],
  templateUrl: './product-view-details.component.html',
  styleUrl: './product-view-details.component.css'
})
export class ProductViewDetailsComponent implements OnInit {

  selectedProductIndex = 0;

  product: Product;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
  private userAuthService: UserAuthService) { 
      this.product = {
      productId: 0,
      productName: '',
      productDescription: '',
      productDiscountedPrice: 0,
      productActualPrice: 0,
      productImages: [],
    };}

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product)
  }

  buyProduct(productId:number) {
    this.router.navigate(['/buyProduct', {
      isSingleProductCheckout: true, id: productId
    }]);
  }

   addToCart(productId:any) {
    this.productService.addToCart(productId).subscribe(
      (response) => {
        console.log(response);
      }, (error)=> {
        console.log(error);
      }
    );
  }

  changeIndex(index:any) {
    this.selectedProductIndex = index;
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
    
  }


  public isAdmin() {
    if (this.isLoggedIn()) { 
      return this.userAuthService.isAdmin();
    }
    return false;
  }
   
}