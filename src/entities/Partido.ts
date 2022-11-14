import {Column, Entity, PrimaryColumn, CreateDateColumn, ObjectIdColumn, OneToOne, JoinColumn,ManyToOne, BaseEntity, Index } from 'typeorm';
import { ObjectId, ObjectID } from 'mongodb';
import { PartidoDto } from './dto/PartidoDto';
import { EstadoEnum } from '../configs/Config.enum';

@Entity('Partido')
export class Partido{
    
    @ObjectIdColumn()
    public id: ObjectID

    @Column()
    local: ObjectID

    @Column()
    visitante: ObjectID

    @Column()
    marcadorLocal: number

    @Column()
    marcadorVisitante: number

    @Column()
    penalesLocal: number

    @Column()
    penalesVisitante: number

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
    
    constructor(params: PartidoDto = {} as PartidoDto){
        this.local= new ObjectId(params.local);
        this.visitante= new ObjectId(params.visitante);
        this.marcadorLocal= params.marcadorLocal;
        this.marcadorVisitante= params.marcadorVisitante;
        this.penalesLocal= params.penalesLocal;
        this.penalesVisitante= params.penalesVisitante;
        this.estado = this.estado || EstadoEnum.ACTIVO;
    }
}