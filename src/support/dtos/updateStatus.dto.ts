import { IsEnum } from 'class-validator';
import { SupportTicketStatus } from '../entities/supportTicket.entity';

export class UpdateStatusDto {
  @IsEnum(SupportTicketStatus)
  status: SupportTicketStatus;
}
