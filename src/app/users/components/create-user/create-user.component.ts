import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallService } from '../../../services/call.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit, OnDestroy {

  submitted = false;
  isDisabled = false;
  img = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  subscription!: Subscription;
  userForm!: FormGroup;

  constructor(
    private callService: CallService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  /** 
   * @Description
  Function to create user 
  */
  createUser() {
    this.submitted = true;
    console.log(this.userForm.value)
    if (this.userForm.valid) {
      this.isDisabled = true;
      this.userForm.controls['isPublic'].value === 'true' ? this.userForm.patchValue({ isPublic: true }) : this.userForm.patchValue({ isPublic: false });
      this.subscription = this.callService.createUser(this.userForm.value).subscribe({
        next: () => {
          this.toastr.success('User record created successfully', 'Success!');
          this.router.navigate(['/users'])
        }, error: (e) => {
          this.isDisabled = false;
          console.log(e)
        }
      });
    }
  }

  /**
   * @Description
   * Initialize the form
   */
  initializeForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      statusMessage: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      age: ['', Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])],
      isPublic: [true, Validators.required],
      avatarUrl: ['']
    });
  }

  /**
   * @Description
   * Destroy the subscription call to avoid memory leak
   */
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
