import { DeleteResult, EntityRepository, Repository, UpdateResult } from "typeorm";
import { RolUsuario } from "../entities/RolUsuario";
import { RolUsuarioDto } from "../entities/dto/RolUserDto"
import {MongoDataSource} from "../configs/db";
import { ListPaginate } from "../entities/dto/GeneralDto"
import { EstadoEnum } from "../configs/Config.enum"
import { Rol } from "../entities/Rol";
import { RolDto } from "../entities/dto/RolDto";
import { ObjectID } from "mongodb";


class RolRepository {
    private repository = MongoDataSource.getRepository(Rol);

    public async  findByDto (params: RolUsuarioDto): Promise<ListPaginate |null>{
        let options={}
        options={...params}
        const [result,total] = await this.repository.findAndCount(options);
        
        return {
            data: result,
            count: total
        }
    };

    public async  findById (params: string): Promise<Rol | null>{    
        let options={}
        options = {
            where: {
                _id: new ObjectID(params)
            },
        };
        
        const result = await this.repository.findOne(options);
        
        return result
    };

    public async  findByINId (params: string[]): Promise<Rol[]>{    
        let options={}
        options={
            where: {
                firstName: { $in: params },
            },   
        }
            
        const result = await this.repository.find(options);        
        return result
    };
    
    public async  desactivar (id: string){
        const firstUser = await this.repository.update(id,{estado: EstadoEnum.ELIMINADO});
        return firstUser;
    };
    
    public async  actualizar (id:string, param: RolDto){
        const firstUser = await this.repository.update(id,param);
        return firstUser;
    };
    
    public async  delete (params: RolUsuario): Promise<DeleteResult>{
        let options={}
        options={params}
        const firstUser = await this.repository.delete(options);
        return firstUser;
    };


    public async  listAll (): Promise<ListPaginate>{
        const [result,total] = await this.repository.findAndCount();        
        return {
            data: result,
            count: total
        }
    };

    public async save(params: Rol): Promise<Rol> {
        const oRol = await this.repository.save(params);
        return oRol;
    };

}
export default new RolRepository();