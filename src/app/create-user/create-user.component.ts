import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ChildActivationStart, Router } from '@angular/router';
import { CallService } from '../call.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  userForm: any;
  submitted = false;

  constructor(
    private callService: CallService,
    private router: Router,
    private fb: FormBuilder
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
      isPublic: ['', Validators.required]
    });
  }

  create(){
    this.submitted = true;
    if(this.userForm.valid){
    this.callService.createUser(this.userForm.value).subscribe((res=>{
      this.router.navigate(['/users'])
    }
    ), err=> {
      console.log(err)
    })
  }
}

}
