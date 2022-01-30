import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { GameModel } from "../models/game.model";

@Injectable({ providedIn: 'root' })
export class GameService {

  constructor(private http: HttpClient,
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
}
