import {Column, Entity, PrimaryColumn, CreateDateColumn, ObjectIdColumn, OneToOne, JoinColumn,ManyToOne, BaseEntity, Index } from 'typeorm';
import { ObjectID } from 'mongodb';
import { RolDto } from './dto/RolDto';

@Entity('Rol')
export class Rol{
    
    @ObjectIdColumn()
    public id: ObjectID;

    @Column()
    @Index({ unique: true })
    codigo:string

    @Column()
    descripcion:string

    @Column()
    jerarquia:number

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
    
    constructor(params: RolDto = {} as RolDto){
        this.codigo=params.codigo;
        this.descripcion=params.descripcion;
        this.jerarquia=params.jerarquia;
        this.estado = 'A';
        
    }
}