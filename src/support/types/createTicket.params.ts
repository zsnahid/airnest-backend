import { CreateTicketDto } from '../dtos/createTicket.dto';

export type CreateTicketParams = CreateTicketDto & {
  userId: number;
};
