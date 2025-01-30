import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
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

    @UseGuards(AuthGuard)
    @Get(':id')

    async getUserById(@Param('id') id: string): Promise<UserModel | null> {
    return this.userService.getUserById({ id: Number(id) });

    }

    @UseGuards(AuthGuard)
    @Put(':id')
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
