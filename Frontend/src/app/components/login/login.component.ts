import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import Swal from 'sweetalert2';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isSignDivVisiable: boolean  = false;

  signUpObj: SignUpModel  = new SignUpModel();
  loginObj: LoginModel  = new LoginModel();

  constructor(private router: Router, private clienteService: ClienteService, 
    private userAuthService: UserAuthService,){}

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
    signIn(form: NgForm) {
      console.log(form.value); // Muestra los valores del formulario
      this.clienteService.onSignUp(form.value).subscribe(
        (response)=>{
          this.showSuccessAlert();
          this.login(form)
        },
        (error)=>{
  
          this.warningAlert();
          console.log(error);
        }
      );
    }
  warningAlert() {
    Swal.fire({
      title: 'User not found',
      text: 'Username or password is incorrect',
      icon: 'warning',
      confirmButtonColor: '#512da8',
      confirmButtonText: 'Ok!'
    });
    
  }
  login(form: NgForm) {
    console.log(form.value); // Muestra los valores del formulario
    // O puedes acceder a campos específicos como:
    console.log('Username:', form.value.userName);
    console.log('Password:', form.value.userPassword);
    this.clienteService.onSignin(form.value).subscribe(
      (response)=>{
        console.log(response)
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);

        const role = response.user.role[0].roleName;
        if (role === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      },
      (error)=>{

        this.warningAlert();
        console.log(error);
      }
    );
  }
}

export class SignUpModel  {
  name: string;
  email: string;
  password: string;

  constructor() {
    this.email = "";
    this.name = "";
    this.password= ""
  }
}

export class LoginModel  { 
  userName: string;
  userPassword: string;

  constructor() {
    this.userName = ""; 
    this.userPassword= ""
  }
}
