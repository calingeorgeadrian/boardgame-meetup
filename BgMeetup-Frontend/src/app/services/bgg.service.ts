import { Injectable } from "@angular/core";
import { GameModel } from "../models/game.model";

@Injectable({ providedIn: 'root' })
export class BGGService {
  req = new XMLHttpRequest();

  constructor() { }

  getUserCollection(username: string) {
    var games: GameModel[] = [];

    try {
      this.req.open("GET", "https://www.boardgamegeek.com/xmlapi2/collection?username=" + username + "&subtype=boardgame&own=1&stats=1", false);
      this.req.send(null);
      var parser, xmlDoc;

      parser = new DOMParser();
      xmlDoc = parser.parseFromString(this.req.responseText, "text/xml");

      var items = xmlDoc.getElementsByTagName("item");

    for (let i = 0; i < items.length; i++) {
      var id = items[i].getAttribute('objectid');
      var type = items[i].getAttribute('subtype');
      var title = items[i].getElementsByTagName('name')[0].innerHTML;
      var year = (items[i].getElementsByTagName("yearpublished")[0] != undefined ? items[i].getElementsByTagName("yearpublished")[0].innerHTML : 2040);
      var imageUrl = (items[i].getElementsByTagName("image")[0] != undefined ? items[i].getElementsByTagName("image")[0].childNodes[0].nodeValue : null);
      var minPlayers = (items[i].getElementsByTagName("stats")[0].getAttribute('minplayers'));
      var maxPlayers = (items[i].getElementsByTagName("stats")[0].getAttribute('maxplayers'));
      var minPlayingTime = (items[i].getElementsByTagName("stats")[0].getAttribute('minplaytime') != undefined ? items[i].getElementsByTagName("stats")[0].getAttribute('minplaytime') : 0);
      var maxPlayingTime = (items[i].getElementsByTagName("stats")[0].getAttribute('maxplaytime') != undefined ? items[i].getElementsByTagName("stats")[0].getAttribute('maxplaytime') : 0);
      games.push({
        id: null,
        bggId: id,
        title: title,
        type: type,
        imageUrl: imageUrl,
        description: null,
        minPlayers: minPlayers,
        maxPlayers: maxPlayers,
        minPlayTime: minPlayingTime,
        maxPlayTime: maxPlayingTime,
        complexity: 0,
        year: year,
        isSelected: false
      });
      }
    }
    catch (error) {
      console.log(error);
      console.log("could not retrieve collection for username " + username);
    }

    return games;
  }

  getGame(id: any) {
    var game = new GameModel();

    try {
      this.req.open("GET", "https://www.boardgamegeek.com/xmlapi2/thing?id=" + id + "&stats=1", false);
      this.req.send(null);
      var parser, xmlDoc;

      parser = new DOMParser();
      xmlDoc = parser.parseFromString(this.req.responseText, "text/xml");

      game.bggId = xmlDoc.getElementsByTagName("item")[0].getAttribute('id');
      game.title = xmlDoc.getElementsByTagName("name")[0].getAttribute('value');
      game.type = xmlDoc.getElementsByTagName("item")[0].getAttribute('type');
      game.imageUrl = xmlDoc.getElementsByTagName("image")[0].childNodes[0].nodeValue;
      game.description = xmlDoc.getElementsByTagName("description")[0].innerHTML;
      game.minPlayers = xmlDoc.getElementsByTagName("minplayers")[0].getAttribute('value');
      game.maxPlayers = xmlDoc.getElementsByTagName("maxplayers")[0].getAttribute('value');
      game.minPlayTime = xmlDoc.getElementsByTagName("minplaytime")[0].getAttribute('value');
      game.maxPlayTime = xmlDoc.getElementsByTagName("maxplaytime")[0].getAttribute('value');
      game.complexity = xmlDoc.getElementsByTagName("averageweight")[0].getAttribute('value');
      game.year = xmlDoc.getElementsByTagName("yearpublished")[0].getAttribute('value');

      return game;
    }
    catch (error) {
      console.log(error);
      console.log("could not retrieve info for game with id " + id);
      return null;
    }
  }
}
