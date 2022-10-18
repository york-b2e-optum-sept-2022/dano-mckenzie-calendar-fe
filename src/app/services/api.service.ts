import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  //CRUD Operations for Events
  //used to get and set data from the database events

  //piped values to return final value that will display in template
  //(map) applies the function values as observables
  //map waits for response object of the pipe function to then return observable
  postEvent(data : any) {
    return this.http.post<any>("http://localhost:3000/events/", data)
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  //returns observable of Http resoponses
  getEvent() {
    return this.http.get<any>("http://localhost:3000/events/")
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  //listens for response data of specific id
  viewEvent(id: number) {
    console.log(id)
    return this.http.get<any>("http://localhost:3000/events/" + id)
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  //returns response of specific id and puts changed values
  updateEvent(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/events/" + id, data)
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  //deletes object based off the specific response from the id
  deleteEvent(id: number) {
    console.log(id)
    return this.http.delete<any>("http://localhost:3000/events/" + id)
      .pipe(map((res:any)=>{
        return res;
      }))
  }

}
