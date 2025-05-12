import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';

@Injectable()
export class TravelService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTravelDto) {
    const tourist = await this.prisma.user.findUnique({
      where: { id: dto.touristId },
    });
    if (!tourist || tourist.role !== 'TOURIST') {
      throw new NotFoundException('Tourist not found or not a valid tourist');
    }

    return await this.prisma.travel.create({
      data: {
        ...dto,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
      },
    });
  }

  async findAll(user: { userId: string; role: string }) {
    if (user.role === 'TOURIST') {
      // Only return travels for this tourist
      return await this.prisma.travel.findMany({
        where: { touristId: user.userId },
        include: { tourist: true },
      });
    }
    // EMPLOYEE: return all travels
    return await this.prisma.travel.findMany({ include: { tourist: true } });
  }

  async findOne(id: string) {
    const travel = await this.prisma.travel.findUnique({
      where: { id },
      include: { tourist: true },
    });
    if (!travel) throw new NotFoundException('Travel not found');
    return travel;
  }

  async update(id: string, dto: UpdateTravelDto) {
    try {
      if (dto.touristId) {
        const tourist = await this.prisma.user.findUnique({
          where: { id: dto.touristId },
        });
        if (!tourist || tourist.role !== 'TOURIST') {
          throw new NotFoundException(
            'Tourist not found or not a valid tourist',
          );
        }
      }

      return await this.prisma.travel.update({
        where: { id },
        data: { ...dto },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Travel not found');
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.travel.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Travel not found');
      }
      throw error;
    }
  }
}
