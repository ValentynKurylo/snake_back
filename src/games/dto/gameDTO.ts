import {ApiProperty} from "@nestjs/swagger";

export class GameDTO{
    @ApiProperty({example: 111})
    readonly score
}