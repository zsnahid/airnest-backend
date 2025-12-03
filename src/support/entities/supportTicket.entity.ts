import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TicketMessageEntity } from './ticketMessage.entity';
import { SupportFeedbackEntity } from './supportFeedback.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export enum SupportTicketPriority {
  LOW,
  MEDIUM,
  HIGH,
  URGENT,
}

export enum SupportTicketStatus {
  OPEN,
  IN_PROGRESS,
  CLOSED,
  CANCELLED,
}

@Entity('support_tickets')
export class SupportTicketEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  subject: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: SupportTicketPriority,
    default: SupportTicketPriority.LOW,
    nullable: true,
  })
  priority: SupportTicketPriority;

  @Column({
    type: 'enum',
    enum: SupportTicketStatus,
    default: SupportTicketStatus.OPEN,
  })
  status: SupportTicketStatus;

  @Column({ type: 'int' })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.supportTickets)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @OneToMany(() => TicketMessageEntity, (message) => message.ticket, {
    cascade: true,
  })
  messages: TicketMessageEntity[];

  @OneToOne(() => SupportFeedbackEntity, (feedback) => feedback.ticket, {
    cascade: true,
  })
  feedback: SupportFeedbackEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
