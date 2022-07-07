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
  img = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  constructor(
    private callService: CallService,
    private router: Router,
    private fb: FormBuilder
    ) {}
  ngOnInit() {
    this.initializeForm();
     this.callService.getUsers()
    .subscribe((data) => {
    this.users = data.body;
    this.total = this.users.length;
  });
  this.userSortForm.get('search').valueChanges.subscribe((val:any) => {
    val = val.trim();
      if(val.length > 2){
        this.getUsers();
      } else if(!val){
        this.getUsers();
      }
  });

  this.userSortForm.get('sortByType').valueChanges.subscribe((val:any) => {
      this.sortByType = val;
      this.getUsers();
  });

  this.userSortForm.get('sortByOrder').valueChanges.subscribe((val:any) => {
    this.sortByOrder = val;
    this.getUsers();
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
    this.callService.getUsers(this.curPage, this.pageSize, this.userSortForm.value.search, this.sortByType, this.sortByOrder)
    .subscribe((data: any) => {
      this.total = data.headers.get('X-Total-Count');
    this.users = data.body;
  });
  }

  initializeForm(){
    this.userSortForm = this.fb.group({
      search: [''],
      sortByType: [''],
      sortByOrder: [''],
    });
  }




}
