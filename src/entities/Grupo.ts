import {Column, Entity, PrimaryColumn, CreateDateColumn, ObjectIdColumn, OneToOne, JoinColumn,ManyToOne, BaseEntity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectID } from 'mongodb';
import { GrupoDto } from './dto/GrupoDto';
import { EstadoEnum } from '../configs/Config.enum';

@Entity('Grupo')
export class Grupo{
    
    @PrimaryGeneratedColumn({name:"ID"})
    public id: number

    @Column({name:"NOMBRE"})
    @Index({ unique: true })
    nombre:string

    @Column({name:"PRIVACIDAD"})
    privacidad:string

    @Column({name:"CLAVE"})
    clave:string

    @Column({name:"TIPO"})
    tipo:string

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
    
    constructor(params: GrupoDto = {} as GrupoDto){
        this.nombre=params.nombre;
        this.privacidad=params.privacidad;
        this.tipo=params.tipo;
        this.clave=params.clave;
        this.estado = this.estado || EstadoEnum.ACTIVO;
    }
}