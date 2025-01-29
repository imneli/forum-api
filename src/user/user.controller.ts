import { Controller, Post, Body } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @Post('signup')
    async signupUser(
      @Body() userData: Prisma.UserCreateInput,
    ): Promise<UserModel> {
      return this.userService.createUser(userData);
    }
}
