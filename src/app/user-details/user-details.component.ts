import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CallService } from '../call.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user: any;
  id: any;
  userEditForm: any;
  submitted= false;
  img = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  
  constructor(
    private callService: CallService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
    ) {}
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.initializeForm();
     this.callService.getUser(this.id)
    .subscribe((data) => {
      if(data){
    this.user = data;
    this.assignValuesToUserForm();
      }
  });
  }

  initializeForm(){
    this.userEditForm = this.fb.group({
      name: ['', Validators.required],
      statusMessage: ['' , Validators.required],
      email: ['' ,Validators.compose ([Validators.required,Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      age: ['', Validators.required],
      isPublic: ['', Validators.required],
      avatarUrl: ['']
    });
  }

  assignValuesToUserForm(){
    this.userEditForm.setValue({
      name: this.user?.name, 
      statusMessage : this.user?.statusMessage,
      email: this.user?.email,
      age: this.user?.age,
      isPublic: this.user?.isPublic,
      avatarUrl: this.user?.avatarUrl
    })
    this.img = this.user?.avatarUrl;
  }

  update(){
    this.submitted = true;
    if(this.userEditForm.valid){
    this.callService.updateUser(this.userEditForm.value, this.id).subscribe((res=>{
      this.router.navigate(['/users'])
    }
    ), err=> {
      console.log(err)
    })
  }
  }

}

