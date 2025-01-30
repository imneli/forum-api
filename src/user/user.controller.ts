import { Controller, Post, Body, Get, Param, Delete, UseGuards, Patch } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @Post()
    async signupUser(
      @Body() userData: Prisma.UserCreateInput,
    ): Promise<UserModel> {
      return this.userService.createUser(userData);
    }

    @Get(':id')
    @UseGuards(AuthGuard)

    async getUserById(@Param('id') id: string): Promise<UserModel | null> {
    return this.userService.getUserById({ id: Number(id) });

    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    async updateUser(
      @Param('id') id: string,
      @Body() data: Prisma.UserUpdateInput,
    ): Promise<UserModel> {
      return this.userService.updateUser({ 
        where: { id: Number(id) }, 
        data 
        });
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<UserModel> {
      return this.userService.deleteUser({ id: Number(id) });
    }
}
