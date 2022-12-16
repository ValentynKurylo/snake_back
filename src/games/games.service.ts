import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {GameModel} from "./game.model";
import {GameDTO} from "./dto/gameDTO";
import {where} from "sequelize";
import {UserModel} from "../users/user.model";


@Injectable()
export class GamesService {
    constructor(@InjectModel(GameModel) private gameRepository: typeof GameModel) {
    }


    async postGame(game: GameDTO, user){
        await this.gameRepository.create({...game, userId: user.id})
        return 'game was added'
    }

    async getGames(){
        let games = await this.gameRepository.findAll({include: {all: true}})
        return games
    }

    async getGamesByUserIdAndData(userId: number){
        let games = await this.gameRepository.findAll({where: {userId: userId}})
        return games
    }

    async getGamesByUserIdAndScore(userId: number){
        let games = await this.gameRepository.findAll({where: {userId: userId}, order: [['score', 'DESC']], include: {all: true}})
        return games
    }

    async getGamesByScore(){
        let games = await this.gameRepository.findAll({order: [['score', 'DESC']], include: {all: true}})
        return games
    }

    async getGamesByCountry(country: string){
        let games = await this.gameRepository.findAll({include: {all: true}, where: {},  order: [['score', 'DESC']] })
        return games
    }


}
