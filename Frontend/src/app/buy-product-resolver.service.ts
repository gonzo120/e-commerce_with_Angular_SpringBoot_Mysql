import { Injectable } from '@angular/core';
import { ProductService } from './services/product.service';
import { ImageProcessingService } from './image-processing.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product[]>{

  // let isSingleProductCheckout = false;

  constructor(private productServcice: ProductService,
    private imageProcessingService: ImageProcessingService) { 

    }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] | Observable<Product[]> | Promise<Product[]> {
    
    const id = route.paramMap.get("id");
    const isSingleProductCheckout = route.paramMap.get("isSingleProductCheckout");
    return this.productServcice.getProductDetails(isSingleProductCheckout, id)
      .pipe(
        map(
          (x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product))
        )
      );
  }
}