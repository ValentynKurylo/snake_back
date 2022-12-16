import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
    Request,
    UsePipes,
} from '@nestjs/common';
import {UsersService} from "./users.service";
import {UserDTO} from "./userDTO/userDTO";
import {authGuards} from "../auth/authGuard";
import {ValidatorPipe} from "../pipes/validationPipe";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserModel} from "./user.model";

@ApiTags("Users")
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {
    }

    @ApiOperation({summary:'Create user'})
    @ApiResponse({status: 200, type: UserModel})
    @Post()
    @UsePipes(ValidatorPipe)
    postUser(@Body()userDTO: UserDTO){
        return this.userService.createUser(userDTO)
    }

    @ApiOperation({summary:'Get users'})
    @ApiResponse({status: 200, type: [UserModel]})
    @Get()
    getUsers(){
        return this.userService.getUsers()
    }


    @ApiOperation({summary:'Get user by id'})
    @ApiResponse({status: 200, type: UserModel})
    @Get('byId/:id')
    getUserById(@Param('id')id: number){
        return this.userService.getUserById(id)
    }

    @ApiOperation({summary:'Get users by name'})
    @ApiResponse({status: 200, type: [UserModel]})
    @UseGuards(authGuards)
    @Get('/byName/:name')
    getUserByName(@Param('name')name: string){
        return this.userService.getUserByName(name)
    }

    @ApiOperation({summary:'UpDate user'})
    @ApiResponse({status: 200, type: "user was updated"})
    @UseGuards(authGuards)
    @Put('/:id')
    putUser(@Param('id')id: number, @Body()userDTO: UserDTO){
        return this.userService.putUser(id, userDTO)
    }

    @ApiOperation({summary:"Delete user"})
    @ApiResponse({status: 200, type: "user was deleted"})
    @UseGuards(authGuards)
    @Delete('/:id')
    deleteUser(@Param('id')id: number){
        return this.userService.deleteUser(id)
    }

    @UseGuards(authGuards)
    @Get('/currentUser')
    getCurrentUser(@Request()req){
        return this.userService.getUserById(req.user.id)
    }


}
