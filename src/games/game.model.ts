import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {UserModel} from "../users/user.model";
import {ApiProperty} from "@nestjs/swagger";


interface GameModelCreate{
   userId: number,
    score: number
}

@Table({ tableName: 'games' })
export class GameModel extends Model<GameModel, GameModelCreate>{
    @ApiProperty({example: 1})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: 7})
    @ForeignKey(()=>UserModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number

    @ApiProperty({example: 333})
    @Column({type: DataType.INTEGER, allowNull: false})
    score: number

    @BelongsTo(()=>UserModel)
    user: UserModel
}