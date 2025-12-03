import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SupportTicketEntity } from './supportTicket.entity';

@Entity('support_feedback')
export class SupportFeedbackEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @Column({ type: 'int' })
  ticketId: number;

  @OneToOne(() => SupportTicketEntity, (ticket) => ticket.feedback)
  @JoinColumn({ name: 'ticketId' })
  ticket: SupportTicketEntity;
}
