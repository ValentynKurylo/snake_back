import {Body, Controller, Get, Param, Post, Request, UseGuards} from '@nestjs/common';
import {GamesService} from "./games.service";
import {GameDTO} from "./dto/gameDTO";
import {authGuards} from "../auth/authGuard";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserModel} from "../users/user.model";
import {GameModel} from "./game.model";

@ApiTags("Games")
@Controller('games')
export class GamesController {
    constructor(private gameService: GamesService) {
    }

    @ApiOperation({summary:'Create game'})
    @ApiResponse({status: 200, type: GameModel})
    @UseGuards(authGuards)
    @Post()
    postGame(@Body()game: GameDTO, @Request()req){
        return this.gameService.postGame(game, req.user)
    }

    @ApiOperation({summary:'Get games'})
    @ApiResponse({status: 200, type: [GameModel]})
    @Get()
    getGames(){
        return this.gameService.getGames()
    }

    @ApiOperation({summary:'Get games bu userId'})
    @ApiResponse({status: 200, type: [GameModel]})
    @Get('/byUserId/:userId')
    getGamesByUserId(@Param('userId')userId: number){
        return this.gameService.getGamesByUserIdAndData(userId)
    }

    @ApiOperation({summary:'Get games by userId DESC score'})
    @ApiResponse({status: 200, type: [GameModel]})
    @Get('/byUserIdAndScore/:userId')
    getGamesByUserIdAndScore(@Param('userId')userId: number){
        return this.gameService.getGamesByUserIdAndScore(userId)
    }

    @ApiOperation({summary:'Get games DESC score'})
    @ApiResponse({status: 200, type: [GameModel]})
    @Get('/byScore')
    getGamesByScore(){
        return this.gameService.getGamesByScore()
    }

    @ApiOperation({summary:'Get games'})
    @ApiResponse({status: 200, type: [GameModel]})
    @Get('/byCountry/:country')
    getGamesByCountry(@Param('country')country: string){
        return this.gameService.getGamesByCountry(country)
    }

}
