import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //explain FormGroup
  public loginForm!: FormGroup
  //explain
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      //why validators?
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    this.http.get<any>("http://localhost:3000/users")
      .subscribe(res=> {
        const user = res.find((a: any) => {
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
          //checks value of loginForm email and password match database and returns
        });
        if(user) {
          alert("Login Success!");
          this.loginForm.reset();
          this.router.navigate(['events'])
        } else {
          alert("User not found!")
        }
      }, err=> {
        alert("Oops! Something went wrong.")
      })
  }
}
