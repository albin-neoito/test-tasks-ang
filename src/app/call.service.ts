import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallService {

  constructor(private httpClient: HttpClient) { }

  getUsers(page?:number,size?:number,search?:string,sort?:string,order?:string){
    let url = `${environment.apiUrl}/users`;
    if(page){
      url = url + `?_page=${page}`
    }
    if(size){
      url = url + `&_limit=${size}`
    }
    if(search){
      url = url + `&q=${search}`
    }
    if(sort){
      url = url + `&_sort=${sort}`
    }
    if(order){
      url = url + `&_order=${order}`
    }
    return this.httpClient.get<any>(url, {
      observe: 'response'
  });
  }

  getUser(id:number | null | undefined | string): Observable<any>{
    return this.httpClient.get<any>(`${environment.apiUrl}/users/${id}`);
  }

  createUser(item:any){
    item.createdAt  = new Date(); 
    return this.httpClient.post(`${environment.apiUrl}/users`, item);
  }

  updateUser(item:any, id:number | null | undefined | string){ 
    return this.httpClient.put(`${environment.apiUrl}/users/${id}`, item);
  }

  deleteUser(id:number | null | undefined | string){ 
    return this.httpClient.delete(`${environment.apiUrl}/users/${id}`);
  }
}
