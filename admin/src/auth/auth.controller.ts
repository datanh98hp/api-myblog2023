import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/dto/LoginUserDto';
import { RegisterDto } from 'src/dto/RegisterUserDto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ){}
    @Get()
    test(){
        return 'asdada';
    }
    @Post('login')
    async login(@Body() userLogin:LoginUserDto) {
        return await this.authService.signIn(userLogin);
        // return "login";
    }
    @Post('register')
    async register(@Body() userRegister: RegisterDto) {
        return await this.authService.register(userRegister);
    }
    @Post('refresh-token')
    async refreshToken(@Body() token: string) {
        return await this.authService.refreshToken(token);
    }



}
