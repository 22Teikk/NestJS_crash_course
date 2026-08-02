import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class HeadersDto {
    @IsString()
    @IsNotEmpty()
    @Expose({ name: "access-token" })
    accessToken: string;

    @IsString()
    @IsNotEmpty()
    @Expose({ name: "refresh-token" })
    refreshToken: string;
}