import { DeleteResult, EntityRepository, Repository, UpdateResult } from "typeorm";
import { RolUser } from "../entities/RolUser";
import { RolUserDto } from "../entities/dto/RolUserDto"
import {MongoDataSource} from "../configs/db";
import { ListPaginate } from "../entities/dto/GeneralDto"
import { ObjectID } from "mongodb";
import { EstadoEnum } from "../configs/Config.enum";
import UserRepository from "./User.Repository";


class RolUserRepository {
    private repository = MongoDataSource.getRepository(RolUser);

    public async  findByUser (username: string): Promise<ListPaginate |null>{
        const oUser = await UserRepository.findByUsername(username);

        let options={}
        options={
            where:{
                codUsuario:oUser?.id,
                estado:EstadoEnum.ACTIVO,
            }
        }

        const [result,total] = await this.repository.findAndCount(options);
        
        return {
            data: result,
            count: total
        }
    };
    public async  findByDtoCount (params: RolUserDto): Promise<ListPaginate |null>{
        let options={}
        options={...params}
        const [result,total] = await this.repository.findAndCount(options);
        
        return {
            data: result,
            count: total
        }
    };

    public async  findByDto (params: RolUserDto): Promise<RolUser | null>{
        let options={}
        options={
            where:{
                codRol:new ObjectID(params.codRol),
                codUsuario:new ObjectID(params.codUsuario),
                codGrupo:new ObjectID(params.codGrupo),
                estado:EstadoEnum.ACTIVO,
            }
        }
        const result = await this.repository.findOne(options);
        
        return result;
    }

    public async  findById (params: string): Promise<RolUser | null>{    
        let options={}
        options = {
            where: {
                _id: new ObjectID(params)
            },
        };
        const result = await this.repository.findOne(options);
        
        return result
    };
    
    public async  desactivar (userId: string){       
        let options={}
        options={userId}
        const firstUser = await this.repository.update(options,{estado:EstadoEnum.ACTIVO});
        return firstUser;
    };
    
    public async  actualizar (userId:string, param: RolUserDto){
        let options={}
        options={userId}
        const firstUser = await this.repository.update(options,param);
        return firstUser;
    };
    
    public async  deleteUser (params: RolUser): Promise<DeleteResult>{
        let options={}
        options={params}
        const firstUser = await this.repository.delete(options);
        return firstUser;
    };
    
    public async  existeUsuario (params: string): Promise<RolUser|null>{    
        let options={}
        options={
            where:{user:params}}
        const result = await this.repository.findOne(options);

        return result
    };


    public async  listAll (limit:number, page:number): Promise<ListPaginate>{
        let options={}
        options={
            where:{
                estado:EstadoEnum.ACTIVO,
            }
        }
        const [result,total] = await this.repository.findAndCount(options);        
        return {
            data: result,
            count: total
        }
    };

    public async listBySucursales (limit:number,page:number,params: string): Promise<ListPaginate>{    
        return {
            data: [],
            count: 0
        }
    };

    public async save(params: RolUser): Promise<RolUser> {
        const oRol = await this.repository.save(params);
        return oRol;
    };
}
export default new RolUserRepository();