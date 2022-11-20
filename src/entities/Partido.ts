import {Column, Entity, PrimaryColumn, CreateDateColumn, OneToOne, JoinColumn,ManyToOne, BaseEntity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { PartidoDto } from './dto/PartidoDto';
import { EstadoEnum } from '../configs/Config.enum';

@Entity('partido')
export class Partido{
    
    @PrimaryGeneratedColumn({name:"ID"})
    public id: number

    @Column({name:"LOCAL"})
    local: number

    @Column({name:"VISITANTE"})
    visitante: number

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
    
    constructor(params: PartidoDto = {} as PartidoDto){
        this.local= (params.local);
        this.visitante= (params.visitante);
        this.fecha= params.fecha;
        this.marcadorLocal= params.marcadorLocal;
        this.marcadorVisitante= params.marcadorVisitante;
        this.penalesLocal= params.penalesLocal;
        this.penalesVisitante= params.penalesVisitante;
        this.estado = this.estado || EstadoEnum.ACTIVO;
    }
}