export interface GrupoDto {
    nombre:string,
    privacidad:string,
    clave:string,
    usuarioRegistro?: string,
    sucursalRegistro?: number,
}

export interface GrupoEditDto {
    nombre:string,
    privacidad:string,
    clave:string,
    usurioModificacion?:string
    sucursalModificacion?:number
    fechaModificacion?:Date 
}

export const GrupoRegex: GrupoDto = {
    nombre: "^[a-zA-Z0-9]{3,300}$",
    privacidad: "^[a-zA-Z0-9]{3,300}$",
    clave:"^[a-zA-Z0-9]{3,300}$",
};