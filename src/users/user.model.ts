import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {GameModel} from "../games/game.model";
import {ApiProperty} from "@nestjs/swagger";

interface UserCreate{
    name: string,
    email: string,
    password: string,
    country: string
}

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel, UserCreate>{
    @ApiProperty({example: 1})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "Valentyn Kurylo"})
    @Column({type: DataType.STRING})
    name: string

    @ApiProperty({example: "user@gmail.com"})
    @Column({type: DataType.STRING, unique: true})
    email: string

    @ApiProperty({example: "1111"})
    @Column({type: DataType.STRING})
    password: string

    @ApiProperty({example: "Ukrain"})
    @Column({type: DataType.STRING})
    country: string

    @ApiProperty({example: "user"})
    @Column({type: DataType.STRING, defaultValue: "user"})
    role: string

    @HasMany(()=> GameModel)
    games: GameModel[]
}