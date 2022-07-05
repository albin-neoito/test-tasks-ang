import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ChildActivationStart, Router } from '@angular/router';
import { CallService } from '../call.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  userForm: any;

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
      name: [''],
      statusMessage: [''],
      email: [''],
      age: [''],
      isPublic: ['']
    });
  }

  create(){
    this.callService.createUser(this.userForm.value).subscribe((res=>
      this.router.navigate(['/users'])
    ), err=> {
      console.log(err)
    })
  }

}
