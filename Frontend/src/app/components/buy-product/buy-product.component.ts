import { CommonModule } from '@angular/common';
import { Component, Injector, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../_model/product.model';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { OrderDetails } from '../../_model/order-details.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buy-product',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatFormField, MatFormFieldModule, FormsModule],
  templateUrl: './buy-product.component.html',
  styleUrl: './buy-product.component.css'
})
export class BuyProductComponent implements OnInit {

  isSingleProductCheckout: string|null= '';
  productDetails: Product[] = [] ;

  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    //transactionId: '',
    orderProductQuantityList: []
  } 

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private injector: Injector) { }

  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout"); 
    
   this.productDetails.forEach(
      x => this.orderDetails.orderProductQuantityList.push(
        {productId: x.productId??0, quantity: 1}
      )
    );  

    console.log(this.productDetails)
    console.log(this.orderDetails);
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
        this.router.navigate(["/"]);
      }
    });
  }
  placeOrder(form: NgForm){
    
    console.log(this.orderDetails)
    this.productService.placeOrder(this.orderDetails).subscribe(
      (resp) => {
        console.log(resp);
        form.reset();
        this.showSuccessAlert();
        /* const ngZone = this.injector.get(NgZone);
        ngZone.run(
          () => {
            this.router.navigate(["/orderConfirm"]);
          }
        ); */
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getQuantityForProduct(productId:any) {
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );

    return filteredProduct[0].quantity;
  }
  getCalculatedTotal(productId:any, productDiscountedPrice:any) {
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );

    return filteredProduct[0].quantity * productDiscountedPrice;
  }
  onQuantityChanged(q:any, productId:any) {
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct) => orderProduct.productId === productId
    )[0].quantity = q;
  }

  getCalculatedGrandTotal() {
    let grandTotal = 0;
    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity) => {
        const product = this.productDetails.find(product => product.productId === productQuantity.productId);
        const price = product?.productDiscountedPrice ?? 0; // Usa 0 si price es null o undefined
        grandTotal = grandTotal + price * productQuantity.quantity;
      }
    );
    

    return grandTotal;
  }
/* 
 


  

  

 

  createTransactionAndPlaceOrder(orderForm: NgForm) {
    let amount = this.getCalculatedGrandTotal();
    this.productService.createTransaction(amount).subscribe(
      (response) => {
        console.log(response);
        this.openTransactioModal(response, orderForm);
      },
      (error) => {
        console.log(error);
      }
    );

  }

  openTransactioModal(response: any, orderForm: NgForm) {
    var options = {
      order_id: response.orderId,
      key: response.key,
      amount: response.amount,
      currency: response.currency,
      name: 'Learn programming yourself',
      description: 'Payment of online shopping',
      image: 'https://cdn.pixabay.com/photo/2023/01/22/13/46/swans-7736415_640.jpg',
      handler: (response: any) => {
        if(response!= null && response.razorpay_payment_id != null) {
          this.processResponse(response, orderForm);
        } else {
          alert("Payment failed..")
        }
       
      },
      prefill : {
        name:'LPY',
        email: 'LPY@GMAIL.COM',
        contact: '90909090'
      },
      notes: {
        address: 'Online Shopping'
      },
      theme: {
        color: '#F37254'
      }
    };

    var razorPayObject = new Razorpay(options);
    razorPayObject.open();
  }

  processResponse(resp: any, orderForm:NgForm) {
    this.orderDetails.transactionId = resp.razorpay_payment_id;
    this.placeOrder(orderForm);
  } */
}