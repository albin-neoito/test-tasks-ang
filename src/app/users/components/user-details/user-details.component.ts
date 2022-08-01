import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CallService } from '../../../services/call.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { user } from 'src/app/interfaces/user';
declare var $: any;

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit , OnDestroy{

  user!: user;
  id: number | null | undefined | string;
  query:any;
  submitted= false;
  isLoading = true;
  isDisabled = false;
  deleteId: number | undefined;
  img = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  subscription!: Subscription;
  userEditForm! :FormGroup;
  
  constructor(
    private callService: CallService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
    ) {}
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.initializeForm();
    console.log(this.query)
     this.subscription = this.callService.getUser(this.id)
    .subscribe({
      next: (data) => {
      if(data){
    this.user = data;
    this.isLoading = false;
    this.assignValuesToUserForm();
      }
  }
});

  }


  initializeForm(){ /* initialize form values */
    this.userEditForm = this.fb.group({
      name: ['', Validators.required],
      statusMessage: ['' , Validators.required],
      email: ['' ,Validators.compose ([Validators.required,Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      age: ['', Validators.required],
      isPublic: [null, Validators.required],
      avatarUrl: ['']
    });
  }

  assignValuesToUserForm(){ /* assign api values to form fields */
    this.userEditForm.setValue({
      name: this.user?.name, 
      statusMessage : this.user?.statusMessage,
      email: this.user?.email,
      age: this.user?.age,
      isPublic: this.user?.isPublic ? "true" : "false",
      avatarUrl: this.user?.avatarUrl || null
    })
    this.img = (this.user?.avatarUrl) ? this.user.avatarUrl : this.img;
  }

  update(){  /* update the details of current user */
    this.submitted = true;
    if(this.userEditForm.valid){
      this.isDisabled = true;
      let data = this.userEditForm.value;
      if( this.userEditForm.controls['isPublic'].value === 'true'){
        data.isPublic = true;
      } else {
        data.isPublic = false;
      }
      data.createdAt =  this.user?.createdAt;
      console.log(data)
    this.subscription = this.callService.updateUser(data, this.id).subscribe({
     next:()=> { this.toastr.success('user record updated successfully', 'Success!');
      this.router.navigate(['/users'])
    }, error: (e)=> {
      this.isDisabled = false;
      console.log(e)
    }
  })
  }
  }

  openDeleteModal(id:number){  /* open delete confirm modal */
    this.deleteId = id;
    setTimeout(() => {
      $("#deleteModal").modal('show');
    },100);
  }


  deleteRecord(){ /* delete current user record */
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

  closeModal(){ /* cancel or close the delete confirm modal */
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

