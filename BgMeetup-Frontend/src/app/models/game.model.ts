export class GameModel {
  id: string;
  bggId: number;
  title: string;
  type: string;
  imageUrl: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  minPlayTime: number;
  maxPlayTime: number;
  complexity: number;
  year: number;
  isSelected: boolean;
}
