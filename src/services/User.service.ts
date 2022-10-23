import { IUser } from './interfaces/IUser.interface';
import {MongoDataSource} from "../configs/db";
import {JwtPayload} from '../entities/dto/GeneralDto';
import { UserDto, UserEditDto } from '../entities/dto/UserDto';
import { ListPaginate } from '../entities/dto/GeneralDto';
import { Turno } from '../entities/mongo/Turno';
import { findAll, actualizar,findById,findByDto,desactivar } from '../repositories/User.Repository';
import { MessageResponse} from '../entities/dto/GeneralDto'
import { getFecha } from '../configs/General.functions';
import { User } from '../entities/mongo/User';
import * as crypto from "crypto";

class UserService implements IUser {

    async list(limit: number, page: number): Promise<MessageResponse> {
        const res:MessageResponse={success:false, message:"Error de obtencion de datos!", code:0};
        try {
            const query = await findAll(limit,page)
            res.data = query?.data;
            res.success = true;
            res.message = "Obtención exitosa";
            res.total = query?.count || 0;
        } catch (error) {
            // if (error instanceof TypeError) {
                console.error(error);
            // }
        }
        
        return res;
    }

    async edit(id:string,userEditDto: UserEditDto): Promise<MessageResponse> {
        const res:MessageResponse={success:false, message:"Error de registro", code:0};
        try {
            const userDtoFind = await findById(id) as User;
            const isActive = userDtoFind?.estado =='A' || false;
            if(!userDtoFind || !(isActive)){
                res.message = "Cliente no encontrado!";
            }else{
                res.success = true;
                res.message = "Cliente actualizado!";

                userEditDto.fechaModificacion = getFecha(new Date());
                const oRolUsuario = await actualizar(id,userEditDto);
                res.data = userEditDto;
            }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }
        return res;
    }

    async create(userDto: UserDto): Promise<MessageResponse> {
        const res:MessageResponse={success:false, message:"Error de registro", code:0};
        //try {
            const oUser = new User(userDto);
            oUser.fechaRegistro = getFecha(new Date())
            res.success = true;
            res.message = "Turno registrado";

            let salt = 'f844b09ff50c'
            let hash = crypto.pbkdf2Sync(userDto.password, salt,  
                1000, 64, `sha512`).toString(`hex`);
            oUser.password =hash;

            const oRolUsuario = await MongoDataSource.manager.save(oUser);
            res.data = oRolUsuario;
        /*} catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }*/
        return res;
    }
    

    async desactivar(idUser: string): Promise<MessageResponse> {
        const res:MessageResponse={success:false, message:"Error de eliminación", code:0};
        try {
            const userDtoFind = await findById(idUser);
            if(userDtoFind){
                res.success = true;
                res.message = "Cliente eliminado";
                const oRolUsuario = desactivar(idUser);
                
            }else{
                res.message = "Cliente no encontrado!";
                // res.data = oRolUsuario;
            }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }
        return res;
    }
    
}

export default new UserService();