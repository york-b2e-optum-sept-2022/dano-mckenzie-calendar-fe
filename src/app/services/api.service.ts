import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
import {v4 as uuid} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  postEvent(data : any) {
    return this.http.post<any>("http://localhost:3000/events/", data)
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  getEvent() {
    return this.http.get<any>("http://localhost:3000/events/")
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  viewEvent(id: number) {
    console.log(id)
    return this.http.get<any>("http://localhost:3000/events/" + id)
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  updateEvent(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/events/" + id, data)
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  deleteEvent(id: number) {
    console.log(id)
    return this.http.delete<any>("http://localhost:3000/events/" + id)
      .pipe(map((res:any)=>{
        return res;
      }))
  }

}
