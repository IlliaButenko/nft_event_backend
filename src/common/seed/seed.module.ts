import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { SeedService } from './seed.service';

@Module({
  imports: [UserModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
