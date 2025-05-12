import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TravelModule } from './travel/travel.module';

@Module({
  imports: [UserModule, TravelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
