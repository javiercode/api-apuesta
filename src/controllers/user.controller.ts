import { Request, response, Response } from "express";
import UserService from '../services/User.service';
import { UserDto, UserRegex} from '../entities/dto/UserDto';
import { getFecha, validateParams } from "../configs/General.functions";
import { TypeKeyParamEnum } from "../configs/Config.enum";
import { MessageResponse } from "../entities/dto/GeneralDto";

export async function test (req: Request, res:Response){
    return res.status(501)
}

export async function list (req: Request, res:Response){
    const {page,limit} =req.params;
    const resultPage = validateParams(page,TypeKeyParamEnum.PAGE)
    const resultLimit = validateParams(limit,TypeKeyParamEnum.LIMIT)
    let result;
    if(resultLimit.success && resultPage.success){
        result = await UserService.list(parseInt(limit),parseInt(page));
    }else{
        result = resultLimit.success? resultPage: resultLimit;
    }
    return res.status(200).send(result);
}

export async function create (req: Request, res:Response){
    const userDto = req.body as UserDto;
    let result = validate(toIFormValidateCreate(userDto));
    if(result.success){
        result = await UserService.create(userDto);
    }
    return res.status(200).send(result);
}


export async function desactivar (req: Request, res:Response){
    let result = validateParams(req.params.id,TypeKeyParamEnum.OBJECT_ID)
    if(result.success){
        result = await UserService.desactivar(req.params.id);
    }
    return res.status(200).send(result);
}

function validate(dataForm: UserDto ): MessageResponse {
    let res: MessageResponse = { success: false, message: "Error de validación del(los) campo(s): ", code: 0 };
    try {
        let campoError = [] as string[];
        Object.keys(UserRegex).forEach((key:string) => {
            const value = dataForm[key as keyof UserDto];
            const regexValue = UserRegex[key as keyof UserDto] as any;
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


function toIFormValidateCreate(dataForm: UserDto  ): UserDto {
    let res: UserDto = {
        username:dataForm.username,
        name:dataForm.name,
        correo:dataForm.correo,
        password:dataForm.password,
        codFacebook:dataForm.codFacebook,
    };    
    return res;
}