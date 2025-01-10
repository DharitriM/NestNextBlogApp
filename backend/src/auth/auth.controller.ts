import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {
  Controller,
  Get,
  Headers,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req: any) {
    return await this.authService.login(req.user);
  }

  @Get('/current')
  async getCurrentUser(@Headers('Authorization') authorization: string) {
    // Extract the access token from the Authorization header
    const token = authorization?.split(' ')[1];

    if (!token) {
      throw new Error('Token is missing');
    }

    return await this.authService.getCurrentUserByAccessToken(token);
  }
}
