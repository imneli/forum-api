import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    @Inject()
    private readonly userService: UserService;

    async signIn(params: Prisma.UserCreateInput): Promise<Omit<User, 'password'>> {
        const user = await this.userService.getUserById({ email: params.email });

        if (!user) throw new NotFoundException('User not found');

        const passwordMatch = await bcrypt.compare(params.password, user.password);

        if (!passwordMatch) throw new UnauthorizedException('Invalid password');

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}