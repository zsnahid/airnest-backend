import { Module } from '@nestjs/common';
import { SupportController } from './support.controller';
import { SupportService } from './support.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportTicketEntity } from './entities/supportTicket.entity';
import { SupportFeedbackEntity } from './entities/supportFeedback.entity';
import { TicketMessageEntity } from './entities/ticketMessage.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SupportTicketEntity,
      TicketMessageEntity,
      SupportFeedbackEntity,
      UserEntity,
    ]),
  ],
  controllers: [SupportController],
  providers: [SupportService],
})
export class SupportModule {}
