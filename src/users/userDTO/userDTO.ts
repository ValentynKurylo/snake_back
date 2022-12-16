import {IsEmail, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UserDTO{
    @ApiProperty({example: "User User"})
    @IsString({message: "Name must be string"})
    readonly name

    @ApiProperty({example: "User@gmail.com"})
    @IsEmail({}, {message: "Wrong email"})
    readonly email

    @ApiProperty({example: "1111"})
    @IsString({message: "Password must be string"})
    @Length(4, 16, {message: "Length min - 4, max - 16 "})
    readonly password

    @ApiProperty({example: "Ukrain"})
    @IsString({message: "Country must be string"})
    readonly country
}