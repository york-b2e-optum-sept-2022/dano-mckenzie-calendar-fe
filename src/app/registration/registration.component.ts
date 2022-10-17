import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
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
      firstName:['', Validators.required],
      lastName:['',Validators.required],
      email:['', Validators.required],
      password:['', Validators.required]
    })
  }

  //posts inputed user information from the registration form to the database using .post
  register() {
    this.http.post<any>("http://localhost:3000/users", this.regForm.value)
      .subscribe( res => {
        alert("You're all signed up!");
        this.regForm.reset();
        //form resets and navigates to the login page using routing
        this.router.navigate(['login']);
      }, err=> {
        alert("Oops! Something went wrong.")
      })
  }

}
