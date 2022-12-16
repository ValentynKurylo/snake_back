import {ApiProperty} from "@nestjs/swagger";

export class AuthDTO{
    @ApiProperty({example: "User@gmail.com"})
    readonly email

    @ApiProperty({example: "user"})
    readonly password
}