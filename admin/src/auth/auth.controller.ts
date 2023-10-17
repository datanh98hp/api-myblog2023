import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/dto/LoginUserDto';

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



}
