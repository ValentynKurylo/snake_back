import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {GameModel} from "./game.model";
import {UserModel} from "../users/user.model";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [GamesController],
  providers: [GamesService],
  imports: [
      SequelizeModule.forFeature([GameModel, UserModel]),
      AuthModule
  ]
})
export class GamesModule {}
