/// <reference types="multer" />
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { TokenResponseDto } from './dtos/token-response.dto';
import { RegisterDto } from './dtos/register.dto';
import { UserDto } from '../user/dtos/user.dto';
import { EmailService } from '../kit/email/email.service';
import { VerifyEmailDto } from './dtos/verify_email.dto';
import { ChangeProfileDto } from 'src/user/dtos/change-profile.dto';
import { UploadService } from 'src/common/upload/upload.service';
import { ForgetPasswordDto } from './dtos/forget_password.dto';
import { ResetPasswordDto } from './dtos/reset_password.dto';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    private readonly emailService;
    private readonly uploadService;
    constructor(authService: AuthService, userService: UserService, emailService: EmailService, uploadService: UploadService);
    getProfile(req: any): Promise<UserDto>;
    login(body: LoginDto): Promise<any>;
    updateProfile(req: any, body: ChangeProfileDto, file: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        data: TokenResponseDto;
        message?: undefined;
    }>;
    signup(body: RegisterDto): Promise<any>;
    verify_email(body: VerifyEmailDto): Promise<any>;
    forgetPasword(body: ForgetPasswordDto): Promise<any>;
    resetPasword(body: ResetPasswordDto): Promise<any>;
}
