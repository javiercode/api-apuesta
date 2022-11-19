import {Column, Entity, PrimaryColumn, CreateDateColumn, ObjectIdColumn, OneToOne, JoinColumn,ManyToOne, BaseEntity, Index, Unique, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectID } from 'mongodb';
import { UserDto } from './dto/UserDto';
import { EstadoEnum } from '../configs/Config.enum';

@Entity('User')
export class User{
    
    @PrimaryGeneratedColumn({name:"ID"})
    public id: ObjectID;

    @Column({name:"USERNAME"})
    @Index({ unique: true })
    username:string

    @Column({name:"NOMRE"})
    nombre:string

    @Column({name:"CORREO"})
    correo:string

    @Column({name:"COD_FACEBOOK"})
    codFacebook:string

    @Column({name:"PASSWORD"})
    password:string

    @Column({name:"ESTADO",default: EstadoEnum.ACTIVO})
    estado:string

    @CreateDateColumn({name:"FECHA_REGISTRO"})
    fechaRegistro:Date

    @Column({name:"FECHA_MODIFICACION"})
    fechaModificacion:Date
    
    @Column({name:"USUARIO_REGISTRO"})
    usuarioRegistro:string

    @Column({name:"USUARIO_MODIFICACION"})
    usuarioModificacion:string
    
    constructor(params: UserDto = {} as UserDto){
        this.username=params.username;
        this.correo=params.correo;
        this.nombre=params.nombre;
        this.password=params.password;
        this.codFacebook=params.codFacebook || "";
        this.estado = this.estado || EstadoEnum.ACTIVO;       
    }
}