import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class HeadersDto {
    @ApiProperty({ description: 'Access token header', example: 'xyz123token' })
    @IsString()
    @IsNotEmpty()
    @Expose({ name: "access-token" })
    accessToken: string;

    @ApiProperty({ description: 'Refresh token header', example: 'abc456token' })
    @IsString()
    @IsNotEmpty()
    @Expose({ name: "refresh-token" })
    refreshToken: string;
}