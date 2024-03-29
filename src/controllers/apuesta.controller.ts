import { Request, response, Response } from "express";
import { getAuthUser } from '../configs/TokenMiddleware';
import ApuestaService from '../services/Apuesta.service';
import { MessageResponse } from "../entities/dto/GeneralDto";
import { TypeKeyParamEnum } from "../configs/Config.enum";
import { validateParams } from "../configs/General.functions";
import { ApuestaDto, ApuestaEditDto, ApuestaRegex, OApuestaRegex } from "../entities/dto/ApuestaDto";

class ApuestaController {

    public async test(req: Request, res: Response) {
        const { page, limit } = req.params;
        const result = await ApuestaService.test(getAuthUser(req));
        return res.status(200).send(result);
    }

    public async list(req: Request, res: Response) {
        const { page, limit } = req.params;
        let result;
        result = await ApuestaService.listAll();
        return res.status(200).send(result);
    }

    public async create(req: Request, res: Response) {
        const dto = req.body as ApuestaDto;
        let result = validate(dto);
        if(result.success){
            result = await ApuestaService.create(dto, getAuthUser(req));
        }
        return res.status(200).send(result);
    }

    public async edit(req: Request, res: Response) {
        const dto = req.body as ApuestaEditDto;
        let result = validateParams(req.params.id,TypeKeyParamEnum.OBJECT_ID)
        
        if(result.success){
            result = await ApuestaService.edit((req.params.id), dto, getAuthUser(req));
        }
        return res.status(200).send(result);
    }

    public async delete(req: Request, res: Response) {
        let result = validateParams(req.params.id,TypeKeyParamEnum.OBJECT_ID)
        if(result.success){
            result = await ApuestaService.desactivar((req.params.id), getAuthUser(req));
        }
        return res.status(200).send(result);
    }
}

function validate(dataForm: ApuestaDto): MessageResponse {
    let res: MessageResponse = { success: false, message: "Error de validación del(los) campo(s): ", code: 0 };
    try {
        let campoError = [] as string[];
        Object.keys(ApuestaRegex).forEach((key:string) => {
            const value = dataForm[key as keyof OApuestaRegex];
            const regexValue = ApuestaRegex[key as keyof OApuestaRegex] as string;
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
export default new ApuestaController();