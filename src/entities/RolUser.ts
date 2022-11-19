import {Column, Entity, PrimaryColumn, CreateDateColumn, ObjectIdColumn,OneToOne,OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { ObjectID } from 'mongodb';
import { RolUserDto } from './dto/RolUserDto';
import { EstadoEnum } from '../configs/Config.enum';

@Entity('RolUser')
export class RolUser {

    @PrimaryGeneratedColumn({name:"ID"})
    public id: ObjectID;

    @Column({name:"COD_ROL"})
    codRol:ObjectID;

    @Column({name:"OCD_USUARIO"})
    codUsuario:ObjectID;

    @Column({name:"COD_GRUPO"})
    codGrupo:ObjectID;
    
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

    constructor(params: RolUserDto = {} as RolUserDto){
        this.codRol = new ObjectID(params.codRol),
        this.codUsuario = new ObjectID(params.codUsuario),
        this.codGrupo = new ObjectID(params.codGrupo),
        this.usuarioRegistro = params.usuarioRegistro || this.usuarioRegistro;
        this.estado = this.estado || EstadoEnum.ACTIVO;  
    }
}