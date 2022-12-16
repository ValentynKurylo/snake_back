import { Injectable } from '@nestjs/common';
import {UserModel} from "./user.model";
import {InjectModel} from "@nestjs/sequelize";
import {UserDTO} from "./userDTO/userDTO";

@Injectable()
export class UsersService {
    constructor(@InjectModel(UserModel) private userRepository: typeof UserModel) {
    }

    async createUser(userDTO: UserDTO){
         let user = await this.userRepository.create(userDTO)
         return user
    }

    async getUsers(){
        let users = await this.userRepository.findAll({include:{all: true}})
        return users
    }

    async getUserById(id: number){
        let user = await this.userRepository.findByPk(id)
        return user
    }

    async getUserByName(name: string){
        let users = await this.userRepository.findAll({where: {name}})
        return users
    }

    async getUserByEmail(email: string){
        let user = await this.userRepository.findOne({where: {email}})
        return user
    }

    async putUser(id: number, userDTO: UserDTO){
        await this.userRepository.update(userDTO, {where: {id}})
        return "User was updated"
    }

    async deleteUser(id: number){
        await this.userRepository.destroy({where: {id}})
        return "User was deleted"
    }




}
