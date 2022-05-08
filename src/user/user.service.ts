import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as randomstring from 'randomstring';

import { User } from './entities/user.entity';
import { RegisterDto } from '../auth/dtos/register.dto';
import { getFromDto } from '../common/utils/repository.util';
import { CreateUserDto } from './dtos/create-user.dto';
import { EmailService } from 'src/kit/email/email.service';
import { hash } from 'bcrypt';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService,
  ) {}

  async addUser(payload: CreateUserDto, throwError = true): Promise<User> {
    const found = await this.findUserByEmail(payload.email);
    if (found) {
      if (throwError) {
        // throw new BadRequestException('Email already taken');
        return false as any;
      } else {
        return found;
      }
    }
    const user: User = getFromDto(payload, new User());
    await this.userRepository.save(user);

    return await this.findUserByEmail(user.email);
  }

  updateUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email: email.toLowerCase() },
    });
  }

  findUserById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: {id}
    })
  }

  async updateUserAvatar(id: string, avatar: any): Promise<User> {
    let user = await this.userRepository.findOne({
      where: {id}
    });

    user.avatar = avatar;
    return await this.userRepository.save(user);
  }

  async verifyEmail(code): Promise<boolean> {
    try {
      const found = await this.userRepository.findOne({
        where: {verification_code: code}
      })
  
      if (found) {
        found.email_verified = true;
  
        await this.userRepository.save(found);
        return true;
      } 
      
      return false;

    } catch(error) {
      return true;
    }
  }

  async forgetPassword(email): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email }
      });

      const forgetpassword_code = randomstring.generate(30);
      user.forgetpassword_code = forgetpassword_code;
      this.userRepository.save(user);

      await this.emailService.sendForgotPasswordEmail(email, forgetpassword_code);

      return true;

    } catch (error) {
      return false;
    }
  }

  async resetPassword(payload): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne({
        where: { forgetpassword_code: payload.code }
      });

      if (!user) return false;

      user.password = await hash(payload.password, 10)
      user.forgetpassword_code = '';
      await this.userRepository.save(user);

      return true;

    } catch (error) {
      return false;
    }
  }

  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.userRepository.find({
      where: {user_type: 'NORMAL'}
    })

    return users.map(user => user.toUserDto());
  }
}
