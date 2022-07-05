import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallService } from '../call.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user: any;
  id: any;
  
  constructor(
    private callService: CallService,
    private route: ActivatedRoute
    ) {}
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
this.callService.getUser(this.id)
    .subscribe((data) => {
    this.user = data
    console.log(data)
  });
  }

}

