import { IRol } from './interfaces/IRol.interface';
import { MongoDataSource } from "../configs/db";
import { JwtPayload } from '../entities/dto/GeneralDto';
import { createRolUserDto } from '../entities/dto/RolUserDto';
import { RolUsuario } from '../entities/RolUsuario';
import RolRepository from '../repositories/Rol.Repository';
import { MessageResponse } from '../entities/dto/GeneralDto'
import { esAdmin, esOficial, esJefe, esGerente, controlPermisos } from '../configs/TokenMiddleware';
import { RolesTypeEnum } from '../configs/Config.enum';


class UsersService implements IRol {

    async test(authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos!", code: 0 };
        return res;
    }


    async listAll(): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos", code: 0 };
        try {
            let query = await RolRepository.listAll();
            res.data = query.data;
            res.success = true;
            res.message = "Obtención exitosa";
            res.total = query.count || 0;
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }

        return res;
    }
}

export default new UsersService();