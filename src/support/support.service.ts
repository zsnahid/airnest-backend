import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  SupportTicketEntity,
  SupportTicketStatus,
  SupportTicketPriority,
} from './entities/supportTicket.entity';
import { Repository } from 'typeorm';
import { TicketMessageEntity } from './entities/ticketMessage.entity';
import { SupportFeedbackEntity } from './entities/supportFeedback.entity';
import { CreateTicketDto } from './dtos/createTicket.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { TicketResponseDto } from './dtos/ticketResponse.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class SupportService {
  constructor(
    @InjectRepository(SupportTicketEntity)
    private supportTicketRepository: Repository<SupportTicketEntity>,
    @InjectRepository(TicketMessageEntity)
    private ticketMessageRepository: Repository<TicketMessageEntity>,
    @InjectRepository(SupportFeedbackEntity)
    private supportFeedbackRepository: Repository<SupportFeedbackEntity>,
  ) {}

  // Create a new ticket
  async createTicket(ticket: CreateTicketDto): Promise<SupportTicketEntity> {
    return this.supportTicketRepository.save(ticket);
  }

  // Get all tickets (filterable by status)
  // If Agent then return all tickets
  // If Requester then return only his/her tickets
  // Query param: ?status=OPEN (optional filtering)
  async getTickets(
    user: UserEntity,
    status: SupportTicketStatus | undefined,
    priority: SupportTicketPriority | undefined,
  ): Promise<TicketResponseDto[]> {
    const where: any = {};

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    if (user.role === 'REQUESTER') {
      where.user = { id: user.id };
    }

    if (status !== undefined && status !== null) {
      where.status = status;
    }

    if (priority !== undefined && priority !== null) {
      where.priority = priority;
    }

    const tickets = await this.supportTicketRepository.find({ where });

    return plainToInstance(TicketResponseDto, tickets, {
      excludeExtraneousValues: true,
    });
  }

  // Get ticket details
  async getTicketById(id: number): Promise<SupportTicketEntity> {
    const ticket = await this.supportTicketRepository.findOne({
      where: { id },
      relations: {
        messages: true,
      },
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    return ticket;
  }

  // Update ticket status (Agent only)
  // For an agent to mark a ticket as IN_PROGRESS or CLOSED
  async updateTicketStatus(
    id: number,
    status: SupportTicketStatus,
  ): Promise<void> {
    const ticket = await this.supportTicketRepository.findOneBy({ id });
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    ticket.status = status;
    await this.supportTicketRepository.save(ticket);
  }

  // Send a message on a ticket (both Agent and Requester)
  // Appends a new message to the conversation
  async createMessage(
    ticketId: number,
    senderId: number,
    message: string,
  ): Promise<TicketMessageEntity> {
    const ticket = await this.supportTicketRepository.findOneBy({
      id: ticketId,
    });
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    if (
      ticket.status === SupportTicketStatus.CLOSED ||
      ticket.status === SupportTicketStatus.CANCELLED
    ) {
      throw new Error('Cannot send messages to non-OPEN tickets');
    }

    const newMessage = this.ticketMessageRepository.create({
      ticketId,
      senderId,
      message,
    });

    ticket.updatedAt = new Date();
    await this.supportTicketRepository.save(ticket);
    return this.ticketMessageRepository.save(newMessage);
  }

  // Update ticket messages only if ticket status is OPEN (both Agent and Requester)
  /*
    Find the ticket,
    Verify its status,
    Identify the last message,
    Check if the user making the request is the the sender of that last message,
    If all conditions are met, update it. 
  */
  async updateTicketMessage(
    id: number,
    userId: number,
    message: string,
  ): Promise<void> {
    const ticket = await this.supportTicketRepository.findOneBy({ id });
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    if (ticket.status !== SupportTicketStatus.OPEN) {
      throw new Error('Cannot update messages for non-OPEN tickets');
    }

    if (!ticket.messages || ticket.messages.length === 0) {
      throw new NotFoundException('No messages found for this ticket');
    }

    const lastMessage = await this.ticketMessageRepository.findOne({
      where: { ticketId: id },
      order: { sentAt: 'DESC' },
    });

    if (lastMessage?.senderId !== userId) {
      throw new UnauthorizedException('You can only update your own messages');
    }

    lastMessage.message = message;
    await this.ticketMessageRepository.save(lastMessage);
  }

  // Delete a ticket (Agent only)
  async deleteTicket(id: number): Promise<void> {
    const ticket = await this.supportTicketRepository.findOneBy({ id });
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    await this.supportTicketRepository.delete(id);
  }

  // Submit feedback for a ticket (Requester only)
  async submitFeedback(
    ticketId: number,
    userId: number,
    rating: number,
    comments: string | undefined,
  ): Promise<void> {
    const ticket = await this.supportTicketRepository.findOneBy({
      id: ticketId,
    });
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    if (ticket.userId !== userId) {
      throw new UnauthorizedException(
        'You can only submit feedback for your own tickets',
      );
    }

    const newFeedback = this.supportFeedbackRepository.create({
      id: ticketId,
      rating,
      comments,
    });
    ticket.feedback = newFeedback;
    await this.supportTicketRepository.save(ticket);
  }
}
