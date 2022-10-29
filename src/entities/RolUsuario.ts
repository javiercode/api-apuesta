import {Column, Entity, PrimaryColumn, CreateDateColumn, ObjectIdColumn,OneToOne,OneToMany} from 'typeorm';
import { ObjectID } from 'mongodb';
import { RolUsuarioDto } from './dto/RolUserDto';

@Entity('RolUsuario')
export class RolUsuario {

    @ObjectIdColumn()
    public id: ObjectID;

    @Column()
    codRol:string;

    @Column()
    codUsuario:string;

    @Column()
    usuarioRegistro:string

    @Column()
    fechaModificacion:Date

    @Column()
    usurioModificacion:string
    
    @Column({default:'A'})
    estado:string

    constructor(params: RolUsuarioDto = {} as RolUsuarioDto){
        this.codRol = params.codRol,
        this.codUsuario = params.codUsuario,
        this.usuarioRegistro = params.usuarioRegistro || this.usuarioRegistro;
        this.estado = 'A';
    }
}