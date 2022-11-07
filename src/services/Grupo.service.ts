import { MongoDataSource } from "../configs/db";
import { JwtPayload } from '../entities/dto/GeneralDto';
import { GrupoEditDto, GrupoDto } from '../entities/dto/GrupoDto';
import { Grupo} from '../entities/Grupo';
import GrupoRepository from '../repositories/Grupo.Repository';
import { MessageResponse } from '../entities/dto/GeneralDto'
import { getFecha } from '../configs/General.functions';
import { IGrupo } from './interfaces/IGrupo.interface';


class GrupoService implements IGrupo {

    async test(authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos!", code: 0 };
        return res;
    }


    async listAll(): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos", code: 0 };
        try {
            let query = await GrupoRepository.listAll();
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

    async edit(id: string, grupoEditDto: GrupoEditDto, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            const userDtoFind = await GrupoRepository.findById(id) as Grupo;
            const isActive = userDtoFind?.estado == 'A' || false;
            if (!userDtoFind || !(isActive)) {
                res.message = "Grupo no encontrado!";
            } else {
                res.success = true;
                res.message = "Grupo actualizado!";

                grupoEditDto.fechaModificacion = getFecha(new Date());
                const oGrupo = await GrupoRepository.actualizar(id, grupoEditDto);
                res.data = grupoEditDto;
            }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }
        return res;
    }

    async create(dto: GrupoDto, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            let oGrupo = new Grupo();
            oGrupo.nombre = dto.nombre.toLocaleLowerCase();
            oGrupo.codigo = this.generarCodigo();
            oGrupo.usuarioRegistro = authSession.username;
            oGrupo.fechaRegistro = getFecha(new Date())
            res.success = true;
            res.message = "Grupo registrado";

            oGrupo = await MongoDataSource.manager.save(oGrupo);
            res.data = oGrupo;
        } catch (error) {
            console.error(error);
        }
        return res;
    }

    generarCodigo():string{
        let codigo = "";
        codigo = new Date().getTime().toString();
        return codigo;
    }

    async desactivar(idUser: string, authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de eliminación", code: 0 };
        try {
            const userDtoFind = await GrupoRepository.findById(idUser);
            if (userDtoFind) {
                GrupoRepository.desactivar(idUser);
                res.success = true;
                res.message = "Grupo eliminado";

            } else {
                res.message = "Grupo no encontrado!";
            }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }
        return res;
    }
}

export default new GrupoService();