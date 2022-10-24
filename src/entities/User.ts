import {Column, Entity, PrimaryColumn, CreateDateColumn, ObjectIdColumn, OneToOne, JoinColumn,ManyToOne, BaseEntity, Index } from 'typeorm';
import { ObjectID } from 'mongodb';
import { UserDto } from './dto/UserDto';

@Entity('User')
export class User{
    
    @ObjectIdColumn()
    public id: ObjectID;

    @Column()
    @Index({ unique: true })
    username:string

    @Column()
    name:string

    @Column()
    correo:string

    @Column()
    codFacebook:string

    @Column()
    password:string

    @Column({default:'A'})
    estado:string

    @CreateDateColumn()
    fechaRegistro:Date

    @Column()
    fechaModificacion:Date
    
    constructor(params: UserDto = {} as UserDto){
        this.username=params.username;
        this.correo=params.correo;
        this.name=params.name;
        this.password=params.password;
        this.codFacebook=params.codFacebook || "";
        this.estado = params.estado || 'A';
        
    }
}