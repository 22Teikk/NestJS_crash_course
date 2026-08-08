import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth.jwt.payload';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

    async validateUser(email: string, password: string) {
        const user = await this.userService.FindByEmail(email);
        if (!user) {
            throw new UnauthorizedException("Invalid Credentials");
        }

        if (await bcrypt.compare(password, user.password)) {
            return {
                id: user.id,
            };
        }
        throw new UnauthorizedException("Invalid Credentials");
    }

    login(userId: number) {
        const payload: AuthJwtPayload = {
            sub: userId
        };
        return this.jwtService.sign(payload);
    }
}
