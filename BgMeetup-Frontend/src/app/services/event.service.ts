import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { EventModel } from "../models/event.model";
import { EventParticipantModel } from "../models/eventParticipant.model";
import { ProposedGameModel } from "../models/proposedGame.model";
import { SaveResult } from "../models/saveResult";
import { BGGService } from "./bgg.service";

@Injectable({ providedIn: 'root' })
export class EventService {
  req = new XMLHttpRequest();

  constructor(
    private http: HttpClient,
    private bggService: BGGService) { }

  //getEvent(id: any): Observable<EventModel> {
  getEvent(id: any): EventModel {
    var event = new EventModel();
    event.date = new Date();
    event.hostId = "84aafcd9-9df7-4676-9499-fe0bf897bdab";
    event.hostName = "Calin George";
    event.id = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3abc";
    event.location = "Tulcea";
    event.participantsCount = 2;
    event.reqNumberOfPlayers = 4;
    event.status = 1;
    event.title = "Test 1";

    return event;

    //return this.http.get<EventModel>(environment.apiUrl + '/event/get/' + id)
    //  .pipe(map(returnValue => {

    //    return returnValue;
    //  }));
  }

  getEvents(id: any): Observable<EventModel[]> {
  //getEvents(id: any): EventModel[] {
  //  var events = [];

  //  var event1 = new EventModel();
  //  event1.date = new Date();
  //  event1.hostId = "84aafcd9-9df7-4676-9499-fe0bf897bdab";
  //  event1.hostName = "Calin George";
  //  event1.id = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3abc";
  //  event1.location = "Tulcea";
  //  event1.participantsCount = 2;
  //  event1.reqNumberOfPlayers = 4;
  //  event1.status = 1;
  //  event1.title = "Test 1";
  //  events.push(event1);

  //  var event2 = new EventModel();
  //  event2.date = new Date();
  //  event2.hostId = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3aac";
  //  event2.hostName = "Matei Cristina";
  //  event2.id = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3bac";
  //  event2.invitedBy = "Matei Cristina";
  //  event2.location = "Bucuresti";
  //  event2.participantsCount = 1;
  //  event2.reqNumberOfPlayers = 3;
  //  event2.status = 0;
  //  event2.title = "Test 2";
  //  events.push(event2);

  //  var event3 = new EventModel();
  //  event3.date = new Date();
  //  event3.hostId = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3aac";
  //  event3.hostName = "Matei Cristina";
  //  event3.id = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3ccc";
  //  event3.location = "Bucuresti";
  //  event3.participantsCount = 1;
  //  event3.reqNumberOfPlayers = 4;
  //  event3.status = 3;
  //  event3.title = "Test 3";
  //  events.push(event3);

  //  return events;

    return this.http.get<EventModel[]>(environment.apiUrl + '/event/all/userId=' + id)
      .pipe(map(returnValue => {

        return returnValue;
      }));
  }

  saveEvent(eventModel: EventModel) {
    //var saveResult = new SaveResult();
    //saveResult.result = true;
    //saveResult.errors = null;

    //return saveResult;

    return this.http.post<any>(environment.apiUrl + '/event/create', eventModel)
      .pipe(returnValue => {
        return returnValue;
      });
  }

  //getEventParticipants(id: any): Observable<ParticipantModel[]> {
  getEventParticipants(id: any): EventParticipantModel[] {
    var eventParticipants = [];

    var participant1 = new EventParticipantModel();
    participant1.id = "84aafcd9-9df7-4676-9499-fe0bf897bdab";
    participant1.participantId = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3bbc";
    participant1.bggUsername = "RoyalFlush37";
    participant1.email = "calingeorgeadrian98@gmail.com";
    participant1.eventId = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3abc";
    participant1.name = "Calin George";
    participant1.status = 1;
    eventParticipants.push(participant1);

    var participant2 = new EventParticipantModel();
    participant2.id = "84aafcd9-9df7-4676-9499-fe0bf897bdab";
    participant2.participantId = "1b77ba39-fb77-4bad-a44d-2aedcca9224c";
    participant2.bggUsername = "iseoni";
    participant2.email = "cristinamatei@gmail.com";
    participant2.eventId = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3abc";
    participant2.name = "Matei Cristina";
    participant2.status = 1;
    eventParticipants.push(participant2);

    var participant3 = new EventParticipantModel();
    participant3.id = "84aafcd9-9df7-4676-9499-fe0bf897bdab";
    participant3.participantId = "945dfb42-576b-4c35-b208-fac09a8bd12d";
    participant3.bggUsername = "weirdojax";
    participant3.email = "popandrei@gmail.com";
    participant3.eventId = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3abc";
    participant3.name = "Andrei Popa";
    participant3.status = 2;
    eventParticipants.push(participant3);

    var participant4 = new EventParticipantModel();
    participant4.id = "84aafcd9-9df7-4676-9499-fe0bf897bdab";
    participant4.participantId = "9b68f712-feb5-4bcc-9e58-cf1f234fd8c0";
    participant4.bggUsername = "liviubarbacaru";
    participant4.email = "ema1ih@gmail.com";
    participant4.eventId = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3abc";
    participant4.name = "Ema Hirhui";
    participant4.status = 0;
    eventParticipants.push(participant4);

    var participant5 = new EventParticipantModel();
    participant5.id = "84aafcd9-9df7-4676-9499-fe0bf897bdab";
    participant5.participantId = "34f8aca4-646e-47f8-991c-24f8337f2035";
    participant5.bggUsername = "asgardian28";
    participant5.email = "alexion@gmail.com";
    participant5.eventId = "1cae9b1b-b7a2-46a2-a43d-9bd54d7a3abc";
    participant5.name = "Alexandru Ionescu";
    participant5.status = 1;
    eventParticipants.push(participant5);

    return eventParticipants;
    //return this.http.get<ParticipantModel[]>(environment.apiUrl + '/events/GetEventParticipantsAsync?eventId=' + id);
  }

  sendEventInvitation(participantModel: EventParticipantModel) {
    var saveResult = new SaveResult();
    saveResult.result = true;
    saveResult.errors = null;

    return saveResult;

    //let formData: FormData = new FormData();
    //formData.append('participantDetails', JSON.stringify(participantModel));

    //return this.http.post<any>(environment.apiUrl + '/events/SendEventInvitationAsync', formData)
    //  .pipe(returnValue => {
    //    return returnValue;
    //  });
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

  //getEventProposedGames(id: any): Observable<ProposedGameModel[]> {
  getEventProposedGames(id: any): ProposedGameModel[] {
    var games = [];

    var proposers = [{ id: "49125c98-1aa6-4763-8e29-8de47b3b2512", name: "Calin George" }, { id: "df42cc31-c2c2-4fb2-9182-d601282e30ec", name: "Hirhui Ema" }, { id: "ed49c1cc-09d4-4f73-9a71-9d0035e616ce", name: "Matei Cristina" }]
    var bggCollectionGames = this.bggService.getUserCollection("asgardian28");

    bggCollectionGames.forEach(g => {
      var proposer = proposers[Math.floor(Math.random() * proposers.length)];
      var game = new ProposedGameModel();
      game.gameId = g.id;
      game.title = g.title;
      game.image = g.image;
      game.ownerId = proposers[Math.floor(Math.random() * proposers.length)].id;
      game.proposerId = proposer.id;
      game.proposerName = proposer.name;
      game.votes = Math.abs(g.year - 2000);

      games.push(game);
    });

    games.sort(function (a, b) {
      return (a.votes > b.votes) ? -1 : (a.votes < b.votes) ? 1 : 0;
    });

    return games;

    //return this.http.get<ProposedGameModel[]>(environment.apiUrl + '/events/getEventProposedGamesAsync?eventId=' + id);
  }

  //getEventProposedGames(id: any): Observable<ProposedGameModel[]> {
  getEventChoosenGames(id: any): ProposedGameModel[] {
    var games = [];

    var proposers = [{ id: "49125c98-1aa6-4763-8e29-8de47b3b2512", name: "Calin George" }, { id: "df42cc31-c2c2-4fb2-9182-d601282e30ec", name: "Hirhui Ema" }, { id: "ed49c1cc-09d4-4f73-9a71-9d0035e616ce", name: "Matei Cristina" }]
    var bggCollectionGames = this.bggService.getUserCollection("asgardian28").slice(0, 3);

    bggCollectionGames.forEach(g => {
      var proposer = proposers[Math.floor(Math.random() * proposers.length)];
      var game = new ProposedGameModel();
      game.gameId = g.id;
      game.title = g.title;
      game.image = g.image;
      game.ownerId = proposers[Math.floor(Math.random() * proposers.length)].id;
      game.proposerId = proposer.id;
      game.proposerName = proposer.name;
      game.votes = Math.abs(g.year - 2000);

      games.push(game);
    });

    games.sort(function (a, b) {
      return (a.votes > b.votes) ? -1 : (a.votes < b.votes) ? 1 : 0;
    });

    return games;

    //return this.http.get<ProposedGameModel[]>(environment.apiUrl + '/events/getEventProposedGamesAsync?eventId=' + id);
  }

  submitProposals(votes: any[], proposerId: any) {
    var saveResult = new SaveResult();
    saveResult.result = true;
    saveResult.errors = null;

    return saveResult;

    //return this.http.post<any>(environment.apiUrl + '/events/submitProposalsAsync?voterId=' + voterId, votes)
    //  .pipe(map(returnValue => {
    //    return returnValue;
    //  }));
  }

  submitVotes(votes: any[], voterId: any) {
    var saveResult = new SaveResult();
    saveResult.result = true;
    saveResult.errors = null;

    return saveResult;
  }

  chooseGames(games: any[], eventId: any) {
    var saveResult = new SaveResult();
    saveResult.result = true;
    saveResult.errors = null;

    return saveResult;
  }

  checkInParticipant(participantId: string, eventId: string) {
    var saveResult = new SaveResult();
    saveResult.result = true;
    saveResult.errors = null;

    return saveResult;
  }

  confirmEvent(eventId: string) {
    var saveResult = new SaveResult();
    saveResult.result = true;
    saveResult.errors = null;

    return saveResult;
  }

  cancelEvent(eventId: string) {
    var saveResult = new SaveResult();
    saveResult.result = true;
    saveResult.errors = null;

    return saveResult;
  }

  leaveEvent(participantId: string, eventId: string) {
    var saveResult = new SaveResult();
    saveResult.result = true;
    saveResult.errors = null;

    return saveResult;
  }
}
