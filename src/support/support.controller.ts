import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SupportService } from './support.service';
import { CreateTicketDto } from './dtos/createTicket.dto';
import { SupportTicketStatus } from './entities/supportTicket.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  // Create a new ticket
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.REQUESTER)
  @Post('tickets')
  createTicket(@Body() createTicketDto: CreateTicketDto) {
    return this.supportService.createTicket(createTicketDto);
  }

  // Get all tickets (filterable by status)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AGENT)
  @Get('tickets')
  getTickets(
    @Request() req, // Assuming user is on req; e.g., from a guard
    @Query('status') status?: SupportTicketStatus,
  ) {
    return this.supportService.getTickets(req.user, status);
  }

  // Get ticket details
  @Get('tickets/:id')
  getTicketById(@Param('id') id: number) {
    return this.supportService.getTicketById(id);
  }

  // Update ticket status (Agent only)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AGENT)
  @Patch('tickets/:id/status')
  updateTicketStatus(
    @Param('id') id: number,
    @Body('status') status: SupportTicketStatus,
  ) {
    return this.supportService.updateTicketStatus(id, status);
  }

  // Send a message on a ticket
  @UseGuards(JwtAuthGuard)
  @Post('tickets/:id/messages')
  createMessage(
    @Param('id') ticketId: number,
    @Body('message') message: string,
    @Request() req: any, // Assuming user is on req
  ) {
    return this.supportService.createMessage(ticketId, req.user.id, message);
  }

  // Update the last message on a ticket
  @UseGuards(JwtAuthGuard)
  @Patch('tickets/:id/messages')
  updateTicketMessage(
    @Param('id') ticketId: number,
    @Body('message') message: string,
    @Request() req: any, // Assuming user is on req
  ) {
    return this.supportService.updateTicketMessage(
      ticketId,
      req.user.id,
      message,
    );
  }

  // Delete a ticket (Agent only)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AGENT)
  @Delete('tickets/:id')
  deleteTicket(@Param('id') id: number) {
    return this.supportService.deleteTicket(id);
  }

  // Submit feedback for a ticket (Requester only)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.REQUESTER)
  @Post('tickets/:id/feedback')
  submitFeedback(
    @Param('id') ticketId: number,
    @Body() body: { rating: number; comments?: string },
    @Request() req: any, // Assuming user is on req
  ) {
    return this.supportService.submitFeedback(
      ticketId,
      req.user.id,
      body.rating,
      body.comments,
    );
  }
}
