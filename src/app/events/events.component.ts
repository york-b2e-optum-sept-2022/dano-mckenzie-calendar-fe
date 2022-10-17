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

  formValue!: FormGroup;
  eventsModelObject: EventsModel = new EventsModel();
  eventsData!: any;
  //toggles which buttons appear depending on the event
  toggleCreate!: boolean;
  toggleUpdate!: boolean;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      event: [''],
      date: [''],
      people: [''],
      notes: ['']
    })
    this.getAllEvents();
  }

  postEventDetails() {
    this.eventsModelObject.event = this.formValue.value.event;
    this.eventsModelObject.date = this.formValue.value.date;
    this.eventsModelObject.people = this.formValue.value.people;
    this.eventsModelObject.notes = this.formValue.value.notes;

    this.apiService.postEvent(this.eventsModelObject)
      .subscribe(res=> {
        console.log(res);
        alert("Event Added!")
        let ref = document.getElementById('close')
        ref?.click();
        this.formValue.reset();
        this.getAllEvents();
      }, err => {
        alert("Oops! Something went wrong.")
    })
  }

  getAllEvents() {
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
