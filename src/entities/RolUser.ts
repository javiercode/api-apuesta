import {Column, Entity, PrimaryColumn, CreateDateColumn, OneToOne,OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { RolUserDto } from './dto/RolUserDto';
import { EstadoEnum } from '../configs/Config.enum';

@Entity('rol_user')
export class RolUser {

    @PrimaryGeneratedColumn({name:"ID"})
    public id: number;

    @Column({name:"COD_ROL"})
    codRol:number;

    @Column({name:"COD_USUARIO"})
    codUsuario:number;

    @Column({name:"COD_GRUPO"})
    codGrupo:number;
    
    @Column({name:"ESTADO",default: EstadoEnum.ACTIVO,length:1})
    estado:string

    @CreateDateColumn({name:"FECHA_REGISTRO"})
    fechaRegistro:Date

    @Column({name:"FECHA_MODIFICACION"})
    fechaModificacion:Date
    
    @Column({name:"USUARIO_REGISTRO",length:50})
    usuarioRegistro:string

    @Column({name:"USUARIO_MODIFICACION", length:50})
    usuarioModificacion:string

    constructor(params: RolUserDto = {} as RolUserDto){
        this.usuarioRegistro = params.usuarioRegistro || this.usuarioRegistro;
        this.estado = this.estado || EstadoEnum.ACTIVO;  
    }
}