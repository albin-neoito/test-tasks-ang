import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallService } from '../call.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {

  users: any;
  title = 'test-tasks-ang';
  constructor(
    private callService: CallService,
    private router: Router
    ) {}
  ngOnInit() {
     this.callService.getUsers()
    .subscribe((data) => {
    this.users = data
    console.log(data)
  });
  }

  getUser(id:any){
     this.router.navigate(['/users', id])
  }

}
