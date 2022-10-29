import { DeleteResult, EntityRepository, Repository, UpdateResult } from "typeorm";
import { RolUsuario } from "../entities/RolUsuario";
import { RolUsuarioDto } from "../entities/dto/RolUserDto"
import {MongoDataSource} from "../configs/db";
import { ListPaginate } from "../entities/dto/GeneralDto"
import { ObjectID } from "mongodb";


class RolUserRepository {
    private repository = MongoDataSource.getRepository(RolUsuario);

    public async  findByDto (params: RolUsuarioDto): Promise<ListPaginate |null>{
        let options={}
        options={...params}
        const [result,total] = await this.repository.findAndCount(options);
        
        return {
            data: result,
            count: total
        }
    };

    public async  findById (params: string): Promise<RolUsuario | null>{    
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
        const firstUser = await this.repository.update(options,{estado:'A'});
        return firstUser;
    };
    
    public async  actualizar (userId:string, param: RolUsuarioDto){
        let options={}
        options={userId}
        const firstUser = await this.repository.update(options,param);
        return firstUser;
    };
    
    public async  deleteUser (params: RolUsuario): Promise<DeleteResult>{
        let options={}
        options={params}
        const firstUser = await this.repository.delete(options);
        return firstUser;
    };
    
    public async  existeUsuario (params: string): Promise<RolUsuario|null>{    
        let options={}
        options={
            where:{user:params}}
        const result = await this.repository.findOne(options);

        return result
    };


    public async  listAll (limit:number, page:number): Promise<ListPaginate>{
        const [result,total] = await this.repository.findAndCount();        
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
}
export default new RolUserRepository();