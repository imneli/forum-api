import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

interface AuthCredentialsDto {
    email: string;
    password: string;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async signIn(credentials: AuthCredentialsDto): Promise<{ access_token: string }> {
        const user = await this.userService.userWithPassword({ email: credentials.email });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid password');
        }

        const payload = { sub: user.id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}
