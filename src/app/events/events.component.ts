import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EventsModel} from "./events.model";
import {ApiService} from "../services/api.service";
import {subscribeOn} from "rxjs";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  modalRef: any;

  //formValue is of TYPE formGroup
  //tracks the values and formControl objects given through the event model
  //creates new instance of FormGroup named formValue
  formValue!: FormGroup;

  //creates new instance of the events model in order to store the inputted values
  //...to the database
  eventsModelObject: EventsModel = new EventsModel();
  eventsData!: any;
  //toggles which buttons appear depending on the event
  toggleCreate!: boolean;
  toggleUpdate!: boolean;

  //injects http service and formBuilder service
  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
    //uses the controls received from the event model and builds the view using formBuilder
    //formBuilder generates the controls for form itself, groups together the controls
    this.formValue = this.formBuilder.group({
      event: [''],
      date: [''],
      people: [''],
      notes: ['']
    })
    this.getAllEvents();
  }

  postEventDetails() {
    //takes the object of type eventsModel, emits the updated formValue to a new event object in the view
    this.eventsModelObject.event = this.formValue.value.event;
    this.eventsModelObject.date = this.formValue.value.date;
    this.eventsModelObject.people = this.formValue.value.people;
    this.eventsModelObject.notes = this.formValue.value.notes;

    this.apiService.postEvent(this.eventsModelObject)
      //subscribes to the return of the method and posts the new inputted values to the view
      .subscribe(res=> {
        console.log(res);
        alert("Event Added!")
          //references the close button to exit out of the create modal
        let ref = document.getElementById('close')
        ref?.click();
        //resets all values in modal after posting and returns a new value
        this.formValue.reset();
        this.getAllEvents();
      }, err => {
        alert("Oops! Something went wrong.")
    })
  }

  getAllEvents() {
    //subscribes to the return of the method
    //subscriptions listen for event to return observable
    //sets result of event to variable to then show on the events page
    this.apiService.getEvent()
      .subscribe(res=> {
        this.eventsData = res;
      })
  }

  viewEvent(row: any) {
    this.toggleCreate = false;
    this.toggleUpdate = false;

    this.eventsModelObject.id = row.id;
    this.formValue.controls['event'].setValue(row.event);
    this.formValue.controls['date'].setValue(row.date);
    this.formValue.controls['people'].setValue(row.people);
    this.formValue.controls['notes'].setValue(row.notes);
  }

  eventAdded() {
    this.formValue.reset();
    this.toggleCreate = true;
    this.toggleUpdate = false;
  }

  editEvent(row: any) {
    this.toggleCreate = false;
    this.toggleUpdate = true;

    this.eventsModelObject.id = row.id;
    //.setValue() method replaces and emits the new value
    //can only be used when accessing the form values
    this.formValue.controls['event'].setValue(row.event);
    this.formValue.controls['date'].setValue(row.date);
    this.formValue.controls['people'].setValue(row.people);
    this.formValue.controls['notes'].setValue(row.notes);
  }

  updateEventDetails() {
    this.eventsModelObject.event = this.formValue.value.event;
    this.eventsModelObject.date = this.formValue.value.date;
    this.eventsModelObject.people = this.formValue.value.people;
    this.eventsModelObject.notes = this.formValue.value.notes;

    this.apiService.updateEvent(this.eventsModelObject, this.eventsModelObject.id)
    .subscribe( res => {
      alert("Event Updated");
      let ref = document.getElementById('close')
      ref?.click();
      //resets and returns a new value once event is updated
      this.formValue.reset();
      this.getAllEvents();
    })
  }

  deleteEvent(row: any) {
    console.log(row)
    this.apiService.deleteEvent(row.id)
      .subscribe(res => {
        //this.eventsData = res;
        alert("Event Deleted");
        this.getAllEvents();
      })
  }

  displayStyle: any;

  openPopup() {
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }
}
