import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { logUser } from 'src/app/interfaces/user';
import { ConfirmPasswordValidator } from '../../validators/password.validator';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm!: FormGroup;
  submitted = false;
  isDisabled = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * @Description
   * Initialize the form
   */
   initializeForm() {
    this.signUpForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
    {
      validator: ConfirmPasswordValidator("password", "confirmPassword")
    }
    );
  }

  /**
   * @Description
   * Function to create the account for the user and store the details in the localstorage
   * and check whether the email is already exists
   */

   createUser(){
    this.submitted = true;
    if(this.signUpForm.valid){
      this.isDisabled = true;
    const loginRegister = {
      email: this.signUpForm.get('email')?.value,
      password: this.signUpForm.get('password')?.value
    }
    let logReg:any = [];
    if(localStorage.getItem('loginRegister')){
    logReg = localStorage.getItem('loginRegister');
    logReg = JSON.parse(logReg);
    if (logReg.filter((e:logUser) => (e.email === loginRegister.email) ).length > 0) {
      this.toastr.error('Account already exists', 'Error!');
      this.isDisabled = false;
      return;
    }
    logReg.push(loginRegister)
    } else {
    logReg.push(loginRegister)
    }
    localStorage.setItem('loginRegister', JSON.stringify(logReg));
    this.toastr.success('Account created successfully', 'Success!');
    this.router.navigate(['/sign-in'])
  }
 }

}