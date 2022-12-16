import {Body, Controller, Post, UsePipes} from '@nestjs/common';
import {AuthDTO} from "./authDTO/authDTO";
import {UserDTO} from "../users/userDTO/userDTO";
import {AuthService} from "./auth.service";
import {ValidatorPipe} from "../pipes/validationPipe";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {GameModel} from "../games/game.model";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }
    @ApiOperation({summary:'Login'})
    @ApiResponse({status: 200, type: "token"})
    @Post('/login')
    login(@Body()authDTO: AuthDTO){
        return this.authService.login(authDTO)
    }

    @ApiOperation({summary:'Registration'})
    @ApiResponse({status: 200, type: "token"})
    @UsePipes(ValidatorPipe)
    @Post('/registration')
    registration(@Body()userDTO: UserDTO){
        return this.authService.registration(userDTO)
    }
}
