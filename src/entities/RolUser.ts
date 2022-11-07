import {Column, Entity, PrimaryColumn, CreateDateColumn, ObjectIdColumn,OneToOne,OneToMany} from 'typeorm';
import { ObjectID } from 'mongodb';
import { RolUserDto } from './dto/RolUserDto';
import { EstadoEnum } from '../configs/Config.enum';

@Entity('RolUser')
export class RolUser {

    @ObjectIdColumn()
    public id: ObjectID;

    @Column()
    codRol:ObjectID;

    @Column()
    codUsuario:ObjectID;

    @Column()
    codGrupo:ObjectID;

    @CreateDateColumn()
    fechaRegistro:Date

    @Column()
    usuarioRegistro:string

    @Column()
    fechaModificacion:Date

    @Column()
    usurioModificacion:string
    
    @Column({default:EstadoEnum.ACTIVO})
    estado:string

    constructor(params: RolUserDto = {} as RolUserDto){
        this.codRol = new ObjectID(params.codRol),
        this.codUsuario = new ObjectID(params.codUsuario),
        this.usuarioRegistro = params.usuarioRegistro || this.usuarioRegistro;
        this.estado = this.estado || EstadoEnum.ACTIVO;  
    }
}