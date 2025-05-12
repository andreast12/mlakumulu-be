import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RegisterUserDto, UserRole } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateTouristDto } from './dto/create-tourist.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterUserDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new ConflictException('Email already in use');
    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hash,
        role: UserRole.EMPLOYEE,
      },
    });
    return { id: user.id, email: user.email, role: user.role };
  }

  async createTourist(dto: CreateTouristDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new ConflictException('Email already in use');
    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hash,
        role: UserRole.TOURIST,
      },
    });
    return { id: user.id, email: user.email, role: user.role };
  }

  async login(dto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      omit: {
        password: false,
      },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    const payload = { sub: user.id, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
      user: { id: user.id, email: user.email, role: user.role },
    };
  }
}
