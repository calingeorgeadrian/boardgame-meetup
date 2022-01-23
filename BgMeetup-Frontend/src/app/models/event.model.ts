export class EventModel {
  id: string;
  title: string;
  date: Date;
  reqNumberOfPlayers: number;
  location: string;
  hostId: string;
  hostName: string;
  status: number;
  invitedBy: string;
  participantsCount: number;
}
