"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const email_builder_1 = require("./email.builder");
const formData = require('form-data');
const Mailgun = require('mailgun.js');
var QRCode = require('qrcode');
const randomstring = require("randomstring");
const dotenv = require("dotenv");
const upload_service_1 = require("../../common/upload/upload.service");
dotenv.config();
const API_KEY = process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: 'api', key: API_KEY });
let EmailService = class EmailService {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    async sendEmail(to, subject, content) {
        var messageData = {
            from: 'noreply@bksbackstage.io',
            to: to,
            subject: subject,
            html: content
        };
        client.messages.create(DOMAIN, messageData)
            .then((res) => {
            console.log(res);
        })
            .catch((err) => {
            console.error(err);
        });
    }
    sendConfirmRegisterEmail(email, verification_code) {
        const content = email_builder_1.default.confirmRegisterEmail(verification_code);
        this.sendEmail(email, 'Confirm Register', content);
    }
    async sendForgotPasswordEmail(email, forgetpassword_code) {
        const content = email_builder_1.default.forgetPasswordEmail(forgetpassword_code);
        this.sendEmail(email, 'Forget password', content);
    }
    async sendMessage(email, link, messageContent) {
        const qrImageData = await QRCode.toDataURL(link);
        const filename = randomstring.generate({
            length: 32,
            charset: 'alphabetic'
        }) + '.jpg';
        const path = 'assets/uploads/qrcodes/' + filename;
        const uploadResult = await this.uploadService.uploadByImageData(path, qrImageData.split(',')[1]);
        console.log('Upload result: ', uploadResult);
        if (!uploadResult)
            return;
        const qrImagePath = `${process.env.API_BASE_URL}/api/upload/get_file?path=${path}`;
        console.log('qrcode image path: ', qrImagePath);
        const content = await email_builder_1.default.messageEmail(link, messageContent, qrImagePath);
        console.log(content);
        return this.sendEmail(email, 'New Message from BKS Backstage', content);
    }
};
EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map