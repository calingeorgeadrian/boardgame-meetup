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
      game.imageUrl = g.imageUrl;
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
}
