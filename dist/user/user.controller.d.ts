/// <reference types="multer" />
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dtos/user.dto';
import { EmailService } from '../kit/email/email.service';
import { UploadService } from 'src/common/upload/upload.service';
import { ChangePasswordDto } from './dtos/change-password.dto';
export declare class UserController {
    private readonly userService;
    private readonly emailService;
    private readonly uploadService;
    constructor(userService: UserService, emailService: EmailService, uploadService: UploadService);
    change_avatar(body: any, file: Express.Multer.File, req: any): Promise<{
        success: boolean;
        user: UserDto;
    }>;
    changeProfile(req: any, body: ChangePasswordDto): Promise<{
        success: boolean;
        message: string;
        user?: undefined;
    } | {
        success: boolean;
        user: UserDto;
        message?: undefined;
    }>;
    all(): Promise<{
        success: boolean;
        users: UserDto[];
    }>;
}
