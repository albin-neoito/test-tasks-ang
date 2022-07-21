import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  msg = '';
  constructor() { }

  ngOnInit(): void {
    console.log(navigator.onLine)
    if(navigator.onLine){
     this.msg = '404 Page Not found';
    } else {
      this.msg = 'Internet is interrupted'
    }
  }


}
