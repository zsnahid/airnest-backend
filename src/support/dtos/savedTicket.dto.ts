import { Expose, Transform } from 'class-transformer';
import {
  SupportTicketPriority,
  SupportTicketStatus,
} from '../entities/supportTicket.entity';

export class SavedTicketDto {
  @Expose()
  id: number;

  @Expose()
  subject: string;

  @Expose()
  description: string;

  @Expose()
  @Transform(({ value }) => SupportTicketPriority[value])
  priority: string;

  @Expose()
  @Transform(({ value }) => SupportTicketStatus[value])
  status: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
