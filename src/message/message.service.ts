import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { getFromDto } from '../common/utils/repository.util';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async createMessage(payload: any): Promise<Message> {
    const message: Message = getFromDto(payload, new Message());    
    await this.messageRepository.save(message);

    return this.messageRepository.findOne({
        where: { id: message.id }
    })
  }

  getAllEventCards(): Promise<Message[]> {
    return this.messageRepository.find({ relations: ['creator'] });
  }

  getLatestEventCards(): Promise<Message[]> {
    return this.messageRepository.find({ 
      order: {'createdAt': 'DESC'},
      relations: ['creator'],
      take: 10
    });
  }

  findById(id: string): Promise<Message> {
    return this.messageRepository.findOne({
      relations: ['creator'],
      where: { id }
    });
  }


}