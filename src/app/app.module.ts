import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
//import { DatabaseJsonComponent } from './database.json/database.json.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
//import { InterfacesComponent } from './interfaces/interfaces.component';
import { NavComponent } from './nav/nav.component';
import { EventsComponent } from './events/events.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    //DatabaseJsonComponent,
    LoginComponent,
    RegistrationComponent,
    //InterfacesComponent,
    NavComponent,
    EventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
