import {ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {UserDTO} from "../users/userDTO/userDTO";
import * as bcrypt from 'bcryptjs'
import {UserModel} from "../users/user.model";
import {AuthDTO} from "./authDTO/authDTO";
import {Observable} from "rxjs";

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) {
    }

    async login(authDTO: AuthDTO){
        let user = await this.validateUser(authDTO)
        return this.generateToken(user)
    }

    async registration(body: UserDTO){
        let candidate = await this.userService.getUserByEmail(body.email)

        if(candidate){
            throw new HttpException('User with such email already exists', HttpStatus.BAD_REQUEST)
        }

        let hashPassword = await bcrypt.hash(body.password, 5)
        let user = await this.userService.createUser({...body, password: hashPassword})
        return this.generateToken(user)
    }


    private async generateToken(user: UserModel) {
         let payload = {
             id: user.id,
             email: user.email,
             role: user.role
         }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(authDTO: AuthDTO) {
        try {
            let user = await this.userService.getUserByEmail(authDTO.email)
            let password = await bcrypt.compare(authDTO.password, user.password)
            if (user && password) {
                return user
            }
            throw new UnauthorizedException({message: "Wrong email or password", status: 401})
        } catch (e) {
            throw new UnauthorizedException({message: "Wrong email or password", status: 401})
        }
    }
}
