import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CallService {

  constructor(private httpClient: HttpClient) { }

  getUsers(page?:number,size?:number,search?:any,sort?:string,order?:string){
    let url = `${environment.apiUrl}/users`;
    if(page){
      url = url + `?_page=${page}`
    }
    if(size){
      url = url + `&_limit=${size}`
    }
    if(search){
      url = url + `&_search=${search}`
    }
    if(sort){
      url = url + `&_sort=${sort}`
    }
    if(order){
      url = url + `&_order=${order}`
    }
    return this.httpClient.get(url);
  }

  getUser(id:number){
    return this.httpClient.get(`${environment.apiUrl}/users/${id}`);
  }

  createUser(item:any){
    item.createdAt  = new Date(); 
    return this.httpClient.post(`${environment.apiUrl}/users`, item);
  }
}
