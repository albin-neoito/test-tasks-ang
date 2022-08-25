import { Injectable } from '@angular/core';

@Injectable({
  providedIn : 'root'
})
export class AuthService {

  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || ('false'));

  /**
   * @Description
   * Function to set login status to true when user logged into the account
   * @param value 
   */
  setLoginStatus(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', this.loggedInStatus);
  }

  get LoginStatus() {
    return this.loggedInStatus;
  }

  
}