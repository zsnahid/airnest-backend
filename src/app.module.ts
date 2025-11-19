import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupportModule } from './support/support.module';
import { ValidationModule } from './validation/validation.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    SupportModule,
    ValidationModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'roooot',
      database: 'airnest',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
