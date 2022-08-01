import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CallService } from '../../../services/call.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { user } from "./../../../interfaces/user";
declare var $: any;

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit, OnDestroy {

  title = 'test-tasks-ang';
  users!:user[];
  curPage = 1;
  pageSize = 10;
  total = 0;
  sortByType: string | undefined;
  sortByOrder: string | undefined;
  search: string | undefined;
  submitted = false;
  isLoading = true;
  img = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  userSortForm! : FormGroup;
  subscription!: Subscription;
  deleteId!: number;
  isDisabled = false;

  constructor(
    private callService: CallService,
    private fb: FormBuilder
    ) {}

    
  ngOnInit() {
    this.initializeForm();
    if(localStorage.getItem('userSettings')){
      let settings:any = localStorage.getItem('userSettings');
       settings = JSON.parse(settings);
    this.userSortForm.patchValue({
      search : settings?.search,
      sortByOrder: settings?.sortByOrder,
      sortByType: settings?.sortByType
    })
    this.search = settings?.search;
    this.sortByOrder = settings?.sortByOrder;
    this.sortByType = settings?.sortByType;
    this.curPage = settings?.page;
    }
    this.sortByOrder = !this.sortByOrder ? 'desc': this.sortByOrder;
    this.sortByType = !this.sortByType ? 'createdAt': this.sortByType;
    this.getUsers();
  this.userSortForm.get('search')!.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged()
  ).subscribe(
    (val:any) => {
      val = val.trim();
      this.search = val;
      this.getUsers();
    }
  );
  this.userSortForm.get('sortByType')!.valueChanges.subscribe((val:any) => {
      this.sortByType = val;
      this.getUsers();
  });

  this.userSortForm.get('sortByOrder')!.valueChanges.subscribe((val:any) => {
    this.sortByOrder = val;
    this.getUsers();
});
  }

  initializeForm(){ /* Initialize the form */
    this.userSortForm = this.fb.group({
      search: [''],
      sortByType: ['createdAt'],
      sortByOrder: ['desc']
    });
  }

  getPage(item:number){  /* To get nested pages in pagination */
    this.curPage = item;
   this.getUsers()
  }


  getUsers(){ /* To list users based on pagination */
    this.isLoading = true;
   this.subscription =  this.callService.getUsers(this.curPage, this.pageSize, this.search, this.sortByType, this.sortByOrder)
    .subscribe({
      next:(data)  => {
      this.isLoading = false;
      this.total = data.headers.get('X-Total-Count');
      this.users = data.body;
      },
      error: (e) => {
        console.error(e)
        this.isLoading = false;
      }
  });
  }

  ngOnDestroy(): void {
    if(this.subscription){
    this.subscription.unsubscribe();
    }
  }

  openDeleteModal(event:any, id:number){ /* open delete confirm modal */
    event.stopPropagation();
    this.deleteId = id;
    setTimeout(() => {
      $("#deleteModal").modal('show');
    },100);
  }


  deleteRecord(){ /* Delete the current user from the list */
    if(this.deleteId){
      this.isDisabled = true;
    this.subscription = this.callService.deleteUser(this.deleteId).subscribe({
    next: () => { 
      setTimeout(() => {
            $("#deleteModal").modal('hide');
            this.getUsers();
            this.isDisabled = false;
          },100)
    },
    error: (e) => {
      console.error(e)
      this.isDisabled = false;
    }
    })
  }
  }

  closeModal(){ /* close or cancel the delete confirm modal */
    setTimeout(() => {
      $("#deleteModal").modal('hide');
    },100)
  }

  saveSettings(){ /* save current sort settings when redirect back to this page*/
    const settings = {
      search: this.search || null, 
      sortByType: this.sortByType,
      sortByOrder: this.sortByOrder,
      page: this.curPage
    };
    localStorage.setItem('userSettings', JSON.stringify(settings));
  }

}
