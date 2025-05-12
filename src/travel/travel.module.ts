import { Module } from '@nestjs/common';
import { TravelService } from './travel.service';
import { TravelController } from './travel.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [TravelController],
  providers: [TravelService, PrismaService],
})
export class TravelModule {}
