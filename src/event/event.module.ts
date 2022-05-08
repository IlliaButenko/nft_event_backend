import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UploadModule } from 'src/common/upload/upload.module';
import { EventCard } from './entities/event_card.entity';
import { Ticket } from './entities/ticket.entity';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventCard, Ticket]),
    UploadModule
  ],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}