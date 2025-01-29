import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    @Inject()
    private readonly authService: AuthService;

    @Post('sign') 
    @HttpCode(HttpStatus.OK) // retorno 200 e não 201
    signIn(@Body() body: Prisma.UserCreateInput) {
        return this.authService.signIn(body);
    }
} 
