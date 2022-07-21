import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CallService } from '../call.service';
declare var $: any;

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
  isLoading = true;
  img = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  userSortForm = this.fb.group({
    search: [''],
    sortByType: ['createdAt'],
    sortByOrder: ['desc']
  });
  subscription!: Subscription;
  deleteId!: number;
  isDisabled = false;

  constructor(
    private callService: CallService,
    private fb: FormBuilder,
    private router: Router
    ) {}

    
  ngOnInit() {
    this.sortByOrder = !this.sortByOrder ? 'desc': this.sortByOrder;
    this.sortByType = !this.sortByType ? 'createdAt': this.sortByType;
    this.getUsers();
    console.log(this.sortByOrder)
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

  getPage(item:any){
    this.curPage = item;
   this.getUsers()
  }


  getUsers(){
    this.isLoading = true;
   this.subscription =  this.callService.getUsers(this.curPage, this.pageSize, this.search, this.sortByType, this.sortByOrder)
    .subscribe((data: any) => {
      this.isLoading = false;
      this.total = data.headers.get('X-Total-Count');
      this.users = data.body;
  });
  }

  ngOnDestroy(): void {
    if(this.subscription){
    this.subscription.unsubscribe();
    }
  }

  openDeleteModal(event:any, id:number){
    event.stopPropagation();
    this.deleteId = id;
    setTimeout(() => {
      $("#deleteModal").modal('show');
    },100);
  }


  deleteRecord(){
    if(this.deleteId){
      this.isDisabled = true;
    this.subscription = this.callService.deleteUser(this.deleteId).subscribe({
    next: () => { 
      setTimeout(() => {
            $("#deleteModal").modal('hide');
            this.getUsers();
            this.router.navigate(['/users'])
          },100)
    },
    error: (e) => {
      console.error(e)
      this.isDisabled = false;
    }
    })
  }
  }

  closeModal(){
    setTimeout(() => {
      $("#deleteModal").modal('hide');
    },100)
  }

}
