import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AppComponent} from "./app.component";
import {EventsComponent} from "./events/events.component";

//define the paths of my application components and routes them together
const routes: Routes = [
  //login is my default page, so application routes to this landing when opened
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path: 'login', component:LoginComponent},
  {path: 'registration', component:RegistrationComponent},
  {path: 'app', component:AppComponent},
  {path: 'events', component:EventsComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
