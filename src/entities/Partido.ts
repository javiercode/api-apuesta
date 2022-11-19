import {Column, Entity, PrimaryColumn, CreateDateColumn, ObjectIdColumn, OneToOne, JoinColumn,ManyToOne, BaseEntity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectId, ObjectID } from 'mongodb';
import { PartidoDto } from './dto/PartidoDto';
import { EstadoEnum } from '../configs/Config.enum';

@Entity('Partido')
export class Partido{
    
    @PrimaryGeneratedColumn({name:"ID"})
    public id: ObjectID

    @Column({name:"LOCAL"})
    local: ObjectID

    @Column({name:"VISITANTE"})
    visitante: ObjectID

    @Column({name:"FECHA"})
    fecha: Date

    @Column({name:"MARCADOR_LOCAL"})
    marcadorLocal: number

    @Column({name:"MARCADOR_VISITANTE"})
    marcadorVisitante: number

    @Column({name:"PENALES_LOCAL"})
    penalesLocal: number

    @Column({name:"PENALES_VISITANTE"})
    penalesVisitante: number

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
    
    constructor(params: PartidoDto = {} as PartidoDto){
        this.local= new ObjectId(params.local);
        this.visitante= new ObjectId(params.visitante);
        this.fecha= params.fecha;
        this.marcadorLocal= params.marcadorLocal;
        this.marcadorVisitante= params.marcadorVisitante;
        this.penalesLocal= params.penalesLocal;
        this.penalesVisitante= params.penalesVisitante;
        this.estado = this.estado || EstadoEnum.ACTIVO;
    }
}