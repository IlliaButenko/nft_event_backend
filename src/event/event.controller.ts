import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Request,
  UnauthorizedException,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { EmailService } from '../kit/email/email.service';
import * as randomstring from 'randomstring';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { UploadService } from 'src/common/upload/upload.service';
import { EventService } from './event.service';
import { EventCardDto } from './dtos/evet_card.dto';
import { CreateEventCardDto } from './dtos/create_event_card.dto';
import { CreateTicketDto } from './dtos/create_tickdt.dto';
import { Ticket } from './entities/ticket.entity';

@Controller('api/event')
@ApiTags('Event')
export class EventController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly eventService: EventService,
  ) {}

  @Post('create_eventcard')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'large_image', maxCount: 1 },
      { name: 'small_image', maxCount: 1 },
    ]),
  )
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({})
  async create_event_card(
    @Body() body: CreateEventCardDto,
    @UploadedFiles()
    files: {
      large_image?: Express.Multer.File[];
      small_image?: Express.Multer.File[];
    },
    @Request() req,
  ) {
    try {
      const largefileName =
        randomstring.generate({
          length: 16,
          charset: 'alphabetic',
        }) + '.jpg';

      const smallfileName =
        randomstring.generate({
          length: 16,
          charset: 'alphabetic',
        }) + '.jpg';
      const large_path = 'assets/uploads/eventcards/' + largefileName;
      const small_path = 'assets/uploads/eventcards/' + smallfileName;
      await this.uploadService.upload(large_path, files.large_image[0]);
      await this.uploadService.upload(small_path, files.small_image[0]);
      const eventCard = await this.eventService.createEventCard({
        picture_large: large_path,
        picture_small: small_path,
        ...body,
      });
      return { success: true, eventcard: eventCard };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

  @Get('eventcard/latest')
  @ApiOkResponse({ type: EventCardDto })
  async getLatestEventCards(): Promise<any> {
    const eventCards = await this.eventService.getLatestEventCards();
    return {
      success: true,
      eventcards: eventCards.map((eventcard) => eventcard.toEventCardDto()),
    };
  }

  @Get('eventcard')
  @ApiOkResponse({ type: EventCardDto })
  async getAllEventCards(): Promise<any> {
    const eventCards = await this.eventService.getAllEventCards();
    return {
      success: true,
      eventcards: eventCards.map((eventcard) => eventcard.toEventCardDto()),
    };
  }

  @Get('/eventcard/:id')
  @ApiOkResponse({ type: EventCardDto })
  async getEventCardById(@Param('id') id: string): Promise<any> {
    const eventCard = await this.eventService.findById(id);
    if (eventCard) {
      return { success: true, eventcard: eventCard.toEventCardDto() };
    } else {
      return { success: false, message: "Can't find the event card" };
    }
  }

  @Delete('/eventcard/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: EventCardDto })
  async deleteEventById(@Param('id') id: string): Promise<any> {
    try {
      await this.eventService.remove(id);
      return { success: true, message: 'Event deleted successfully!' };
    } catch (error) {
      return { success: false, message: "Can't find the event" };
    }
  }

  @Post('eventcard/buy_ticket')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({})
  async buy_ticket(@Body() body: CreateTicketDto, @Request() req) {
    console.log('ticket param: ', body, req.user);

    const ticket = await this.eventService.buyTicket({
      ...body,
      buyer: req.user.id,
    });
    return { success: true, ticket: ticket };
  }

  @Get('eventcard/user_tickets')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: Ticket })
  async user_tickets(@Request() req): Promise<any> {
    const userid = req.user.id;

    const tickets = await this.eventService.userTickets(userid);
    return { success: true, tickets: tickets };
  }

  @Get('eventcard/available_events')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: Ticket })
  async available_events(@Request() req): Promise<any> {
    const events = await this.eventService.availableEvents();
    return { success: true, events: events };
  }

  @Get('eventcard/tickets')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: Ticket })
  async getTickets(@Request() req): Promise<any> {
    const tickets = await this.eventService.getTickets();
    return { success: true, tickets: tickets };
  }
}
