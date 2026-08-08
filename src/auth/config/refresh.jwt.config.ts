import { registerAs } from "@nestjs/config";
import { JwtSignOptions } from "@nestjs/jwt";
import type { StringValue } from "ms";

export default registerAs('refresh_jwt', (): JwtSignOptions => ({
    secret: process.env.REFRESH_JWT_SECRET,
    expiresIn: process.env.REFRESH_JWT_EXPIRES_IN as StringValue,
}));