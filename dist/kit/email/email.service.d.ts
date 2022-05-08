import { UploadService } from 'src/common/upload/upload.service';
export declare class EmailService {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    sendEmail(to: any, subject: any, content: any): Promise<void>;
    sendConfirmRegisterEmail(email: string, verification_code: any): void;
    sendForgotPasswordEmail(email: string, forgetpassword_code: string): Promise<void>;
    sendMessage(email: any, link: any, messageContent: any): Promise<void>;
}
