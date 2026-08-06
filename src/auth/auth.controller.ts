import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Login successful',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  @ApiBody({
    type: AuthDto
  })
  @UseGuards(LocalAuthGuard)
  login(@Request() req: any, @Body() authDto: AuthDto) {
    return req.user;
  }
}
