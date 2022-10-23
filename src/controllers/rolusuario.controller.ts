import { Request, response, Response } from "express";
import { getAuthUser } from '../configs/TokenMiddleware';
import { Tarea } from '../entities/mongo/Tarea';
import { RolUsuario } from '../entities/mongo/RolUsuario';
import { MongoDataSource } from "../configs/db";
import jwt from 'jsonwebtoken';
import RolUsersService from '../services/RolUsuario.service';
import { createRolUserDto, RolUserRegex } from '../entities/dto/RolUserDto';

import { MessageResponse } from "../entities/dto/GeneralDto";
import { TypeKeyParamEnum } from "../configs/Config.enum";
import { validateParams } from "../configs/General.functions";


export async function test(req: Request, res: Response) {
    const { page, limit } = req.params;
    const result = await RolUsersService.test(getAuthUser(req));
    return res.status(200).send(result);
}

export async function listUsuario(req: Request, res: Response) {
    const { page, limit } = req.params;
    const resultPage = validateParams(page,TypeKeyParamEnum.PAGE)
    const resultLimit = validateParams(limit,TypeKeyParamEnum.LIMIT)
    let result;
    if(resultLimit.success && resultPage.success){
        result = await RolUsersService.list(parseInt(limit), parseInt(page), getAuthUser(req));
    }else{
        result = resultLimit.success? resultPage: resultLimit;
    }
    return res.status(200).send(result);
}

export async function createRolUsuario(req: Request, res: Response) {
    const userDto = req.body as createRolUserDto;
    let result = validate(userDto);
    if(result.success){
        result = await RolUsersService.create(userDto, getAuthUser(req));
    }
    return res.status(200).send(result);
}

export async function editRolUsuario(req: Request, res: Response) {
    const userDto = req.body as createRolUserDto;
    const resultPk = validateParams(req.params.id,TypeKeyParamEnum.PK_ORACLE)
    
    let result = validate(userDto);
    if(result.success && resultPk.success){
        result = await RolUsersService.edit(parseInt(req.params.id), userDto, getAuthUser(req));
    }else{
        result = result.success? resultPk: result;
    }
    return res.status(200).send(result);
}

export async function deleteRolUsuario(req: Request, res: Response) {
    let result = validateParams(req.params.id,TypeKeyParamEnum.PK_ORACLE)
    if(result.success){
        result = await RolUsersService.desactivarUser(parseInt(req.params.id), getAuthUser(req));
    }
    return res.status(200).send(result);
}

export async function listRoles(req: Request, res: Response) {
    const result = await RolUsersService.listRoles();
    return res.status(200).send(result);
}

export async function sucursalList(req: Request, res: Response) {
    const result = await RolUsersService.listSucursales(100, 0);
    return res.status(200).send(result);
}

function validate(dataForm: createRolUserDto): MessageResponse {
    let res: MessageResponse = { success: false, message: "Error de validación del(los) campo(s): ", code: 0 };
    try {
        let campoError = [] as string[];
        Object.keys(RolUserRegex).forEach((key:string) => {
            const value = dataForm[key as keyof createRolUserDto];
            const regexValue = RolUserRegex[key as keyof createRolUserDto] as string;
            let regex = new RegExp(regexValue);
            if (!regex.test(value.toString())) {
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

