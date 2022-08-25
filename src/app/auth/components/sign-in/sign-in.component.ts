import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { logUser, user } from "./../../../interfaces/user";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm!: FormGroup;
  submitted = false;
  isDisabled = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * @Description
   * Initialize the form
   */
   initializeForm() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', Validators.required]
    });
  }

  /**
   * @Description
   * Function to Login for the user and check whether the current email and password is already in the list , 
   * if found navigate to users page
   */
  logUser(){
     this.submitted = true;
     if(this.signInForm.valid){
      this.isDisabled = true;
      const loginRegister = {
        email: this.signInForm.get('email')?.value,
        password: this.signInForm.get('password')?.value
      }
      let logReg: logUser[];
      if(localStorage.getItem('loginRegister')){
        let userReg:any = localStorage.getItem('loginRegister');
        logReg = JSON.parse(userReg);
        if (logReg.filter((e:logUser) => (e.email === loginRegister.email && e.password === loginRegister.password) ).length > 0) {
          this.authService.setLoginStatus(true);
            this.router.navigate(['/users'])
      } else {
        this.isDisabled = false;
        this.toastr.error('Invalid user', 'Failed!');
      }
     } else {
      this.isDisabled = false;
      this.toastr.error('Invalid user', 'Failed!');
     }
  }
}

}
