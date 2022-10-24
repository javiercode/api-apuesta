import { DeleteResult, EntityRepository, Repository, UpdateResult } from "typeorm";
import { RolUsuario } from "../entities/RolUsuario";
import { createRolUserDto,rolUserDtoParcial } from "../entities/dto/RolUserDto"
import {MongoDataSource} from "../configs/db";
import { ListPaginate } from "../entities/dto/GeneralDto"


class RolUserRepository {
    private repository = MongoDataSource.getRepository(RolUsuario);

    public async  findByDto (params: createRolUserDto): Promise<ListPaginate |null>{
        let options={}
        options={...params}
        const [result,total] = await this.repository.findAndCount(options);
        
        return {
            data: result,
            count: total
        }
    };

    public async  findById (params: number): Promise<RolUsuario | null>{    
        let options={}
        options={params}
        const result = await this.repository.findOne(options);
        
        return result
    };
    
    public async  desactivar (userId: number){       
        let options={}
        options={userId}
        const firstUser = await this.repository.update(options,{estado:'A'});
        return firstUser;
    };
    
    public async  actualizar (userId:number, param: createRolUserDto){
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