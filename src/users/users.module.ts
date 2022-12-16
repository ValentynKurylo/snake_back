import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {UserModel} from "./user.model";
import {AuthModule} from "../auth/auth.module";
import {GameModel} from "../games/game.model";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      SequelizeModule.forFeature([UserModel, GameModel]),
      forwardRef(()=>AuthModule)
  ],
    exports:[
        UsersService
    ]
})
export class UsersModule {}
