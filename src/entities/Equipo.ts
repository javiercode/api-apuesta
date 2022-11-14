import {Column, Entity, PrimaryColumn, CreateDateColumn, ObjectIdColumn, OneToOne, JoinColumn,ManyToOne, BaseEntity, Index } from 'typeorm';
import { ObjectID } from 'mongodb';
import { EquipoDto } from './dto/EquipoDto';
import { EstadoEnum } from '../configs/Config.enum';

@Entity('Equipo')
export class Equipo{
    
    @ObjectIdColumn()
    public id: ObjectID

    @Column()
    @Index({ unique: true })
    nombre:string

    @Column()
    estado:string

    @CreateDateColumn()
    fechaRegistro:Date

    @Column()
    fechaModificacion:Date
    
    @Column()
    usuarioRegistro:string

    @Column()
    usuarioModificacion:string
    
    constructor(params: EquipoDto = {} as EquipoDto){
        this.nombre=params.nombre;
        this.estado = this.estado || EstadoEnum.ACTIVO;
    }
}