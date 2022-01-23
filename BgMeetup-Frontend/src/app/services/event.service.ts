import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { EventModel } from "../models/event.model";
import { EventParticipantModel } from "../models/eventParticipant.model";
import { SaveResult } from "../models/saveResult";

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
    event.participantsCount = 2;
    event.reqNumberOfPlayers = 4;
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
    event1.participantsCount = 2;
    event1.reqNumberOfPlayers = 4;
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

  saveEvent(eventModel: EventModel) {
    var saveResult = new SaveResult();
    saveResult.result = true;
    saveResult.errors = null;

    return saveResult;

    //let formData: FormData = new FormData();
    //formData.append('eventDetails', JSON.stringify(eventModel));

    //return this.http.post<any>(environment.apiUrl + '/events/SaveEventAsync', formData)
    //  .pipe(returnValue => {
    //    return returnValue;
    //  });
  }

  //getEventParticipants(id: any): Observable<ParticipantModel[]> {
  getEventParticipants(id: any): EventParticipantModel[] {
    var eventParticipants = [];

    var participant1 = new EventParticipantModel();
    participant1.id = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a5bbc";
    participant1.participantId = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3bbc";
    participant1.bggUsername = "RoyalFlush37";
    participant1.email = "calingeorgeadrian98@gmail.com";
    participant1.eventId = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3abc";
    participant1.name = "Calin George";
    participant1.status = 1;
    eventParticipants.push(participant1);

    var participant2 = new EventParticipantModel();
    participant2.id = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a5bbc";
    participant2.participantId = "1b77ba39-fb77-4bad-a44d-2aedcca9224c";
    participant2.bggUsername = "mateicristina";
    participant2.email = "cristinamatei@gmail.com";
    participant2.eventId = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3abc";
    participant2.name = "Matei Cristina";
    participant2.status = 1;
    eventParticipants.push(participant2);

    var participant3 = new EventParticipantModel();
    participant3.id = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a5bbc";
    participant3.participantId = "945dfb42-576b-4c35-b208-fac09a8bd12d";
    participant3.bggUsername = "weirdojax";
    participant3.email = "popandrei@gmail.com";
    participant3.eventId = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3abc";
    participant3.name = "Andrei Popa";
    participant3.status = 2;
    eventParticipants.push(participant3);

    var participant4 = new EventParticipantModel();
    participant4.id = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a5bbc";
    participant4.participantId = "9b68f712-feb5-4bcc-9e58-cf1f234fd8c0";
    participant4.bggUsername = "ema1ih";
    participant4.email = "ema1ih@gmail.com";
    participant4.eventId = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3abc";
    participant4.name = "Ema Hirhui";
    participant4.status = 0;
    eventParticipants.push(participant4);

    var participant5 = new EventParticipantModel();
    participant5.id = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a5bbc";
    participant5.participantId = "34f8aca4-646e-47f8-991c-24f8337f2035";
    participant5.bggUsername = "alexion";
    participant5.email = "alexion@gmail.com";
    participant5.eventId = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3abc";
    participant5.name = "Alexandru Ionescu";
    participant5.status = 1;
    eventParticipants.push(participant5);

    return eventParticipants;
    //return this.http.get<ParticipantModel[]>(environment.apiUrl + '/events/GetEventParticipantsAsync?eventId=' + id);
  }

/*  acceptEventInvitation(eventId: any, userId: any): Observable<any> {*/
  acceptEventInvitation(eventId: any, userId: any): any {
    var saveResult = new SaveResult();
    saveResult.result = true;
    saveResult.errors = null;

    return saveResult;
    //return this.http.get<any>(environment.apiUrl + '/events/AcceptEventInvitationAsync?eventId=' + eventId + '&userId=' + userId);
  }

/*  declineEventInvitation(eventId: any, userId: any): Observable<any> {*/
  declineEventInvitation(eventId: any, userId: any): any {
    var saveResult = new SaveResult();
    saveResult.result = true;
    saveResult.errors = null;

    return saveResult;
    //return this.http.get<any>(environment.apiUrl + '/events/DeclineEventInvitationAsync?eventId=' + eventId + '&userId=' + userId);
  }
}
