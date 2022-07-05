import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CallService {

  constructor(private httpClient: HttpClient) { }

  getUsers(){
    return this.httpClient.get(`${environment.apiUrl}/users`);
  }

  getUser(id:number){
    return this.httpClient.get(`${environment.apiUrl}/users/${id}`);
  }

  createUser(item:any){
    console.log(item)
    return this.httpClient.post(`${environment.apiUrl}/users`, item);
  }
}
