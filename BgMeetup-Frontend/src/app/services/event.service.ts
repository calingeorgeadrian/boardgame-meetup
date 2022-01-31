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

  getEvent(id: any): Observable<EventModel> {
    return this.http.get<EventModel>(environment.apiUrl + '/events/get/' + id)
      .pipe(map(returnValue => {

        return returnValue;
      }));
  }

  getEvents(id: any): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(environment.apiUrl + '/events/all/' + id)
      .pipe(map(returnValue => {

        return returnValue;
      }));
  }

  create(eventModel: EventModel) {
    return this.http.post<any>(environment.apiUrl + '/events/create', eventModel)
      .pipe(map(returnValue => {
        return returnValue;
      }));
  }

  update(eventModel: EventModel) {
    return this.http.post<any>(environment.apiUrl + '/events/update', eventModel)
      .pipe(returnValue => {
        return returnValue;
      });
  }

  join(eventId: any, userId: any): Observable<SaveResult> {
    return this.http.get<SaveResult>(environment.apiUrl + '/events/join/eventId=' + eventId + "/userId=" + userId)
      .pipe(map(returnValue => {

        return returnValue;
      }));
  }

  leave(eventId: any, userId: any): Observable<SaveResult> {
    return this.http.get<SaveResult>(environment.apiUrl + '/events/leave/eventId=' + eventId + "/userId=" + userId)
      .pipe(map(returnValue => {

        return returnValue;
      }));
  }

  cancel(eventId: any): Observable<SaveResult> {
    return this.http.get<SaveResult>(environment.apiUrl + '/events/cancel/' + eventId)
      .pipe(map(returnValue => {

        return returnValue;
      }));
  }

  getParticipants(id: any): Observable<EventParticipantModel[]> {
    return this.http.get<EventParticipantModel[]>(environment.apiUrl + '/events/getParticipants/' + id);
  }

  invite(participantModel: EventParticipantModel) {
    return this.http.post<any>(environment.apiUrl + '/events/invite', participantModel)
      .pipe(returnValue => {
        return returnValue;
      });
  }

  acceptInvitation(eventId: any, userId: any): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/events/acceptInvitation/eventId=' + eventId + "/userId=" + userId);
  }

  declineInvitation(eventId: any, userId: any): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/events/declineInvitation/eventId=' + eventId + "/userId=" + userId);
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
      game.image = g.imageUrl;
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
      game.image = g.imageUrl;
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
}
