import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ChildActivationStart, Router } from '@angular/router';
import { CallService } from '../call.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  
  userForm: any;
  submitted = false;
  img = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  constructor(
    private callService: CallService,
    private router: Router,
    private fb: FormBuilder, 
    private toastr: ToastrService
    ) {}
  ngOnInit() {
  this.initializeForm();
  }

  initializeForm(){
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      statusMessage: ['' , Validators.required],
      email: ['' ,Validators.compose ([Validators.required,Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      age: ['', Validators.required],
      isPublic: ['true', Validators.required],
      avatarUrl: ['']
    });
  }

  create(){
    this.submitted = true;
    if(this.userForm.valid){
    this.callService.createUser(this.userForm.value).subscribe((res=>{
      this.toastr.success('User record created successfully', 'Success!');
      this.router.navigate(['/users'])
    }
    ), err=> {
      console.log(err)
    })
  }
}

}
