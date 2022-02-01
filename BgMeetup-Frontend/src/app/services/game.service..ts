import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { GameModel } from "../models/game.model";
import { ProposedGameModel } from "../models/proposedGame.model";
import { SaveResult } from "../models/saveResult";
import { VoteModel } from "../models/vote.model";
import { BGGService } from "./bgg.service";

@Injectable({ providedIn: 'root' })
export class GameService {

  constructor(private http: HttpClient,
    private bggService: BGGService,
    private sanitizer: DomSanitizer) {
  }

  get(id: any): Observable<GameModel> {
    return this.http.get<GameModel>(environment.apiUrl + '/games/' + id)
      .pipe(map(returnValue => {
        return returnValue;
      }));
  }

  getCollection(userId: any): Observable<GameModel[]> {
    return this.http.get<GameModel[]>(environment.apiUrl + '/games/collection/' + userId)
      .pipe(map(returnValue => {
        return returnValue;
      }));
  }

  importCollection(userId: any, games: GameModel[]) {
    return this.http.post<any>(environment.apiUrl + '/games/import/' + userId, games)
      .pipe(map(returnValue => {
        return returnValue;
      }));
  }

  proposeGames(eventId: any, userId: any, games: any[]) {
    return this.http.post<any>(environment.apiUrl + '/games/proposeGames/eventId=' + eventId + "/userId=" + userId, games)
      .pipe(map(returnValue => {
        return returnValue;
      }));
  }

  getProposedGames(id: any): Observable<ProposedGameModel[]> {
    return this.http.get<ProposedGameModel[]>(environment.apiUrl + '/games/getProposedGames/' + id);
  }

  voteGames(eventId: any, userId: any, votes: any[]) {
    return this.http.post<any>(environment.apiUrl + '/games/voteGames/eventId=' + eventId + "/userId=" + userId, votes)
      .pipe(map(returnValue => {
        return returnValue;
      }));
  }

  getVotedGames(id: any): Observable<VoteModel[]> {
    return this.http.get<VoteModel[]>(environment.apiUrl + '/games/getVotedGames/' + id);
  }

  chooseGames(eventId: any, games: any[]) {
    return this.http.post<any>(environment.apiUrl + '/games/chooseGames/eventId=' + eventId, games)
      .pipe(map(returnValue => {
        return returnValue;
      }));
  }
}
