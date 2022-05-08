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
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { TokenResponseDto } from './dtos/token-response.dto';
import { RegisterDto } from './dtos/register.dto';
import { UserDto } from '../user/dtos/user.dto';
import { EmailService } from '../kit/email/email.service';
import * as randomstring from 'randomstring';
import { VerifyEmailDto } from './dtos/verify_email.dto';
import { ChangeProfileDto } from 'src/user/dtos/change-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/common/upload/upload.service';
import { ForgetPasswordDto } from './dtos/forget_password.dto';
import { ResetPasswordDto } from './dtos/reset_password.dto';
@Controller('api/auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly uploadService: UploadService
  ) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserDto })
  async getProfile(@Request() req): Promise<UserDto> {
    const email = req.user.email;
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException(
        `Invalid user authorization token found.`,
      );
    }
    return user.toUserDto();
  }

  @Post('login')
  @ApiOkResponse({ type: TokenResponseDto })
  async login(@Body() body: LoginDto): Promise<any> {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new BadRequestException(); // return 400 error for bad request
      return 
    } 
    if (user.email_verified) {
      const token = this.authService.login(user);
      const currentUser = await this.userService.findUserByEmail(user.email);
      const result = new TokenResponseDto(token, currentUser.toUserDto());
      return {success: true, data: result};
    } else {
      return {success: false, message: 'Email not verified'};
    }
    
  }
  @UseInterceptors(FileInterceptor('background'))
  @Post('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TokenResponseDto })
  async updateProfile(
    @Request() req, 
    @Body() body: ChangeProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const email = req.user.email;
    const user = await this.userService.findUserByEmail(email);

    console.log(email);

    if (body.email !== req.user.email) {
      const exist = await this.userService.findUserByEmail(body.email);
      if (exist) {
        return {success: false, message: 'Email already taken'};
      }
    }

    let path;
    if (file) {
      const fileName = randomstring.generate({
        length: 16,
        charset: 'alphabetic'
      }) + '.jpg';
  
      path = 'assets/uploads/background/' + fileName;
      await this.uploadService.upload(path, file);
    }
    
    
    user.name = body.name;
    user.email = body.email;
    user.phone = body.phone;
    user.background = path;
    const updatedUser = await this.userService.updateUser(user);
    const token = this.authService.login(updatedUser);
    const result = new TokenResponseDto(token, updatedUser.toUserDto());
    return {success: true, data: result}
  }

  @Post('signup')
  @ApiOkResponse({})
  async signup(@Body() body: RegisterDto): Promise<any> {
    const verification_code = randomstring.generate(30);
    const user = await this.userService.addUser({...body, verification_code: verification_code, email_verified: false});
    if (!user) {
      return {success: false, message: 'Email already taken'}
    }
    this.emailService.sendConfirmRegisterEmail(user.email, verification_code);
    const token = this.authService.login(user);
    return {success: true};
  }

  @Post('verify_email')
  @ApiOkResponse({})
  async verify_email(@Body() body: VerifyEmailDto): Promise<any> {
    const res = await this.userService.verifyEmail(body.code);
    console.log(res);
    return {success: res};
  }

  @Post('forget_password')
  @ApiOkResponse({})
  async forgetPasword(@Body() body: ForgetPasswordDto): Promise<any> {
    const user = await this.userService.findUserByEmail(body.email);
    if (!user) {
      return {success: false, message: 'Email not exist'};
    }

    await this.userService.forgetPassword(body.email);
    return {success: true};
  }

  @Put('reset_password')
  @ApiOkResponse({})
  async resetPasword(@Body() body: ResetPasswordDto): Promise<any> {
    const result = await this.userService.resetPassword(body);
    return {success: result};
  }
}
