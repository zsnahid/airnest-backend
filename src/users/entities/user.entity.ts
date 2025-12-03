import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SupportTicketEntity } from '../../support/entities/supportTicket.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar' })
  role: string; // 'AGENT' or 'REQUESTER'

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => SupportTicketEntity, (ticket) => ticket.user, {
    cascade: true,
  })
  supportTickets: SupportTicketEntity[];
}
