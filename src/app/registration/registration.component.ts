import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public regForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.regForm = this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      password:['']
    })
  }

  register() {
    this.http.post<any>("http://localhost:3000/users", this.regForm.value)
      .subscribe( res => {
        alert("You're all signed up!");
        this.regForm.reset();
        this.router.navigate(['login']);
      }, err=> {
        alert("Oops! Something went wrong.")
      })
  }

}
