import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {UserModel} from "./users/user.model";
import { AuthModule } from './auth/auth.module';
import { GamesModule } from './games/games.module';
import {GameModel} from "./games/game.model";

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
      ConfigModule.forRoot({
        envFilePath: '.env'
      }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [UserModel, GameModel],
      autoLoadModels: true
    }),
    UsersModule,
    AuthModule,
    GamesModule,
  ],
})
export class AppModule {}
