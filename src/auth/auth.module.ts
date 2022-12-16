import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UserModel} from "../users/user.model";
import {JwtModule} from "@nestjs/jwt";
import {UsersModule} from "../users/users.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
      forwardRef(()=>UsersModule),
      UserModel,

      JwtModule.register({
        secret: process.env.SECRET_KEY || "hello",
        signOptions:{
          expiresIn: "12h"
        }

      })
  ],
    exports: [
        AuthService,
        JwtModule
    ]
})
export class AuthModule {}
