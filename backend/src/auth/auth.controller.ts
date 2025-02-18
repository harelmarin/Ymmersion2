import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { Response } from 'express';
import { Res } from '@nestjs/common';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiOperation({
    summary: 'Register a new user',
    description: 'This endpoint registers a new user in the system.',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Validation failed for input data.',
  })
  async register(@Body() authRegisterDto: AuthRegisterDto, @Res() res: Response) {
    console.log('Registering user:', authRegisterDto)
    return await this.authService.register(authRegisterDto, res);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Authenticate a user',
    description: 'This endpoint logs in a user and returns a JWT token.',
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully authenticated.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid credentials.',
  })
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    return await this.authService.login(loginDto, res);
  }

  @Get('logout')
  @ApiOperation({
    summary: 'Logout a user',
    description: 'This endpoint logs out a user and clears the session.',
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged out.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid credentials.',
  })
  async logout(@Res() res: Response) {
    return await this.authService.logout(res);
  }


  @Get('me')
  @ApiOperation({
    summary: 'Get current user',
    description: 'This endpoint returns the current user.',
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully retrieved.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid credentials.',
  })
  async me(@Res() res: Response, @Req() req: any) {
    const token = req.cookies['jwt'];

    const result = await this.authService.me(token);

    if (result.status === 'valid') {
      return res.json({ status: result.status, id: result.user.id });
    }

    if (result.status === 'expired') {
      return res.status(401).json({ message: 'Token has expired' });
    }

    return res.status(401).json({ message: result.message });
  }

}

