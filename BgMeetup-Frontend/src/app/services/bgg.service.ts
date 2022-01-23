import { Injectable } from "@angular/core";
import { GameModel } from "../models/game.model";

@Injectable({ providedIn: 'root' })
export class BGGService {
  req = new XMLHttpRequest();

  constructor() { }

  getUserCollection(username: string) {
    this.req.open("GET", "https://www.boardgamegeek.com/xmlapi2/collection?username=" + username + "&subtype=boardgame&own=1", false);
    this.req.send(null);
    var parser, xmlDoc;
    var games: GameModel[] = [];

    parser = new DOMParser();
    xmlDoc = parser.parseFromString(this.req.responseText, "text/xml");

    var items = xmlDoc.getElementsByTagName("item");

    for (let i = 0; i < items.length; i++) {
      var id = items[i].getAttribute('objectid');
      var title = items[i].getElementsByTagName('name')[0].innerHTML;
      var type = items[i].getAttribute('subtype');
      var image = (items[i].getElementsByTagName("image")[0] != undefined ? items[i].getElementsByTagName("image")[0].childNodes[0].nodeValue : null);
      var yearPublished = parseInt(items[i].getElementsByTagName("yearpublished")[0].innerHTML);
      games.push({
        id: id,
        title: title,
        type: type,
        image: image,
        description: null,
        minPlayers: null,
        maxPlayers: null,
        minPlayTime: null,
        maxPlayTime: null,
        complexity: null,
        year: yearPublished,
        isSelected: false
      });
    }

    return games;
  }

  getGame(id: any) {
    this.req.open("GET", "https://www.boardgamegeek.com/xmlapi2/thing?id=" + id + "&stats=1", false);
    this.req.send(null);
    var parser, xmlDoc;
    var game = new GameModel();

    parser = new DOMParser();
    xmlDoc = parser.parseFromString(this.req.responseText, "text/xml");

    game.id = xmlDoc.getElementsByTagName("item")[0].getAttribute('id');
    game.title = xmlDoc.getElementsByTagName("name")[0].getAttribute('value');
    game.type = xmlDoc.getElementsByTagName("item")[0].getAttribute('type');
    game.image = xmlDoc.getElementsByTagName("image")[0].childNodes[0].nodeValue;
    game.description = xmlDoc.getElementsByTagName("description")[0].innerHTML;
    game.minPlayers = xmlDoc.getElementsByTagName("minplayers")[0].getAttribute('value');
    game.maxPlayers = xmlDoc.getElementsByTagName("maxplayers")[0].getAttribute('value');
    game.minPlayTime = xmlDoc.getElementsByTagName("minplaytime")[0].getAttribute('value');
    game.maxPlayTime = xmlDoc.getElementsByTagName("maxplaytime")[0].getAttribute('value');
    game.complexity = xmlDoc.getElementsByTagName("averageweight")[0].getAttribute('value');
    game.year = xmlDoc.getElementsByTagName("yearpublished")[0].getAttribute('value');

    return game;
  }
}
