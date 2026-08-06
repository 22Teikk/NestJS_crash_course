import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService) { }

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

}
