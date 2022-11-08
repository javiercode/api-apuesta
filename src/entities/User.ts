import {Column, Entity, PrimaryColumn, CreateDateColumn, ObjectIdColumn, OneToOne, JoinColumn,ManyToOne, BaseEntity, Index, Unique } from 'typeorm';
import { ObjectID } from 'mongodb';
import { UserDto } from './dto/UserDto';
import { EstadoEnum } from '../configs/Config.enum';

@Entity('User')
// @Unique(["username", "correo"])
// @Index(['username'], { unique: true })
export class User{
    
    @ObjectIdColumn()
    public id: ObjectID;

    @Column()
    @Index({ unique: true })
    username:string

    @Column()
    name:string

    @Column()
    correo:string

    @Column()
    codFacebook:string

    @Column()
    password:string

    @Column({default:'A'})
    estado:string

    @CreateDateColumn()
    fechaRegistro:Date

    @Column()
    fechaModificacion:Date
    
    constructor(params: UserDto = {} as UserDto){
        this.username=params.username;
        this.correo=params.correo;
        this.name=params.name;
        this.password=params.password;
        this.codFacebook=params.codFacebook || "";
        this.estado = this.estado || EstadoEnum.ACTIVO;       
    }
}