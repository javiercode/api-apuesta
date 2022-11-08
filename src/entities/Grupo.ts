import {Column, Entity, PrimaryColumn, CreateDateColumn, ObjectIdColumn, OneToOne, JoinColumn,ManyToOne, BaseEntity, Index } from 'typeorm';
import { ObjectID } from 'mongodb';
import { GrupoDto } from './dto/GrupoDto';
import { EstadoEnum } from '../configs/Config.enum';

@Entity('Grupo')
export class Grupo{
    
    @ObjectIdColumn()
    public id: ObjectID

    @Column()
    @Index({ unique: true })
    nombre:string

    @Column()
    privacidad:string

    @Column()
    clave:string

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
    
    constructor(params: GrupoDto = {} as GrupoDto){
        this.nombre=params.nombre;
        this.privacidad=params.privacidad;
        this.clave=params.clave;
        this.estado = this.estado || EstadoEnum.ACTIVO;
    }
}