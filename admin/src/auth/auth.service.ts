import { JwtService } from '@nestjs/jwt';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from 'src/dto/LoginUserDto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly jwtService:JwtService 
    ){}

    async signIn(userLogin:LoginUserDto){
        console.log(`login with ${userLogin}`)

        const user = await this.userRepository.findOneBy({ email: userLogin.email })
        if (!user) {
            //throw new HttpException('Email is not match',HttpStatus.UNAUTHORIZED);
            return {
                statusCode: HttpStatus.UNAUTHORIZED,
                message: 'Email is not match'
            }
        }
        const checkPass = await bcrypt.compareSync(userLogin.password, user.password);
        if (!checkPass) {
            // throw new HttpException('Email or password is wrong', HttpStatus.UNAUTHORIZED)
            return {
                statusCode: HttpStatus.UNAUTHORIZED,
                message: 'Email or password is wrong'
            }
        }
        ///
        const payload = { id: user.id, email: user.email, role: user.role };

        return this.generateToken(payload);
    }

    private async generateToken(payload: { id: number, email: string, role: string }) {
        const access_token = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET_STRING,
            expiresIn: '1d'
        });
        const refresh_token = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET_STRING,
            expiresIn: process.env.EXP_IN_REFRESH_TOKEN
        })
        await this.userRepository.update(
            { email: payload.email },
            { refresh_token: refresh_token }
        )

        return {
            access_token,
            refresh_token
        };
    }
}
