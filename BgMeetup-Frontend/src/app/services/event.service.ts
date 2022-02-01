import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { EventModel } from "../models/event.model";
import { EventParticipantModel } from "../models/eventParticipant.model";
import { LeaderboardScoreModel } from "../models/leaderboardScore.model";
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

  chooseGames(games: any[], eventId: any) {
    var saveResult = new SaveResult();
    saveResult.result = true;
    saveResult.errors = null;

    return saveResult;
  }

  checkIn(eventId: any, userId: any) {
    return this.http.get<any>(environment.apiUrl + '/events/checkIn/eventId=' + eventId + "/userId=" + userId);
  }

  confirm(eventId: any): Observable<SaveResult> {
    return this.http.get<SaveResult>(environment.apiUrl + '/events/confirm/' + eventId)
      .pipe(map(returnValue => {

        return returnValue;
      }));
  }

  submitLeaderboard(leaderboard: any[]) {
    return this.http.post<any>(environment.apiUrl + '/events/submitLeaderboard', leaderboard)
      .pipe(map(returnValue => {
        return returnValue;
      }));
  }

  getLeaderboard(eventId: any): Observable<LeaderboardScoreModel[]> {
    return this.http.get<LeaderboardScoreModel[]>(environment.apiUrl + '/events/getLeaderboard/' + eventId);
  }
}
