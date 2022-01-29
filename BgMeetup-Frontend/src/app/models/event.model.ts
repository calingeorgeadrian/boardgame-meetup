export class EventModel {
  id: string;
  title: string;
  date: Date;
  dateString: string;
  reqNumberOfPlayers: number;
  location: string;
  hostId: string;
  hostName: string;
  status: number;
  invitedBy: string;
  participantsCount: number;
}
