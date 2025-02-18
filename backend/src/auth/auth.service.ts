import * as bcrypt from 'bcryptjs';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { Role } from '@prisma/client'; 

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: AuthRegisterDto, res: any) {
    const { password, ...employeeData } = data;

    const usedMail = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (usedMail) {
      throw new ConflictException('This mail is already used!');
    }

    const role: Role = data.role || Role.employee;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...employeeData,
        password: hashedPassword,
        role: role,
      },
    });

    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);

    res.cookie('jwt', access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({ message: 'User registered successfully', user });
  }

  async login(loginDto: LoginDto, res: any) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new NotFoundException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);

    res.cookie('jwt', access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({ message: 'User login successfully', user });
  }

  async logout(res: any) {
    res.cookie('jwt', '', {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      expires: new Date(0),
    });

    return res.json({ message: 'Logout successful' });
  }

  async me(token: string) {
    if (!token) {
      return { status: 'invalid', message: 'No token found' };
    }

    try {
      const decoded = this.jwtService.verify(token);
      const userId = decoded.sub;

      if (!userId) {
        return { status: 'invalid', message: 'Invalid token' };
      }

      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return { status: 'invalid', message: 'User not found' };
      }

      return { status: 'valid', user };
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return { status: 'expired', message: 'Token has expired' };
      }

      return { status: 'invalid', message: 'Invalid token' };
    }
  }
}
