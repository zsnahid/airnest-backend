import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SupportTicketPriority } from '../entities/supportTicket.entity';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(SupportTicketPriority)
  priority: SupportTicketPriority;
}
