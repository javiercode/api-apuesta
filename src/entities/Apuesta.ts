import {Column, Entity, PrimaryColumn, CreateDateColumn, ObjectIdColumn, OneToOne, JoinColumn,ManyToOne, BaseEntity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectID } from 'mongodb';
import { EstadoEnum } from '../configs/Config.enum';
import { ApuestaDto } from './dto/ApuestaDto';

@Entity('Apuesta')
export class Apuesta{
    
    @PrimaryGeneratedColumn({name:"ID"})
    id: number

    @Column({name:"COD_PARTIDO"})
    codPartido:ObjectID

    @Column({name:"COD_ROL_USER"})
    codRolUser:ObjectID

    @Column({name:"LOCAL"})
    local:number

    @Column({name:"VISITANTE"})
    visitante:number

    @Column({name:"LOCAL_PENAL"})
    localPenal:number

    @Column({name:"VISITANTE_PENAL"})
    visitantePenal:number

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
    
    constructor(params: ApuestaDto = {} as ApuestaDto){
        this.codPartido = new ObjectID(params.codPartido);
        this.codRolUser = new ObjectID(params.codRolUser);
        this.local = params.local;
        this.visitante = params.visitante;
        this.localPenal = params.localPenal;
        this.visitantePenal = params.visitantePenal;
        this.estado = this.estado || EstadoEnum.ACTIVO;
    }
}