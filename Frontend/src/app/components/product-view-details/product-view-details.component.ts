import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../_model/product.model';
import { MatGridListModule } from '@angular/material/grid-list';

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
    private productService: ProductService) { 
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

  /* addToCart(productId:any) {
    this.productService.addToCart(productId).subscribe(
      (response) => {
        console.log(response);
      }, (error)=> {
        console.log(error);
      }
    );
  }

  changeIndex(index) {
    this.selectedProductIndex = index;
  }

  buyProduct(productId) {
    this.router.navigate(['/buyProduct', {
      isSingleProductCheckout: true, id: productId
    }]);
  } */
}