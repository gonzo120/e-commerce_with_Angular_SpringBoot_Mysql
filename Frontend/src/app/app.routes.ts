import { Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { SummaryComponent } from './components/summary/summary.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { AuthGuard } from './_auth/auth.guard';
import { AddNewProductComponent } from './components/add-new-product/add-new-product.component';
import { ShowProductDetailsComponent } from './components/show-product-details/show-product-details.component';
import { ProductResolveService } from './product-resolve.service';
import { ProductViewDetailsComponent } from './components/product-view-details/product-view-details.component';
import { BuyProductComponent } from './components/buy-product/buy-product.component';
import { BuyProductResolverService } from './buy-product-resolver.service';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
    { path: 'login', component: LoginComponent },
    { path: 'forbidden', component: ForbiddenComponent },
    {
        path: 'addNewProduct', component: AddNewProductComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] },
        resolve: {
            product: ProductResolveService
        }
    },
    { path: 'showProductDetails', component: ShowProductDetailsComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
    {
        path: 'productViewDetails', component: ProductViewDetailsComponent, resolve: {
            product: ProductResolveService
        },
    },
    {
        path: 'buyProduct', component: BuyProductComponent, canActivate: [AuthGuard], data: { roles: ['User'] },
        resolve: {
            productDetails: BuyProductResolverService
        },
    },{
        path: 'orderConfirm', component: OrderConfirmationComponent, canActivate: [AuthGuard], data: { roles: ['User'] },
        resolve: {
            productDetails: BuyProductResolverService
        },
    },{
        path: 'cart', component: CartComponent, canActivate: [AuthGuard], data: { roles: ['User'] }
    }
];


