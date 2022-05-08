import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { EmailService } from '../kit/email/email.service';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessageDto } from './dtos/message.dto';
import { MessageService } from './message.service';


@Controller('api/message')
@ApiTags('Message')
export class MessageController {
  constructor(
      private readonly messageService: MessageService,
      private readonly emailservice: EmailService
  ) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({})
  async create(
      @Body() body: CreateMessageDto,
      @Request() req
  ) {
    try {
        this.emailservice.sendMessage(body.receiver, body.link, body.content);
        const message = await this.messageService.createMessage(body);
        return {success: true, message: message}
    } catch (error) {
        console.log(error);
        return {success: false};
    }
  }

  @Get('latest')
  @ApiOkResponse({ type: MessageDto })
  async getLatestMessage(): Promise<any> {
    const eventCards = await this.messageService.getLatestEventCards();
    return {success: true, eventcards: eventCards.map(eventcard => eventcard.toMessageDto())};
  }

  @Get('')
  @ApiOkResponse({ type: MessageDto })
  async getAllEventCards(): Promise<any> {
    const eventCards = await this.messageService.getAllEventCards();
    return {success: true, eventcards: eventCards.map(eventcard => eventcard.toMessageDto())};
  }

  @Get(':id')
  @ApiOkResponse({ type: MessageDto })
  async getEventCardById(@Param('id') id: string): Promise<any> {
    const eventCard = await this.messageService.findById(id);
    if (eventCard) {
        return {success: true, eventcard: eventCard.toMessageDto()};
    } else {
        return {success: false, message: "Can't find the event card"};
    }
    
  }
}