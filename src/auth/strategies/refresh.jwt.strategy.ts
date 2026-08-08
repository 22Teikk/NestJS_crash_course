import * as config from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthJwtPayload } from "../types/auth.jwt.payload";
import { Inject, Injectable } from "@nestjs/common";
import refreshJwtConfig from "../config/refresh.jwt.config";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh_jwt') {
    constructor(@Inject(refreshJwtConfig.KEY) private readonly refreshJwtConfiguration: config.ConfigType<typeof refreshJwtConfig>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: refreshJwtConfiguration.secret,
        });
    }

    validate(payload: AuthJwtPayload) {
        return {
            id: payload.sub
        };
    }
}