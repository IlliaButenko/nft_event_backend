import { UploadService } from 'src/common/upload/upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    change_avatar(params: any, response: any): Promise<void>;
}
