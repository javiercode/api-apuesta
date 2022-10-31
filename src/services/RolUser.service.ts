import { IRolUser } from './interfaces/IRolUser.interface';
import { MongoDataSource } from "../configs/db";
import { JwtPayload } from '../entities/dto/GeneralDto';
import { RolUserDto } from '../entities/dto/RolUserDto';
import { RolUser } from '../entities/RolUser';
import RolUserRepository from '../repositories/RolUser.Repository';
import { MessageResponse } from '../entities/dto/GeneralDto'
import { esAdmin, esOficial, esJefe, esGerente, controlPermisos } from '../configs/TokenMiddleware';
import { RolesTypeEnum } from '../configs/Config.enum';


class RolUserService implements IRolUser {

    async test(authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos!", code: 0 };
        // const result = await this.controlJerarquia(4, authSession);
        // const result2 = await this.controlJurisdiccion(101, authSession);
        return res;
    }

    async list(limit: number, page: number): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos", code: 0 };
        try {
            res.data = [];
            res.success = true;
            res.message = "Obtención exitosa";
            res.total = 0;
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }

        return res;
    }

    async edit(id: string, rolUserDto: RolUserDto, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            const rolUsuario = new RolUser(rolUserDto);
            const userDtoFind = await RolUserRepository.findById(id);

            //const permisos = await controlPermisos(rolUserDto.sucursal, rolUserDto.codRolAplicacion, authSession);
            if (userDtoFind) {
                res.success = true;
                res.message = "rol actualizado!";
                await RolUserRepository.actualizar(id, rolUserDto);
                res.data = rolUserDto;
            } else {
                res.message =  "Rol no encontrado";
            }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }
        return res;
    }

    async create(rolUserDto: RolUserDto, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            const rolUsuario = new RolUser(rolUserDto);
            rolUsuario.usuarioRegistro = authSession.username;
                const existeUser = await RolUserRepository.findByDto(rolUserDto);
                //const permisos = await controlPermisos(rolUserDto.sucursal, rolUserDto.codRolAplicacion, authSession);
                if (existeUser.length==0 ) {
                    res.success = true;
                    res.message = "Rol registrado";
                    const oRolUsuario = RolUserRepository.save(rolUsuario);
                    res.data = oRolUsuario;
                } else {
                    res.message =  "El Rol ya existe";
                }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }
        return res;
    }

    async desactivarUser(idUser: string, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de eliminación", code: 0 };
        try {
            const userDtoFind = await RolUserRepository.findById(idUser);
            if (userDtoFind) {
                    res.success = true;
                    res.message = "rol eliminado";
                    await RolUserRepository.desactivar(idUser);
            } else {
                res.message = "rol no encontrado!";
            }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }
        return res;
    }

    
}

export default new RolUserService();