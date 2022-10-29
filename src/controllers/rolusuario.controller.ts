import { Request, response, Response } from "express";
import { getAuthUser } from '../configs/TokenMiddleware';
import { RolUsuario } from '../entities/RolUsuario';
import { MongoDataSource } from "../configs/db";
import jwt from 'jsonwebtoken';
import RolUsersService from '../services/RolUsuario.service';
import RolService from '../services/Rol.service';
import { RolUsuarioDto, RolUserRegex } from '../entities/dto/RolUserDto';

import { MessageResponse } from "../entities/dto/GeneralDto";
import { TypeKeyParamEnum } from "../configs/Config.enum";
import { validateParams } from "../configs/General.functions";

class RolUserController {

    public async test(req: Request, res: Response) {
        const { page, limit } = req.params;
        const result = await RolUsersService.test(getAuthUser(req));
        return res.status(200).send(result);
    }

    public async listUsuario(req: Request, res: Response) {
        const { page, limit } = req.params;
        const resultPage = validateParams(page,TypeKeyParamEnum.PAGE)
        const resultLimit = validateParams(limit,TypeKeyParamEnum.LIMIT)
        let result;
        if(resultLimit.success && resultPage.success){
            result = await RolUsersService.list(parseInt(limit), parseInt(page));
        }else{
            result = resultLimit.success? resultPage: resultLimit;
        }
        return res.status(200).send(result);
    }

    public async createRolUsuario(req: Request, res: Response) {
        const userDto = req.body as RolUsuarioDto;
        let result = this.validate(userDto);
        if(result.success){
            result = await RolUsersService.create(userDto, getAuthUser(req));
        }
        return res.status(200).send(result);
    }

    public async editRolUsuario(req: Request, res: Response) {
        const userDto = req.body as RolUsuarioDto;
        const resultPk = validateParams(req.params.id,TypeKeyParamEnum.OBJECT_ID)
        
        let result = this.validate(userDto);
        if(result.success && resultPk.success){
            result = await RolUsersService.edit((req.params.id), userDto, getAuthUser(req));
        }else{
            result = result.success? resultPk: result;
        }
        return res.status(200).send(result);
    }

    public async deleteRolUsuario(req: Request, res: Response) {
        let result = validateParams(req.params.id,TypeKeyParamEnum.OBJECT_ID)
        if(result.success){
            result = await RolUsersService.desactivarUser((req.params.id), getAuthUser(req));
        }
        return res.status(200).send(result);
    }

    private validate(dataForm: RolUsuarioDto): MessageResponse {
        let res: MessageResponse = { success: false, message: "Error de validación del(los) campo(s): ", code: 0 };
        try {
            let campoError = [] as string[];
            Object.keys(RolUserRegex).forEach((key:string) => {
                const value = dataForm[key as keyof RolUsuarioDto];
                const regexValue = RolUserRegex[key as keyof RolUsuarioDto] as string;
                let regex = new RegExp(regexValue);
                if (value && !regex.test(value.toString())) {
                    campoError.push(key);
                }
            });
            res.success = campoError.length==0;
            res.message = campoError.length > 0? (res.message + campoError.join(", ")):"Sin error";    
        } catch (error) {
            console.error(error)
        }
        
        return res;
    }
}
export default new RolUserController();