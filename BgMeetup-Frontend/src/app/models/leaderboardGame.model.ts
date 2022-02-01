import { LeaderboardScoreModel } from "./leaderboardScore.model";

export class LeaderboardGameModel {
  gameId: string;
  title: string;
  imageUrl: string;
  participantsScores: LeaderboardScoreModel[];
}
