import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

export interface JwtPayload {
  sub: string; // Typically, 'sub' represents the user ID
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(userDetails: any) {
    const user = await this.userService.getUserByEmail(userDetails.email);
    if (user && user.password === userDetails.password) {
      return user;
    }
    return null;
  }

  async getCurrentUserByAccessToken(accessToken: string) {
    try {
      // Verify the JWT token and extract the payload
      const decodedToken = this.jwtService.verify<JwtPayload>(accessToken);

      // The decodedToken will have the 'sub' field, which is usually the user ID
      const user = await this.userService.getUserById(
        parseInt(decodedToken.sub),
      );

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}
