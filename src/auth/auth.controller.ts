import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { AuthDto } from './dto/auth.dto';
import { request } from 'http';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  @ApiBody({
    schema: {
      properties: {
        email: { type: "string", example: "Ena96@gmail.com" },
        password: { type: "string", example: "123456" },
      }
    }
  })
  @UseGuards(LocalAuthGuard)
  login(@Request() req: any, @Body() authDto: AuthDto) {
    const token = this.authService.login(req.user.id);
    return {
      id: req.user.id,
      token: token
    }
  }
}
