import { Module } from '@nestjs/common';
import { SupportService } from './support.service';
import { SupportController } from './support.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportEntity } from './support.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupportEntity])],
  providers: [SupportService],
  controllers: [SupportController],
})
export class SupportModule {}
