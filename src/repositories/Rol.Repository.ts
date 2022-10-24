import { DeleteResult, EntityRepository, Repository, UpdateResult } from "typeorm";
import { RolUsuario } from "../entities/RolUsuario";
import { createRolUserDto,rolUserDtoParcial } from "../entities/dto/RolUserDto"
import {MongoDataSource} from "../configs/db";
import { ListPaginate } from "../entities/dto/GeneralDto"
import { EstadoEnum } from "../configs/Config.enum"
import { Rol } from "../entities/Rol";
import { RolDto } from "../entities/dto/RolDto";


class RolRepository {
    private repository = MongoDataSource.getRepository(Rol);

    public async  findByDto (params: createRolUserDto): Promise<ListPaginate |null>{
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
        options={params}
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

}
export default new RolRepository();