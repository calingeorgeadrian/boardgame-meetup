export class EventParticipantModel {
  id: string;
  eventId: string;
  participantId: string;
  inviterId: string;
  participantName: string;
  email: string;
  bggUsername: string;
  status: number;
  checkIn: boolean;
}
