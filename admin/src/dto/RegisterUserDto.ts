// import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterDto {
    //id: number;
    // @IsNotEmpty()
    usermame: string;
   // @IsNotEmpty()
    password: string;
   // @IsNotEmpty()
    //@IsEmail()
    email: string;

    // refresh_token: string;

    // img: string;
    //@IsNotEmpty()
    role: string;

}