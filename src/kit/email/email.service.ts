import { BadRequestException, Injectable } from '@nestjs/common';
// import * as aws from 'aws-sdk';

import EmailBuilder from './email.builder';
const formData = require('form-data');
const Mailgun = require('mailgun.js');
var QRCode = require('qrcode')
import * as randomstring from 'randomstring';

import * as dotenv from 'dotenv';
import { UploadService } from 'src/common/upload/upload.service';
dotenv.config();

const API_KEY = process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;

const mailgun = new Mailgun(formData);
const client = mailgun.client({username: 'api', key: API_KEY});
@Injectable()
export class EmailService {
  constructor(
    private readonly uploadService: UploadService
  ) {
    
  }

  
  async sendEmail(to, subject, content) {
    var messageData = {
      from: 'noreply@bksbackstage.io',
      to: to,
      subject: subject,
      html: content
    }

    client.messages.create(DOMAIN, messageData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  sendConfirmRegisterEmail(email: string, verification_code) {
    const content = EmailBuilder.confirmRegisterEmail(verification_code);
    this.sendEmail(email, 'Confirm Register', content);
  }

  async sendForgotPasswordEmail(email: string, forgetpassword_code: string) {
    const content = EmailBuilder.forgetPasswordEmail(forgetpassword_code);
    this.sendEmail(email, 'Forget password', content);
  }

  async sendMessage(email, link, messageContent) {

    const qrImageData = await QRCode.toDataURL(link)

    const filename = randomstring.generate({
      length: 32,
      charset: 'alphabetic'
    }) + '.jpg';
    const path = 'assets/uploads/qrcodes/' + filename;
    const uploadResult = await this.uploadService.uploadByImageData(path, qrImageData.split(',')[1]);
    console.log('Upload result: ', uploadResult);

    if (!uploadResult) return;

    const qrImagePath = `${process.env.API_BASE_URL}/api/upload/get_file?path=${path}`;
    console.log('qrcode image path: ', qrImagePath);

    const content = await EmailBuilder.messageEmail(link, messageContent, qrImagePath);
    console.log(content);
    return this.sendEmail(email, 'New Message from BKS Backstage', content);
  }
}
