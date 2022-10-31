export interface RolUserDto {
    codRol:string,
    codUsuario:string,
    usuarioRegistro?: string,
}
export interface RolUserEditDto {
    codRol:string,
    codUsuario:string,
    usurioModificacion?:string
    fechaModificacion?:Date 
}

export const RolUserRegex: RolUserDto = {
    codRol: "^[a-fA-F0-9]{20,50}$",
    codUsuario: "^[a-fA-F0-9]{20,50}$",
};