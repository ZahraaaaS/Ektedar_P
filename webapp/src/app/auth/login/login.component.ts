// // // import { Component } from '@angular/core';

// // // @Component({
// // //   selector: 'app-login',
// // //   imports: [],
// // //   templateUrl: './login.component.html',
// // //   styleUrl: './login.component.css'
// // // })
// // // export class LoginComponent {

// // // }


// // import { Component } from '@angular/core';
// // import { Router } from '@angular/router';
// // import { AuthService } from '../../shared/services/auth.service';
// // import { FormsModule } from '@angular/forms';

// // @Component({
// //   selector: 'app-login',
// //   standalone: true,
// //   imports: [FormsModule],
// //   templateUrl: './login.component.html',
// //   styleUrls: ['./login.component.css']
// // })
// // export class LoginComponent {
// //   username: string = '';
// //   password: string = '';
// //   errorMessage: string = '';
// // loginForm: any;

// //   constructor(private authService: AuthService, private router: Router) {}

// //   onSubmit(): void {
// //     if (this.authService.login(this.username, this.password)) {
// //       this.router.navigate(['/dashboard']);
// //     } else {
// //       this.errorMessage = 'Invalid username or password';
// //     }
// //   }
// // }


// // import { Component } from '@angular/core';
// // import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// // import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';

// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../../shared/services/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   loginForm: FormGroup;
//   errorMessage: string = '';

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router
//   ) {
//     this.loginForm = this.fb.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required]
//     });
//   }

    
//   submit() {
//     const { username, password } = this.loginForm.value;

//     if (username === 'admin' && password === 'admin123') {
//       localStorage.setItem('token', 'dummy-token');
//       this.router.navigate(['dashboard']);
//     } else {
//       this.errorMessage = 'Invalid username or password';
//     }
//   }
//   // onSubmit(): void {
//   //   if (this.loginForm.valid) {
//   //     const { username, password } = this.loginForm.value;
      
//   //     if (this.authService.login(username, password)) {
//   //       this.router.navigate(['/dashboard']);
//   //     } else {
//   //       this.errorMessage = 'Invalid username or password';
//   //     }
//   //   }
//   // }

// }







import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule // ✅ This fixes the error
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    const { username, password } = this.loginForm.value;

    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('token', 'dummy-token');
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
