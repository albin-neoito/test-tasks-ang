import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CallService } from '../call.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {
  title = 'test-tasks-ang';
  users: any;
  curPage = 1;
  pageSize = 10;
  total = 0;
  userSortForm: any;
  sortByType: any;
  sortByOrder: any;
  submitted = false;

  constructor(
    private callService: CallService,
    private router: Router,
    private fb: FormBuilder
    ) {}
  ngOnInit() {
    this.initializeForm();
     this.callService.getUsers()
    .subscribe((data) => {
    this.users = data
    this.total = this.users.length;
  });
  this.userSortForm.get('search').valueChanges.subscribe((val:any) => {
      if(val.length > 2){
        this.getUsers();
      }
  });

  }

  getUser(id:any){
     this.router.navigate(['/users', id])
  }

  getPage(item:number){
    this.curPage = item;
   this.getUsers()
  }


  getUsers(){
    this.callService.getUsers(this.curPage, this.pageSize, this.userSortForm.value.search, this.userSortForm.value.sortByType, this.userSortForm.value.sortByOrder)
    .subscribe((data) => {
    this.users = data
  });
  }

  initializeForm(){
    this.userSortForm = this.fb.group({
      search: [''],
      sortByType: ['', Validators.required],
      sortByOrder: ['', Validators.required],
    });
  }

  sortBy(){
    this.submitted = true;
    if(this.userSortForm.valid){
        this.getUsers();
    }
  }



}
