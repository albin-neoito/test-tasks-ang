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
    this.setDefaultSettings();
    this.getUsers();
 
  }

  /**
   * @Description
   * Initialize the form and listen to search, sort by typem, sort by order fields 
   * and fetch real time results from the backend
   */
  initializeForm(){ 
    this.userSortForm = this.fb.group({
      search: [''],
      sortByType: ['createdAt'],
      sortByOrder: ['desc']
    });
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

  /**
   *  @Description
   *  To get nested pages in pagination 
   * * @param item
   *   event passed from pagination to know get the current page is clicked by the user
   */
  getPage(item:number){  
    this.curPage = item;
   this.getUsers()
  }


  /**
   * @Description
   * To list users based on pagination
   */
  getUsers(){ 
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

  /**
   * @Description
   * open delete confirm modal
   * @param event 
   * MouseEvent to avoid the nested click inside the element
   * @param id 
   * selected Id to be deleted from the current list
   */
  openDeleteModal(event:MouseEvent, id:number){ 
    event.stopPropagation();
    this.deleteId = id;
    setTimeout(() => {
      $("#deleteModal").modal('show');
    },100);
  }

/**
 * @Description
 * Delete the current user from the list
 */
  deleteRecord(){ 
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

/**
 * @Description
 * close or cancel the delete confirm modal
 */
  closeModal(){ 
    setTimeout(() => {
      $("#deleteModal").modal('hide');
    },100)
  }

/**
 * @Description
 *  Save current sort settings when redirect back to this page
 */
  saveSettings(){ 
    const settings = {
      search: this.search || null, 
      sortByType: this.sortByType,
      sortByOrder: this.sortByOrder,
      page: this.curPage
    };
    localStorage.setItem('userSettings', JSON.stringify(settings));
  }

/**
 * @Description
 * Function to check whether previous user settings such as search,order,type 
 * and set it for the corresponding fields for better user experience
 */
  setDefaultSettings(){
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
  }

  /**
   * Destroy the subscription call to avoid memory leak
   */

  ngOnDestroy(): void {
    if(this.subscription){
    this.subscription.unsubscribe();
    }
  }

}
