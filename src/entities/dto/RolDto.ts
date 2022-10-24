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
