import {Column, Entity, PrimaryColumn, CreateDateColumn, ObjectIdColumn, OneToOne, JoinColumn,ManyToOne, BaseEntity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectID } from 'mongodb';
import { EquipoDto } from './dto/EquipoDto';
import { EstadoEnum } from '../configs/Config.enum';

@Entity('Equipo')
export class Equipo{
    
    @PrimaryGeneratedColumn({name:"ID"})
    public id: number

    @Column({name:"NOMBRE"})
    @Index({ unique: true })
    nombre:string

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
    
    constructor(params: EquipoDto = {} as EquipoDto){
        this.nombre=params.nombre;
        this.estado = this.estado || EstadoEnum.ACTIVO;
    }
}