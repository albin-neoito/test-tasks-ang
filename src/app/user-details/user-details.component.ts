import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CallService } from '../call.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit , OnDestroy{

  user: any = {};
  id: number | null | undefined | string;
  submitted= false;
  isLoading = true;
  isDisabled = false;
  deleteId: number | undefined;
  img = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  subscription!: Subscription;
  userEditForm = this.fb.group({
    name: ['', Validators.required],
    statusMessage: ['' , Validators.required],
    email: ['' ,Validators.compose ([Validators.required,Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
    age: ['', Validators.required],
    isPublic: ['', Validators.required],
    avatarUrl: ['']
  });
  
  constructor(
    private callService: CallService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
    ) {}
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
     this.subscription = this.callService.getUser(this.id)
    .subscribe((data) => {
      if(data){
    this.user = data;
    this.isLoading = false;
    this.assignValuesToUserForm();
      }
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
    this.img = (this.user?.avatarUrl) ? this.user.avatarUrl : this.img;
  }

  update(){
    this.submitted = true;
    if(this.userEditForm.valid){
      this.isDisabled = true;
    this.subscription = this.callService.updateUser(this.userEditForm.value, this.id).subscribe((res=>{
      this.toastr.success('user record updated successfully', 'Success!');
      this.router.navigate(['/users'])
    }
    ), err=> {
      this.isDisabled = false;
      console.log(err)
    })
  }
  }

  openDeleteModal(id:number){
    this.deleteId = id;
    setTimeout(() => {
      $("#deleteModal").modal('show');
    },100);
  }


  deleteRecord(){
    if(this.deleteId){
    this.subscription = this.callService.deleteUser(this.deleteId).subscribe({
    next: () => { 
      setTimeout(() => {
            $("#deleteModal").modal('hide');
            this.router.navigate(['/users'])
          },100)
    },
    error: (e) => console.error(e),
    })
  }
  }

  closeModal(){
    this.deleteId = 0;
    setTimeout(() => {
      $("#deleteModal").modal('hide');
    },100)
  }

  ngOnDestroy(): void {
    if(this.subscription){
    this.subscription.unsubscribe();
    }
  }

}

