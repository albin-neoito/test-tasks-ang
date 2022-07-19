import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CallService } from '../call.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit, OnDestroy {
  title = 'test-tasks-ang';
  users:any = [];
  curPage = 1;
  pageSize = 10;
  total = 0;
  sortByType: string | undefined;
  sortByOrder: string | undefined;
  search: string | undefined;
  submitted = false;
  img = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  userSortForm = this.fb.group({
    search: [''],
    sortByType: [''],
    sortByOrder: ['asc']
  });
  subscription!: Subscription;

  constructor(
    private callService: CallService,
    private fb: FormBuilder
    ) {}

    
  ngOnInit() {
    this.getUsers();
  this.userSortForm.get('search')!.valueChanges.subscribe((val:any) => {
    val = val.trim();
    this.search = val;
    this.getUsers();
  });

  this.userSortForm.get('sortByType')!.valueChanges.subscribe((val:any) => {
      this.sortByType = val;
      this.getUsers();
  });

  this.userSortForm.get('sortByOrder')!.valueChanges.subscribe((val:any) => {
    this.sortByOrder = val;
    this.getUsers();
});
  }

  getPage(item:number){
    this.curPage = item;
   this.getUsers()
  }


  getUsers(){
   this.subscription =  this.callService.getUsers(this.curPage, this.pageSize, this.search, this.sortByType, this.sortByOrder)
    .subscribe((data: any) => {
      this.total = data.headers.get('X-Total-Count');
    this.users = data.body;
  });
  }

  ngOnDestroy(): void {
    if(this.subscription){
    this.subscription.unsubscribe();
    }
  }

}
