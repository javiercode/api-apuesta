import {Column, Entity, PrimaryColumn, CreateDateColumn, ObjectIdColumn, OneToOne, JoinColumn,ManyToOne, BaseEntity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectID } from 'mongodb';
import { RolDto } from './dto/RolDto';
import { EstadoEnum } from '../configs/Config.enum';

@Entity('Rol')
export class Rol{
    
    @PrimaryGeneratedColumn({name:"ID"})
    public id: ObjectID;

    @Column({name:"CODIGO"})
    @Index({ unique: true })
    codigo:string

    @Column({name:"DESCRIPCION"})
    descripcion:string

    @Column({name:"JERARQUIA"})
    jerarquia:number

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
    
    constructor(params: RolDto = {} as RolDto){
        this.codigo=params.codigo;
        this.descripcion=params.descripcion;
        this.jerarquia=params.jerarquia;
        this.estado = this.estado || EstadoEnum.ACTIVO; 
        
    }
}