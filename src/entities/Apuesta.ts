import {Column, Entity, PrimaryColumn, CreateDateColumn, ObjectIdColumn, OneToOne, JoinColumn,ManyToOne, BaseEntity, Index } from 'typeorm';
import { ObjectID } from 'mongodb';
import { EstadoEnum } from '../configs/Config.enum';
import { ApuestaDto } from './dto/ApuestaDto';

@Entity('Apuesta')
export class Apuesta{
    
    @ObjectIdColumn()
    id: ObjectID

    @Column()
    codPartido:ObjectID

    @Column()
    codRolUser:ObjectID

    @Column()
    local:number

    @Column()
    visitante:number

    @Column()
    localPenales:number

    @Column()
    visitantePenales:number

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
    
    constructor(params: ApuestaDto = {} as ApuestaDto){
        this.codPartido = new ObjectID(params.codPartido);
        this.codRolUser = new ObjectID(params.codRolUser);
        this.local = params.local;
        this.visitante = params.visitante;
        this.localPenales = params.localPenales;
        this.visitantePenales = params.visitantePenales;
        this.estado = this.estado || EstadoEnum.ACTIVO;
    }
}