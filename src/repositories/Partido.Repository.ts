import { DeleteResult, EntityRepository, Repository, UpdateResult } from "typeorm";
import {MysqlDataSource} from "../configs/db";
import { ListPaginate } from "../entities/dto/GeneralDto"
import { EstadoEnum } from "../configs/Config.enum"
import { PartidoDto } from "../entities/dto/PartidoDto";
import { ObjectID } from "mongodb";
import { Partido } from "../entities/Partido";

class RolRepository {
    private repository = MysqlDataSource.getRepository(Partido);

    public async  findByDto (params: PartidoDto): Promise<Partido |null>{
        let options={}
        options={
            where: {
                local: params.local,
                visitante: params.visitante,
                estado: EstadoEnum.ACTIVO
            },
        }
        
        const result = await this.repository.findOne(options);
        return result;
    };

    public async  findById (params: string): Promise<Partido | null>{    
        let options={}
        options = {
            where: {
                _id: new ObjectID(params)
            },
        };
        const result = await this.repository.findOne(options);
        return result
    };

    public async findByNombre (params: string): Promise<Partido | null>{    
        let options={}
        options = {
            where: {
                nombre: params
            },
        };
        const result = await this.repository.findOne(options);
        return result
    };

    public async  findByINId (params: string[]): Promise<Partido[]>{    
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
    
    public async  actualizar (id:string, param: PartidoDto){
        const firstUser = await this.repository.update(id,param);
        return firstUser;
    };
    
    public async  delete (params: Partido): Promise<DeleteResult>{
        let options={}
        options={params}
        const firstUser = await this.repository.delete(options);
        return firstUser;
    };


    public async  listAll (): Promise<ListPaginate>{
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

    public async save(params: Partido): Promise<Partido> {
        const oRol = await this.repository.save(params);
        return oRol;
    };

}
export default new RolRepository();