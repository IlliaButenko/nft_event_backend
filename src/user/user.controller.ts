import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Post,
    Put,
    Request,
    UnauthorizedException,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dtos/user.dto';
import { EmailService } from '../kit/email/email.service';
import * as randomstring from 'randomstring';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/common/upload/upload.service';
import { ChangeProfileDto } from './dtos/change-profile.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { compare, hash } from 'bcrypt';

@Controller('api/user')
@ApiTags('User')
export class UserController {
  constructor(
      private readonly userService: UserService,
      private readonly emailService: EmailService,
      private readonly uploadService: UploadService
  ) {}

  @UseInterceptors(FileInterceptor('avatar'))
  @Post('change_avatar')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({})
  async change_avatar(
      @Body() body: any,
      @UploadedFile() file: Express.Multer.File,
      @Request() req
  ) {
      const fileName = randomstring.generate({
        length: 16,
        charset: 'alphabetic'
      }) + '.jpg';

      const path = 'assets/uploads/avatar/' + fileName;
      await this.uploadService.upload(path, file);
      const user = await this.userService.updateUserAvatar(req.user.id, path);
      return {success: true, user: user.toUserDto()}
  }

  

  @Put('change_password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserDto })
  async changeProfile(@Request() req, @Body() body: ChangePasswordDto) {
    const id = req.user.id;
    const user = await this.userService.findUserById(id);

    const compare_result = await compare(body.old_password, user.password)
    
    if (!compare_result) {
      return {success: false, message: 'Old password is incorrect'};
    }

    const password = await hash(body.new_password, 10)
    user.password = password;

    const updatedUser = await this.userService.updateUser(user);
    return {success: true, user: updatedUser.toUserDto()}
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserDto })
  async all() {
    const users = await this.userService.getAllUsers();
    return {success: true, users: users};
  }
}
