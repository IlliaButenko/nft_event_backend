import { Module } from '@nestjs/common';
import { UploadModule } from 'src/common/upload/upload.module';

import { EmailService } from './email.service';

@Module({
  imports: [UploadModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
