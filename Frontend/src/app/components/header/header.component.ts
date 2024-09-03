import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { ClienteService } from '../../services/cliente.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ImageProcessingService } from '../../image-processing.service';
import { Product } from '../../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { HomeComponent } from '../home/home.component';
import { MatFormField } from '@angular/material/form-field';
import { BuyProductResolverService } from '../../buy-product-resolver.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, MatFormField],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  
})
export class HeaderComponent {
  currentRoute: string = '';

  @ViewChild(HomeComponent) homeComponent!: HomeComponent;
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: ClienteService,
    private productService: ProductService,
    private searchservice: BuyProductResolverService, 

  ) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }
  productDetails = [];
  showLoadButton = false;

  ngOnInit(): void {}

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
    
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/']);
  }

  public isAdmin() {
    if (this.isLoggedIn()) { 
      return this.userAuthService.isAdmin();
    }
    return false; 
  }

  public isUser() {
    if (this.isLoggedIn()) { 
      return this.userAuthService.isUser();
    }
    return false; 
  }
  searchByKeyword2(searchkeyword:any) {
    console.log(searchkeyword);
    
    this.searchservice.updateSearchKeyword(searchkeyword);
  }
  
}
