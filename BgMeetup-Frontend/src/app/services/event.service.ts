import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { EventModel } from "../models/event.model";
import { EventParticipantModel } from "../models/eventParticipant.model";

@Injectable({ providedIn: 'root' })
export class EventService {
  req = new XMLHttpRequest();

  constructor(
    private http: HttpClient) { }

  //getEvent(id: any): Observable<EventModel> {
  getEvent(id: any): EventModel {
    var event = new EventModel();
    event.date = new Date();
    event.hostId = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3bbc";
    event.hostName = "Calin George";
    event.id = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3abc";
    event.location = "Tulcea";
    event.participantsCount = 1;
    event.reqNumberOfPlayers = 2;
    event.status = 1;
    event.title = "Test 1";

    return event;

    //return this.http.get<EventModel>(environment.apiUrl + '/events/GetEventAsync?id=' + id)
    //  .pipe(map(returnValue => {

    //    return returnValue;
    //  }));
  }

  /*  getEvents(id: any): Observable<EventModel[]> {*/
  getEvents(id: any): EventModel[] {
    var events = [];

    var event1 = new EventModel();
    event1.date = new Date();
    event1.hostId = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3bbc";
    event1.hostName = "Calin George";
    event1.id = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3abc";
    event1.location = "Tulcea";
    event1.participantsCount = 1;
    event1.reqNumberOfPlayers = 2;
    event1.status = 1;
    event1.title = "Test 1";
    events.push(event1);

    var event2 = new EventModel();
    event2.date = new Date();
    event2.hostId = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3aac";
    event2.hostName = "Matei Cristina";
    event2.id = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3bac";
    event2.invitedBy = "Matei Cristina";
    event2.location = "Bucuresti";
    event2.participantsCount = 1;
    event2.reqNumberOfPlayers = 3;
    event2.status = 0;
    event2.title = "Test 2";
    events.push(event2);

    var event3 = new EventModel();
    event3.date = new Date();
    event3.hostId = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3aac";
    event3.hostName = "Matei Cristina";
    event3.id = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3ccc";
    event3.location = "Bucuresti";
    event3.participantsCount = 1;
    event3.reqNumberOfPlayers = 4;
    event3.status = 3;
    event3.title = "Test 3";
    events.push(event3);

    return events;

    //return this.http.get<EventModel[]>(environment.apiUrl + '/events/GetEventsAsync?userId=' + id)
    //  .pipe(map(returnValue => {

    //    return returnValue;
    //  }));
  }
}
