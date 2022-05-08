import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as ormConfig from './ormconfig';
import { ScheduleModule } from '@nestjs/schedule';
import { SeedModule } from './common/seed/seed.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './common/upload/upload.module';
import { ArticleModule } from './article/article.module';
import { EventModule } from './event/event.module';
import { MessageModule } from './message/message.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    ScheduleModule.forRoot(),
    SeedModule,
    AuthModule,
    UploadModule,
    ArticleModule,
    EventModule,
    MessageModule    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
