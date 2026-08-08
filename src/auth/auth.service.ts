import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth.jwt.payload';
import refreshJwtConfig from './config/refresh.jwt.config';
import * as config from '@nestjs/config';

@Injectable()
export class AuthService {
    refreshToken(id: number) {
        const payload: AuthJwtPayload = {
            sub: id
        };
        const token = this.jwtService.sign(payload);

        return {
            id: id,
            token
        }
    }

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @Inject(refreshJwtConfig.KEY) private refreshTokenJwtConfig: config.ConfigType<typeof refreshJwtConfig>
    ) { }

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
        const token = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, this.refreshTokenJwtConfig)

        return {
            id: userId,
            token,
            refreshToken
        }
    }
}
