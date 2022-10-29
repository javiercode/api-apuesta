export interface RolDto {
    codigo:string,
    descripcion:string,
    jerarquia:number,
    usuarioRegistro?: string,
    sucursalRegistro?: number,
}

export interface RolEditDto {
    codigo:string,
    descripcion:string,
    jerarquia:number,
    usurioModificacion?:string
    sucursalModificacion?:number
    fechaModificacion?:Date 
}

export interface RolDtoForm {
    codigo:string,
    descripcion:string,
    jerarquia:string,
}

export const RolRegex: RolDtoForm = {
    codigo: "^[a-fA-F0-9]{3,10}$",
    descripcion: "^[a-fA-F0-9]{3,300}$",
    jerarquia: "^[0-9]{1,3}$",
};