export class Complaints{
  messageId: string;
  userId: string
  userName: string;
  subject: string
  lastMessage: string;
  status: 'OPEN' | 'RESOLVED';
  createdAt: Date;
}