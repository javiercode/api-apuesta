import { IRolUsuario } from './interfaces/IRolUsuario.interface';
import { MongoDataSource } from "../configs/db";
import { JwtPayload } from '../entities/dto/GeneralDto';
import { RolUsuarioDto } from '../entities/dto/RolUserDto';
import { RolUsuario } from '../entities/RolUsuario';
import RolUserRepository from '../repositories/RolUsuario.Repository';
import { MessageResponse } from '../entities/dto/GeneralDto'
import { esAdmin, esOficial, esJefe, esGerente, controlPermisos } from '../configs/TokenMiddleware';
import { RolesTypeEnum } from '../configs/Config.enum';


class RolUsuarioService implements IRolUsuario {

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

    async edit(id: string, rolUserDto: RolUsuarioDto, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            const rolUsuario = new RolUsuario(rolUserDto);
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

    async create(rolUserDto: RolUsuarioDto, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            const rolUsuario = new RolUsuario(rolUserDto);

                //const existeUser = await RolUserRepository.existeUsuario(rolUserDto.usuario);
                //const permisos = await controlPermisos(rolUserDto.sucursal, rolUserDto.codRolAplicacion, authSession);
                if (true) {
                //if (existeUser ) {
                    res.success = true;
                    res.message = "Rol registrado";
                    const oRolUsuario = await MongoDataSource.manager.save(rolUsuario);
                    res.data = oRolUsuario;
                } else {
                    res.message =  "El usuario no existe o esta inhabilitado!";
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

export default new RolUsuarioService();