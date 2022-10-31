import { Request, response, Response } from "express";
import { getMongoRepository } from 'typeorm';
import {MongoDataSource} from "../configs/db";
import jwt from 'jsonwebtoken';
import {encodeToken} from '../configs/TokenMiddleware'
import {MessageResponse} from '../entities/dto/GeneralDto';
import UsersService from '../services/RolUser.service';
import AuthService from '../services/Auth.service';
import { TypeKeyParamEnum} from '../configs/Config.enum';
import { validateParams } from "../configs/General.functions";

class LoginController {
    public async login (req: Request, res:Response){
        const {username, password} = req.body;
        let result = validateParams(username,TypeKeyParamEnum.USER)
        if(result.success){
            result = await AuthService.auth(username,password);
            if(result.success){
                res =  encodeToken(res, username, result.data.NOMBRE, result.data.ROL,result.data.ROL_ID, result.data.SUCURSALES,result.data.SUCURSAL_PRINCIPAL,result.data.DEPARTAMENTO);
            }
        }
        return res.status(200).send(result);
    }

    public logout (req: Request, res:Response){
        res.send('Hola Logout')
    }
}
export default new LoginController();